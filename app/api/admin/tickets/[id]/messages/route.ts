import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { checkRateLimit } from "@/lib/api-rate-limit";
import { requireAdminAuth } from "@/lib/api-middleware";
import { createMessageSchema } from "@/lib/validations/ticket-messages";
import { notifyTicketComment } from "@/lib/ticket-notifications";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { session, agencyId, errorResponse } = await requireAdminAuth();
  if (errorResponse) return errorResponse;

  const role = session.user.role ?? (session.user.isAdmin ? "ADMIN" : "USER");
  const { id } = await params;

  // Verify ticket belongs to this agency
  const ticket = await prisma.supportTicket.findFirst({
    where: { id, agencyId },
    select: { assigneeId: true },
  });
  if (!ticket) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // TEAM users can only see messages for their assigned tickets
  if (role === "TEAM" && ticket.assigneeId !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const messages = await prisma.ticketMessage.findMany({
    where: { ticketId: id },
    orderBy: { createdAt: "asc" },
    include: {
      author: { select: { id: true, name: true, email: true, role: true } },
    },
  });

  return NextResponse.json(messages);
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { session, agencyId, errorResponse } = await requireAdminAuth();
  if (errorResponse) return errorResponse;

  const role = session.user.role ?? (session.user.isAdmin ? "ADMIN" : "USER");
  const { id } = await params;
  const body = await request.json();
  const parsed = createMessageSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", fields: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  // Verify ticket belongs to this agency
  const ticket = await prisma.supportTicket.findFirst({
    where: { id, agencyId },
    include: { client: { select: { name: true, domain: true } } },
  });
  if (!ticket) return NextResponse.json({ error: "Ticket not found" }, { status: 404 });

  // TEAM users can only post to their assigned tickets
  if (role === "TEAM" && ticket.assigneeId !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const message = await prisma.ticketMessage.create({
    data: {
      ticketId: id,
      type: "COMMENT",
      authorId: session.user.id,
      content: parsed.data.content,
      isInternal: parsed.data.isInternal,
    },
    include: {
      author: { select: { id: true, name: true, email: true, role: true } },
    },
  });

  // Notify other party (skip for internal notes)
  if (!parsed.data.isInternal) {
    notifyTicketComment(
      { ...ticket, clientId: ticket.clientId },
      { content: parsed.data.content, authorId: session.user.id },
    ).catch(console.error);
  }

  return NextResponse.json(message, { status: 201 });
}
