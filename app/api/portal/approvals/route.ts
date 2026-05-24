import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import { withRateLimit } from "@/lib/api-middleware";

// GET /api/portal/approvals — list approvals for the client user
export const GET = withRateLimit("portal", async (req: NextRequest) => {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "CLIENT" || !session.user.clientId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const clientId = session.user.clientId;

  // Verify client belongs to user's agency
  if (session.user.agencyId) {
    const clientCheck = await prisma.client.findFirst({
      where: { id: clientId, agencyId: session.user.agencyId },
    });
    if (!clientCheck) return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }

  const url = new URL(req.url);
  const page = Math.max(1, Number(url.searchParams.get("page") || "1"));
  const limit = Math.min(50, Math.max(1, Number(url.searchParams.get("limit") || "20")));
  const status = url.searchParams.get("status") || undefined;

  // Expire overdue approvals (check-on-read)
  await prisma.approval.updateMany({
    where: { clientId, status: "PENDING", dueDate: { lt: new Date() } },
    data: { status: "EXPIRED" },
  });

  const where = {
    clientId,
    deletedAt: null,
    ...(status ? { status: status as "PENDING" | "APPROVED" | "REVISION_REQUESTED" | "EXPIRED" } : {}),
  };

  const [approvals, total] = await Promise.all([
    prisma.approval.findMany({
      where,
      select: {
        id: true,
        title: true,
        category: true,
        status: true,
        dueDate: true,
        createdAt: true,
        updatedAt: true,
        _count: { select: { responses: true } },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.approval.count({ where }),
  ]);

  return NextResponse.json({ approvals, total, page, limit });
});
