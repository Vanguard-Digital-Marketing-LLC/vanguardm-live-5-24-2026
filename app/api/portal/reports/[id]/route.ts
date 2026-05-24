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

    const report = await prisma.clientReport.findUnique({
      where: { id },
      include: {
        sections: {
          orderBy: { sortOrder: "asc" },
        },
      },
    });

    if (!report) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // CRITICAL: Verify the report belongs to this client
    if (report.clientId !== clientId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Only allow access to published reports
    if (report.status !== "PUBLISHED") {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(report);
  },
);
