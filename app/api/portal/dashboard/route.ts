import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { withRateLimit, requirePortalAuth } from "@/lib/api-middleware";

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

  const now = new Date();
  const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  // Get client's last-read timestamp for unread count
  const readRecord = await prisma.clientMessageRead.findUnique({
    where: {
      userId_clientId: {
        userId: session.user.id,
        clientId,
      },
    },
    select: { lastReadAt: true },
  });

  // Run all queries in parallel
  const [
    activeProjectsCount,
    openTicketsCount,
    unreadMessagesCount,
    recentMessages,
    upcomingTaskDeadlines,
    upcomingTicketDeadlines,
  ] = await Promise.all([
    // Active projects count
    prisma.project.count({
      where: { clientId, status: { in: ["PLANNING", "ACTIVE"] } },
    }),

    // Open tickets count
    prisma.supportTicket.count({
      where: { clientId, status: { in: ["OPEN", "IN_PROGRESS", "WAITING"] } },
    }),

    // Unread messages count (admin/team messages newer than last read)
    prisma.clientMessage.count({
      where: {
        clientId,
        isInternal: false,
        user: { role: { in: ["ADMIN", "TEAM"] } },
        ...(readRecord ? { createdAt: { gt: readRecord.lastReadAt } } : {}),
      },
    }),

    // Recent messages (last 5, exclude internal)
    prisma.clientMessage.findMany({
      where: { clientId, isInternal: false },
      orderBy: { createdAt: "desc" },
      take: 5,
      include: {
        user: { select: { id: true, name: true, role: true } },
      },
    }),

    // Upcoming task deadlines (next 7 days)
    prisma.task.findMany({
      where: {
        clientId,
        status: { not: "COMPLETED" },
        dueDate: { gte: now, lte: sevenDaysFromNow },
      },
      orderBy: { dueDate: "asc" },
      select: {
        id: true,
        title: true,
        status: true,
        priority: true,
        dueDate: true,
        project: { select: { id: true, name: true } },
      },
    }),

    // Upcoming ticket deadlines (next 7 days)
    prisma.supportTicket.findMany({
      where: {
        clientId,
        status: { in: ["OPEN", "IN_PROGRESS", "WAITING"] },
        slaDeadline: { gte: now, lte: sevenDaysFromNow },
      },
      orderBy: { slaDeadline: "asc" },
      select: {
        id: true,
        title: true,
        status: true,
        priority: true,
        slaDeadline: true,
      },
    }),
  ]);

  return NextResponse.json({
    counts: {
      activeProjects: activeProjectsCount,
      openTickets: openTicketsCount,
      unreadMessages: unreadMessagesCount,
    },
    recentMessages,
    upcomingDeadlines: [
      ...upcomingTaskDeadlines.map((t) => ({
        type: "task" as const,
        id: t.id,
        title: t.title,
        status: t.status,
        priority: t.priority,
        dueDate: t.dueDate,
        project: t.project,
      })),
      ...upcomingTicketDeadlines.map((t) => ({
        type: "ticket" as const,
        id: t.id,
        title: t.title,
        status: t.status,
        priority: t.priority,
        dueDate: t.slaDeadline,
        project: null,
      })),
    ].sort(
      (a, b) =>
        new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime(),
    ),
  });
});
