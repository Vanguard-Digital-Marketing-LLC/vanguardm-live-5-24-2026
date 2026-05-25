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

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");

  const where: Record<string, unknown> = { clientId };
  if (status && status !== "ALL") where.status = status;

  const projects = await prisma.project.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { tasks: true } },
    },
    // Omit client field since this is the client's own data
  });

  // Add computed task status breakdowns
  const projectsWithCounts = await Promise.all(
    projects.map(async (project) => {
      const taskCounts = await prisma.task.groupBy({
        by: ["status"],
        where: { projectId: project.id },
        _count: true,
      });

      const tasksByStatus = taskCounts.reduce(
        (acc, group) => {
          acc[group.status] = group._count;
          return acc;
        },
        {} as Record<string, number>,
      );

      return {
        ...project,
        tasksByStatus,
      };
    }),
  );

  return NextResponse.json(projectsWithCounts);
});
