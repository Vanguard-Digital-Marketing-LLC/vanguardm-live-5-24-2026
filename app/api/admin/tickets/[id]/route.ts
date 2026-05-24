import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { checkRateLimit } from "@/lib/api-rate-limit";
import { requireAdminAuth } from "@/lib/api-middleware";
import { notifyTicketStatusChanged } from "@/lib/ticket-notifications";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { session, agencyId, errorResponse } = await requireAdminAuth();
  if (errorResponse) return errorResponse;

  const role = session.user.role ?? (session.user.isAdmin ? "ADMIN" : "USER");
  const { id } = await params;
  const body = await request.json();

  // Fetch current ticket with agency scoping
  const current = await prisma.supportTicket.findFirst({
    where: { id, agencyId },
    select: { status: true, clientId: true, assigneeId: true },
  });
  if (!current) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // TEAM users can only update tickets assigned to them
  if (role === "TEAM" && current.assigneeId !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const data: Record<string, unknown> = {};
  if (body.title !== undefined) data.title = body.title;
  if (body.description !== undefined) data.description = body.description;
  if (body.status !== undefined) {
    const validStatuses = ["QUEUED", "OPEN", "IN_PROGRESS", "WAITING", "RESOLVED", "CLOSED"];
    if (!validStatuses.includes(body.status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }
    data.status = body.status;
    if (body.status === "RESOLVED" || body.status === "CLOSED") {
      data.resolvedAt = new Date();
    } else {
      data.resolvedAt = null;
    }
  }
  if (body.priority !== undefined) {
    const validPriorities = ["LOW", "NORMAL", "HIGH", "URGENT"];
    if (!validPriorities.includes(body.priority)) {
      return NextResponse.json({ error: "Invalid priority" }, { status: 400 });
    }
    data.priority = body.priority;
  }
  if (body.assigneeId !== undefined) data.assigneeId = body.assigneeId || null;

  const ticket = await prisma.supportTicket.update({
    where: { id },
    data,
    include: {
      client: { select: { id: true, name: true, domain: true } },
      assignee: { select: { id: true, name: true } },
    },
  });

  // Create STATUS_CHANGE message + notify on status transitions
  if (body.status && body.status !== current.status) {
    await prisma.ticketMessage.create({
      data: {
        ticketId: id,
        type: "STATUS_CHANGE",
        authorId: session.user.id,
        content: `Status changed from ${current.status.replace(/_/g, " ")} to ${body.status.replace(/_/g, " ")}`,
      },
    });

    notifyTicketStatusChanged(
      { ...ticket, clientId: current.clientId },
      current.status,
      body.status,
    ).catch(console.error);
  }

  return NextResponse.json(ticket);
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { session, agencyId, errorResponse } = await requireAdminAuth("ADMIN");
  if (errorResponse) return errorResponse;

  const { id } = await params;

  // Verify ownership before deleting
  const existing = await prisma.supportTicket.findFirst({ where: { id, agencyId } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.supportTicket.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
