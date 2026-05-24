import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { withRateLimit, requireAdminAuth } from "@/lib/api-middleware";

export const GET = withRateLimit(
  "admin",
  async (
    req: NextRequest,
    context: { params: Promise<Record<string, string>> },
  ) => {
    const { session, agencyId, errorResponse } = await requireAdminAuth();
    if (errorResponse) return errorResponse;

    const { id } = await context.params;

    // Verify the client belongs to this agency
    const client = await prisma.client.findFirst({
      where: { id, agencyId },
      select: { id: true },
    });

    if (!client) {
      return NextResponse.json(
        { error: "Client not found" },
        { status: 404 },
      );
    }

    // Admins see ALL messages including internal notes
    const messages = await prisma.clientMessage.findMany({
      where: { clientId: id },
      orderBy: { createdAt: "asc" },
      include: {
        user: { select: { id: true, name: true, role: true } },
      },
    });

    return NextResponse.json(messages);
  },
);

export const POST = withRateLimit(
  "admin",
  async (
    req: NextRequest,
    context: { params: Promise<Record<string, string>> },
  ) => {
    const { session, agencyId, errorResponse } = await requireAdminAuth();
    if (errorResponse) return errorResponse;

    const { id } = await context.params;

    // Verify the client belongs to this agency
    const client = await prisma.client.findFirst({
      where: { id, agencyId },
      select: { id: true },
    });

    if (!client) {
      return NextResponse.json(
        { error: "Client not found" },
        { status: 404 },
      );
    }

    const body = await req.json();

    if (
      !body.content ||
      typeof body.content !== "string" ||
      !body.content.trim()
    ) {
      return NextResponse.json(
        { error: "content is required" },
        { status: 400 },
      );
    }

    const content = body.content.trim();
    if (content.length > 5000) {
      return NextResponse.json(
        { error: "Message too long (max 5000 characters)" },
        { status: 400 },
      );
    }

    const message = await prisma.clientMessage.create({
      data: {
        clientId: id,
        userId: session.user.id,
        content,
        isInternal: body.isInternal === true, // Admin can mark as internal note
      },
      include: {
        user: { select: { id: true, name: true, role: true } },
      },
    });

    return NextResponse.json(message, { status: 201 });
  },
);
