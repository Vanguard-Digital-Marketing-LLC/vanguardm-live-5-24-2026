import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { withRateLimit, requirePortalAuth } from "@/lib/api-middleware";

export const GET = withRateLimit(
  "portal",
  async (
    req: NextRequest,
    context: { params: Promise<Record<string, string>> },
  ) => {
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

    const { id } = await context.params;

    const ticket = await prisma.supportTicket.findUnique({
      where: { id },
      include: {
        assignee: { select: { id: true, name: true } },
      },
    });

    if (!ticket) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // CRITICAL: Verify the ticket belongs to this client
    if (ticket.clientId !== clientId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json(ticket);
  },
);

export const PATCH = withRateLimit(
  "portal",
  async (
    req: NextRequest,
    context: { params: Promise<Record<string, string>> },
  ) => {
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

    const { id } = await context.params;

    // Fetch existing ticket to verify ownership
    const existing = await prisma.supportTicket.findUnique({
      where: { id },
      select: { clientId: true },
    });

    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // CRITICAL: Verify the ticket belongs to this client
    if (existing.clientId !== clientId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();

    // Clients can only update description — NOT status, priority, or assignee
    const data: Record<string, unknown> = {};
    if (body.description !== undefined) data.description = body.description;

    if (Object.keys(data).length === 0) {
      return NextResponse.json(
        { error: "No updatable fields provided" },
        { status: 400 },
      );
    }

    const ticket = await prisma.supportTicket.update({
      where: { id },
      data,
      include: {
        assignee: { select: { id: true, name: true } },
      },
    });

    return NextResponse.json(ticket);
  },
);
