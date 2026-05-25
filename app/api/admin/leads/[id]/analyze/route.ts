import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { checkRateLimit } from "@/lib/api-rate-limit";
import { requireAdminFeature } from "@/lib/api-middleware";
import { analyzeLead } from "@/lib/lead-ai";

/* ──────────────────────────────────────────────
   POST /api/admin/leads/[id]/analyze
   On-demand: generate a research brief, AI intent
   score + reason, and a follow-up draft from the
   lead's OWN data. Persists results on the Lead.
   ────────────────────────────────────────────── */

// Per-lead cooldown to bound paid LLM spend from rapid/duplicate re-analysis.
const ANALYZE_COOLDOWN_MS = 20_000;

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { agencyId, errorResponse } = await requireAdminFeature("leads");
  if (errorResponse) return errorResponse;

  const { id } = await params;

  const lead = await prisma.lead.findFirst({
    where: { id, agencyId },
    include: {
      formResponses: { orderBy: { createdAt: "desc" }, take: 5 },
      chatSessions: { orderBy: { updatedAt: "desc" }, take: 3 },
      activities: { orderBy: { createdAt: "desc" }, take: 20 },
    },
  });

  if (!lead) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  if (
    lead.aiAnalyzedAt &&
    Date.now() - lead.aiAnalyzedAt.getTime() < ANALYZE_COOLDOWN_MS
  ) {
    return NextResponse.json(
      { error: "This lead was just analyzed. Please wait a few seconds before re-running." },
      { status: 429 },
    );
  }

  // The Lead has no message column — the original message lives on the linked
  // ContactSubmission. Surface it so the model sees what the lead actually asked.
  let message: string | null = null;
  if (lead.linkedContactSubmissionId) {
    const submission = await prisma.contactSubmission.findFirst({
      where: { id: lead.linkedContactSubmissionId, agencyId },
      select: { message: true },
    });
    message = submission?.message ?? null;
  }

  // Build context from the lead's OWN data only — no external enrichment.
  const context = [
    lead.formResponses.length
      ? "Form responses: " + JSON.stringify(lead.formResponses).slice(0, 3000)
      : "",
    lead.chatSessions.length
      ? "Chat history: " + JSON.stringify(lead.chatSessions.map((c) => c.messages)).slice(0, 3000)
      : "",
    lead.activities.length
      ? "Activity: " + lead.activities.map((a) => a.type).join(", ")
      : "",
  ]
    .filter(Boolean)
    .join("\n\n");

  let result;
  try {
    result = await analyzeLead({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      company: lead.company,
      source: lead.source,
      message,
      context,
    });
  } catch (err) {
    console.error("[lead-ai] analyze failed:", err);
    return NextResponse.json(
      { error: "AI analysis failed. Please try again." },
      { status: 502 },
    );
  }

  // updateMany so the write is scoped by agencyId too (defense-in-depth — the
  // lead was already verified to belong to this agency above).
  await prisma.lead.updateMany({
    where: { id, agencyId },
    data: {
      researchBrief: result.researchBrief || null,
      aiScore: result.intentScore, // null when flagged
      aiScoreReason: result.reason || null,
      followupSubject: result.followup?.subject ?? null,
      followupBody: result.followup?.body ?? null,
      aiAnalyzedAt: new Date(),
    },
  });

  await prisma.leadActivity.create({
    data: {
      leadId: id,
      type: "ai_analyzed",
      data: { intentScore: result.intentScore, flagged: result.flagged },
    },
  });

  return NextResponse.json(result);
}
