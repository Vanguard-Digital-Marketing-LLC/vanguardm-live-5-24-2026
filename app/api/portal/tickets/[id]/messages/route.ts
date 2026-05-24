import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { withRateLimit, requireAuth } from "@/lib/api-middleware";
import { createMessageSchema } from "@/lib/validations/ticket-messages";
import { notifyTicketComment } from "@/lib/ticket-notifications";

export const GET = withRateLimit("portal", async (req: NextRequest, context) => {
  const { session, errorResponse } = await requireAuth();
  if (errorResponse) return errorResponse;

  const clientId = session.user.clientId;
  if (!clientId) return NextResponse.json({ error: "No client account linked" }, { status: 403 });

  // Verify client belongs to user's agency
  if (session.user.agencyId) {
    const clientCheck = await prisma.client.findFirst({
      where: { id: clientId, agencyId: session.user.agencyId },
    });
    if (!clientCheck) return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }

  const { id } = await context.params;

  // Verify ticket belongs to client
  const ticket = await prisma.supportTicket.findUnique({
    where: { id },
    select: { clientId: true },
  });
  if (!ticket || ticket.clientId !== clientId) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Exclude internal messages
  const messages = await prisma.ticketMessage.findMany({
    where: { ticketId: id, isInternal: false },
    orderBy: { createdAt: "asc" },
    include: {
      author: { select: { id: true, name: true, role: true } },
    },
  });

  return NextResponse.json(messages);
});

export const POST = withRateLimit("portal", async (req: NextRequest, context) => {
  const { session, errorResponse } = await requireAuth();
  if (errorResponse) return errorResponse;

  const clientId = session.user.clientId;
  if (!clientId) return NextResponse.json({ error: "No client account linked" }, { status: 403 });

  // Verify client belongs to user's agency
  if (session.user.agencyId) {
    const clientCheck = await prisma.client.findFirst({
      where: { id: clientId, agencyId: session.user.agencyId },
    });
    if (!clientCheck) return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }

  const { id } = await context.params;

  const ticket = await prisma.supportTicket.findUnique({
    where: { id },
    include: { client: { select: { name: true, domain: true } } },
  });
  if (!ticket || ticket.clientId !== clientId) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = await req.json();
  const parsed = createMessageSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", fields: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const message = await prisma.ticketMessage.create({
    data: {
      ticketId: id,
      type: "COMMENT",
      authorId: session.user.id,
      content: parsed.data.content,
      isInternal: false, // Portal users can never post internal notes
    },
    include: {
      author: { select: { id: true, name: true, role: true } },
    },
  });

  // Notify admin of client comment
  notifyTicketComment(
    { ...ticket, clientId: ticket.clientId },
    { content: parsed.data.content, authorId: session.user.id },
  ).catch(console.error);

  return NextResponse.json(message, { status: 201 });
});
