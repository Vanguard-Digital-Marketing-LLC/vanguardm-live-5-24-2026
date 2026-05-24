import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { checkRateLimit } from "@/lib/api-rate-limit";
import { requireAdminFeature } from "@/lib/api-middleware";

/* ──────────────────────────────────────────────
   POST /api/admin/leads/[id]/notes
   Append a manual note as a LeadActivity
   (type: "note_added").
   ────────────────────────────────────────────── */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { session, agencyId, errorResponse } = await requireAdminFeature("leads");
  if (errorResponse) return errorResponse;

  const { id } = await params;

  const lead = await prisma.lead.findFirst({
    where: { id, agencyId },
    select: { id: true },
  });
  if (!lead) return NextResponse.json({ error: "Lead not found" }, { status: 404 });

  const body = await request.json().catch(() => null);
  const message = body?.message?.toString().trim();
  if (!message) {
    return NextResponse.json({ error: "message is required" }, { status: 400 });
  }
  if (message.length > 4000) {
    return NextResponse.json({ error: "message too long (max 4000 chars)" }, { status: 400 });
  }

  const activity = await prisma.leadActivity.create({
    data: {
      leadId: id,
      type: "note_added",
      data: {
        message,
        author: session.user.email,
      },
    },
  });

  return NextResponse.json(activity, { status: 201 });
}
