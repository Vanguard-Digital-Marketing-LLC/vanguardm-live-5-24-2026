import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { withRateLimit, requirePortalAuth } from "@/lib/api-middleware";
import { createTicketSchema, parseBody } from "@/lib/validations/portal";


export const GET = withRateLimit("portal", async (req: NextRequest) => {
  const { session, errorResponse } = await requirePortalAuth();
  if (errorResponse) return errorResponse;

  const clientId = session.user.clientId;
  if (!clientId) {
    return NextResponse.json(
      { error: "No client account linked" },
      { status: 403 },
    );
  }

  // Verify client belongs to user's agency
  if (session.user.agencyId) {
    const clientCheck = await prisma.client.findFirst({
      where: { id: clientId, agencyId: session.user.agencyId },
    });
    if (!clientCheck) return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");

  const where: Record<string, unknown> = { clientId };
  if (status && status !== "ALL") where.status = status;

  const tickets = await prisma.supportTicket.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      assignee: { select: { id: true, name: true } },
    },
  });

  return NextResponse.json(tickets);
});

export const POST = withRateLimit("portal", async (req: NextRequest) => {
  const { session, errorResponse } = await requirePortalAuth();
  if (errorResponse) return errorResponse;

  const clientId = session.user.clientId;
  if (!clientId) {
    return NextResponse.json(
      { error: "No client account linked" },
      { status: 403 },
    );
  }

  // Verify client belongs to user's agency
  if (session.user.agencyId) {
    const clientCheck = await prisma.client.findFirst({
      where: { id: clientId, agencyId: session.user.agencyId },
    });
    if (!clientCheck) return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }

  const body = await req.json();
  const parsed = parseBody(createTicketSchema, body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", fields: parsed.errors }, { status: 400 });
  }
  const { title, description, priority } = parsed.data;

  // Calculate SLA deadline from client settings
  let slaDeadline = null;
  const client = await prisma.client.findUnique({
    where: { id: clientId },
    select: { slaResponseHours: true },
  });
  if (client?.slaResponseHours) {
    slaDeadline = new Date(
      Date.now() + client.slaResponseHours * 60 * 60 * 1000,
    );
  }

  const ticket = await prisma.supportTicket.create({
    data: {
      agencyId: session.user.agencyId || 'vanguard-seed',
      clientId,
      title,
      description: description || null,
      status: "OPEN",
      priority: priority || "NORMAL",
      source: "portal",
      slaDeadline,
    },
    include: {
      assignee: { select: { id: true, name: true } },
    },
  });

  return NextResponse.json(ticket, { status: 201 });
});
