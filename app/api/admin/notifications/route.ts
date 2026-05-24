import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { checkRateLimit } from "@/lib/api-rate-limit";
import { requireAdminAuth } from "@/lib/api-middleware";

export async function GET(request: NextRequest) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;

  const { session, agencyId, errorResponse } = await requireAdminAuth();
  if (errorResponse) return errorResponse;

  const notifications = await prisma.notification.findMany({
    where: { userId: session.user.id, agencyId },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  return NextResponse.json(notifications);
}
