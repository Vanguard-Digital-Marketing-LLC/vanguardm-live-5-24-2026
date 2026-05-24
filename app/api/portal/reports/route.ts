import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { withRateLimit, requireAuth } from "@/lib/api-middleware";

export const GET = withRateLimit("portal", async (req: NextRequest) => {
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

  const reports = await prisma.clientReport.findMany({
    where: {
      clientId,
      status: "PUBLISHED", // Only show published reports to clients
    },
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { sections: true } },
    },
  });

  return NextResponse.json(reports);
});
