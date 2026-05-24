import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminAuth } from "@/lib/api-middleware";
import { checkRateLimit } from "@/lib/api-rate-limit";

export async function GET(request: NextRequest) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;

  const { agencyId, errorResponse } = await requireAdminAuth();
  if (errorResponse) return errorResponse;

  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const [
    userCount,
    purchaseCount,
    certificateCount,
    unreadLeads,
    totalLeadsThisMonth,
    quizAttempts,
    recentLeads,
    recentAttempts,
  ] = await Promise.all([
    prisma.user.count({ where: { agencyId } }),
    prisma.coursePurchase.count({ where: { user: { agencyId } } }),
    prisma.certificate.count({ where: { user: { agencyId } } }),
    prisma.contactSubmission.count({ where: { agencyId, read: false } }),
    prisma.contactSubmission.count({ where: { agencyId, createdAt: { gte: thirtyDaysAgo } } }),
    prisma.quizAttempt.findMany({
      where: { user: { agencyId }, attemptedAt: { gte: thirtyDaysAgo } },
      select: { passed: true, attemptedAt: true },
    }),
    prisma.contactSubmission.findMany({
      where: { agencyId },
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, name: true, email: true, service: true, read: true, createdAt: true },
    }),
    prisma.quizAttempt.findMany({
      where: { user: { agencyId } },
      orderBy: { attemptedAt: "desc" },
      take: 5,
      include: { user: { select: { name: true, email: true } } },
    }),
  ]);

  const passedCount = quizAttempts.filter((a) => a.passed).length;
  const passRate = quizAttempts.length > 0 ? Math.round((passedCount / quizAttempts.length) * 100) : 0;

  return NextResponse.json({
    metrics: {
      userCount,
      purchaseCount,
      certificateCount,
      unreadLeads,
      totalLeadsThisMonth,
      passRate,
      quizAttemptCount: quizAttempts.length,
    },
    recentLeads,
    recentAttempts,
  });
}
