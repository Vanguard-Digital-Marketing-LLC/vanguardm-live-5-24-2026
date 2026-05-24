import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { checkRateLimit } from "@/lib/api-rate-limit";
import { requireAdminFeature } from "@/lib/api-middleware";

/* ──────────────────────────────────────────────
   /api/admin/leads/[id]
   GET: Lead detail with activities, form responses,
        and chat sessions.
   PATCH: Update status, assignedToId, etc.
   DELETE: Remove lead record.
   ────────────────────────────────────────────── */

export async function GET(
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
    include: {
      assignedTo: {
        select: { id: true, name: true, email: true },
      },
      activities: {
        orderBy: { createdAt: "desc" },
        take: 50,
      },
      formResponses: {
        include: {
          form: { select: { name: true, slug: true } },
        },
        orderBy: { createdAt: "desc" },
      },
      chatSessions: {
        orderBy: { updatedAt: "desc" },
        take: 10,
      },
    },
  });

  if (!lead) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  return NextResponse.json(lead);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { session, agencyId, errorResponse } = await requireAdminFeature("leads");
  if (errorResponse) return errorResponse;

  const { id } = await params;
  const body = await request.json();

  // Verify ownership before updating
  const existing = await prisma.lead.findFirst({ where: { id, agencyId } });
  if (!existing) return NextResponse.json({ error: "Lead not found" }, { status: 404 });

  // Build update data from allowed fields
  const updateData: Record<string, unknown> = {};
  if (body.status !== undefined) updateData.status = body.status;
  if (body.assignedToId !== undefined)
    updateData.assignedToId = body.assignedToId || null;
  if (body.name !== undefined) updateData.name = body.name;
  if (body.phone !== undefined) updateData.phone = body.phone;
  if (body.company !== undefined) updateData.company = body.company;

  const lead = await prisma.lead.update({
    where: { id },
    data: updateData,
    include: {
      assignedTo: {
        select: { id: true, name: true, email: true },
      },
    },
  });

  // Log status change as activity
  if (body.status) {
    await prisma.leadActivity.create({
      data: {
        leadId: id,
        type: "status_changed",
        data: {
          from: body.previousStatus || null,
          to: body.status,
          changedBy: session.user.email,
        },
      },
    });
  }

  return NextResponse.json(lead);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { session, agencyId, errorResponse } = await requireAdminFeature("leads", "ADMIN");
  if (errorResponse) return errorResponse;

  const { id } = await params;

  // Verify ownership before deleting
  const existing = await prisma.lead.findFirst({ where: { id, agencyId } });
  if (!existing) return NextResponse.json({ error: "Lead not found" }, { status: 404 });

  await prisma.lead.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
