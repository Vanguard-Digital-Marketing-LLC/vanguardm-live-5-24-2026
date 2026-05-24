import { NextRequest, NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/email";
import { prisma } from "@/lib/db";
import { verifyTurnstile } from "@/lib/turnstile";
import { checkRateLimit } from "@/lib/api-rate-limit";
import { resolvePublicAgencyId } from "@/lib/resolve-agency-public";
import {
  calculateLeadScore,
  type ScoreSignal,
} from "@/lib/lead-scoring";

export async function POST(request: NextRequest) {
  const blocked = await checkRateLimit(request, "public");
  if (blocked) return blocked;

  const body = await request.json();
  const { name, email, message, phone, company, service, turnstileToken } = body;

  // Verify Turnstile
  if (!turnstileToken || !(await verifyTurnstile(turnstileToken))) {
    return NextResponse.json(
      { error: "Verification failed. Please try again." },
      { status: 403 },
    );
  }

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 },
    );
  }

  // Basic email format check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Please provide a valid email address." },
      { status: 400 },
    );
  }

  const agencyId = await resolvePublicAgencyId(request);

  // Save to DB and send email in parallel — neither blocks the other
  const [dbResult, emailResult] = await Promise.allSettled([
    prisma.contactSubmission.create({
      data: { name, email, message, phone, company, service, agencyId },
    }),
    sendContactEmail({ name, email, message, phone, company, service }),
  ]);

  if (dbResult.status === "rejected") {
    console.error("Failed to save contact submission:", dbResult.reason);
  }

  if (emailResult.status === "rejected") {
    console.error("Failed to send contact email:", emailResult.reason);
    // If email failed but DB saved, still report success
    if (dbResult.status === "fulfilled") {
      return NextResponse.json({ success: true });
    }
    return NextResponse.json(
      {
        error:
          "Failed to send message. Please try again or email us directly.",
      },
      { status: 500 },
    );
  }

  // ── Lead Scoring: create or update Lead record ──
  try {
    const signals: ScoreSignal[] = ["contact_form_submitted"];
    if (phone) signals.push("phone_provided");
    if (company) signals.push("company_provided");
    const { score, breakdown } = calculateLeadScore(signals);

    const contactSubmissionId =
      dbResult.status === "fulfilled" ? dbResult.value.id : undefined;

    const existingLead = await prisma.lead.findFirst({
      where: { email, agencyId },
    });

    if (existingLead) {
      // Merge score breakdowns
      const prevBreakdown =
        (existingLead.scoreBreakdown as Record<string, number>) || {};
      const merged = { ...prevBreakdown };
      for (const [key, val] of Object.entries(breakdown)) {
        merged[key] = (merged[key] || 0) + val;
      }
      const newScore = Object.values(merged).reduce((a, b) => a + b, 0);

      await prisma.lead.update({
        where: { id: existingLead.id },
        data: {
          score: newScore,
          scoreBreakdown: merged,
          phone: phone || existingLead.phone,
          company: company || existingLead.company,
          linkedContactSubmissionId: contactSubmissionId || existingLead.linkedContactSubmissionId,
        },
      });

      await prisma.leadActivity.create({
        data: {
          leadId: existingLead.id,
          type: "contact_form_submitted",
          data: { service, message: message.slice(0, 200) },
        },
      });
    } else {
      const lead = await prisma.lead.create({
        data: {
          agencyId,
          name,
          email,
          phone: phone || null,
          company: company || null,
          source: "contact_form",
          score,
          scoreBreakdown: breakdown,
          linkedContactSubmissionId: contactSubmissionId,
        },
      });

      await prisma.leadActivity.create({
        data: {
          leadId: lead.id,
          type: "contact_form_submitted",
          data: { service, message: message.slice(0, 200) },
        },
      });
    }
  } catch (err) {
    console.error("Failed to create/update lead record:", err);
    // Non-blocking — contact form already saved successfully
  }

  return NextResponse.json({ success: true });
}
