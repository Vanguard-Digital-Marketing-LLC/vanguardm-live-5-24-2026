import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import { withRateLimit } from "@/lib/api-middleware";

// GET /api/portal/approvals/[id] — approval detail with response history
export const GET = withRateLimit("portal", async (
  _req: NextRequest,
  context: { params: Promise<Record<string, string>> }
): Promise<NextResponse> => {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "CLIENT" || !session.user.clientId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;

  const approval = await prisma.approval.findUnique({
    where: { id },
    include: {
      project: { select: { id: true, name: true } },
      createdBy: { select: { id: true, name: true } },
      responses: {
        orderBy: { createdAt: "asc" },
        include: {
          user: { select: { id: true, name: true } },
        },
      },
    },
  });

  if (!approval || approval.deletedAt) {
    return NextResponse.json({ error: "Approval not found" }, { status: 404 });
  }

  // IDOR check — client can only see their own approvals
  if (approval.clientId !== session.user.clientId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Verify client belongs to user's agency
  if (session.user.agencyId) {
    const clientCheck = await prisma.client.findFirst({
      where: { id: approval.clientId, agencyId: session.user.agencyId },
    });
    if (!clientCheck) return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }

  return NextResponse.json(approval);
});
