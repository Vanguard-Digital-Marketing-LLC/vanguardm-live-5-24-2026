import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { withRateLimit, requireAdminAuth } from "@/lib/api-middleware";

export const GET = withRateLimit(
  "admin",
  async (req: NextRequest) => {
    const { session, agencyId, errorResponse } = await requireAdminAuth();
    if (errorResponse) return errorResponse;

    const userId = session.user.id;

    // Get all clients that have at least one non-internal message
    const clientsWithMessages = await prisma.client.findMany({
      where: {
        agencyId,
        clientMessages: {
          some: { isInternal: false },
        },
      },
      select: {
        id: true,
        name: true,
        clientMessages: {
          where: { isInternal: false },
          orderBy: { createdAt: "desc" },
          take: 1,
          select: { createdAt: true },
        },
        messageReads: {
          where: { userId },
          select: { lastReadAt: true },
        },
      },
    });

    const unread = clientsWithMessages
      .map((client) => {
        const lastMessage = client.clientMessages[0]?.createdAt;
        const lastRead = client.messageReads[0]?.lastReadAt;

        if (!lastMessage) return null;
        if (lastRead && lastRead >= lastMessage) return null;

        return {
          clientId: client.id,
          clientName: client.name,
        };
      })
      .filter(Boolean);

    // For clients with unread, count the actual unread messages
    const unreadWithCounts = await Promise.all(
      unread.map(async (item) => {
        const lastRead = await prisma.clientMessageRead.findUnique({
          where: { userId_clientId: { userId, clientId: item!.clientId } },
          select: { lastReadAt: true },
        });

        const count = await prisma.clientMessage.count({
          where: {
            clientId: item!.clientId,
            isInternal: false,
            createdAt: lastRead ? { gt: lastRead.lastReadAt } : undefined,
          },
        });

        return {
          clientId: item!.clientId,
          clientName: item!.clientName,
          unreadCount: count,
        };
      }),
    );

    return NextResponse.json(unreadWithCounts.filter((u) => u.unreadCount > 0));
  },
);
