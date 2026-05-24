import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { withRateLimit, requireAuth } from "@/lib/api-middleware";

export const GET = withRateLimit(
  "portal",
  async (
    req: NextRequest,
    context: { params: Promise<Record<string, string>> },
  ) => {
    const { session, errorResponse } = await requireAuth();
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

    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        tasks: {
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            title: true,
            status: true,
            priority: true,
            dueDate: true,
            createdAt: true,
          },
        },
      },
    });

    if (!project) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // CRITICAL: Verify the project belongs to this client
    if (project.clientId !== clientId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json(project);
  },
);
