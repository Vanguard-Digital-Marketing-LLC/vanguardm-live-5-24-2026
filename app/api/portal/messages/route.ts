import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { withRateLimit, requirePortalAuth } from "@/lib/api-middleware";
import { sendMessageSchema, parseBody } from "@/lib/validations/portal";

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

  const messages = await prisma.clientMessage.findMany({
    where: {
      clientId,
      isInternal: false, // Never expose internal notes to clients
    },
    orderBy: { createdAt: "asc" },
    include: {
      user: { select: { id: true, name: true, role: true } },
    },
  });

  // Mark messages as read for this user+client pair
  await prisma.clientMessageRead.upsert({
    where: {
      userId_clientId: {
        userId: session.user.id,
        clientId,
      },
    },
    update: { lastReadAt: new Date() },
    create: {
      userId: session.user.id,
      clientId,
      lastReadAt: new Date(),
    },
  });

  return NextResponse.json(messages);
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
  const parsed = parseBody(sendMessageSchema, body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", fields: parsed.errors }, { status: 400 });
  }

  const message = await prisma.clientMessage.create({
    data: {
      clientId,
      userId: session.user.id,
      content: parsed.data.content.trim(),
      isInternal: false, // Client messages are never internal
    },
    include: {
      user: { select: { id: true, name: true, role: true } },
    },
  });

  return NextResponse.json(message, { status: 201 });
});
