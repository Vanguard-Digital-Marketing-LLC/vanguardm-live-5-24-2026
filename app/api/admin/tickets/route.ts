import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { checkRateLimit } from "@/lib/api-rate-limit";
import { requireAdminAuth } from "@/lib/api-middleware";


export async function GET(request: NextRequest) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { session, agencyId, errorResponse } = await requireAdminAuth();
  if (errorResponse) return errorResponse;

  const role = session.user.role ?? (session.user.isAdmin ? "ADMIN" : "USER");
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const priority = searchParams.get("priority");
  const clientId = searchParams.get("clientId");

  const where: Record<string, unknown> = { agencyId };
  if (status && status !== "ALL") where.status = status;
  if (priority) where.priority = priority;
  if (clientId) where.clientId = clientId;
  if (role === "TEAM") where.assigneeId = session.user.id;

  const tickets = await prisma.supportTicket.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      client: { select: { id: true, name: true, domain: true, slaResponseHours: true } },
      assignee: { select: { id: true, name: true, email: true } },
    },
  });

  return NextResponse.json(tickets);
}

export async function POST(request: NextRequest) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { session, agencyId, errorResponse } = await requireAdminAuth("ADMIN");
  if (errorResponse) return errorResponse;

  const body = await request.json();
  if (!body.title || !body.clientId) {
    return NextResponse.json({ error: "title and clientId required" }, { status: 400 });
  }

  // Verify the client belongs to this agency
  const client = await prisma.client.findFirst({
    where: { id: body.clientId, agencyId },
    select: { slaResponseHours: true },
  });
  if (!client) {
    return NextResponse.json({ error: "Client not found" }, { status: 404 });
  }

  let slaDeadline = null;
  if (client.slaResponseHours) {
    slaDeadline = new Date(Date.now() + client.slaResponseHours * 60 * 60 * 1000);
  }

  const ticket = await prisma.supportTicket.create({
    data: {
      agencyId,
      clientId: body.clientId,
      title: body.title,
      description: body.description || null,
      priority: body.priority || "NORMAL",
      assigneeId: body.assigneeId || null,
      source: "admin",
      slaDeadline,
    },
    include: {
      client: { select: { id: true, name: true, domain: true } },
      assignee: { select: { id: true, name: true } },
    },
  });

  return NextResponse.json(ticket, { status: 201 });
}
