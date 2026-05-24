import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { withRateLimit, requireAdminAuth } from "@/lib/api-middleware";

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
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    // Upsert the last-read timestamp
    await prisma.clientMessageRead.upsert({
      where: {
        userId_clientId: {
          userId: session.user.id,
          clientId: id,
        },
      },
      update: { lastReadAt: new Date() },
      create: {
        userId: session.user.id,
        clientId: id,
        lastReadAt: new Date(),
      },
    });

    return NextResponse.json({ ok: true });
  },
);
