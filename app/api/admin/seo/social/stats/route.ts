import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { checkRateLimit } from "@/lib/api-rate-limit";
import { requireAdminAuth } from "@/lib/api-middleware";

/* ──────────────────────────────────────────────
   GET /api/admin/seo/social/stats
   Dashboard stats for social media posts.
   ────────────────────────────────────────────── */

export async function GET(request: NextRequest) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { agencyId, errorResponse } = await requireAdminAuth();
  if (errorResponse) return errorResponse;

  try {
    const now = new Date();

    // Start of current week (Monday)
    const startOfWeek = new Date(now);
    const day = startOfWeek.getDay();
    const diff = day === 0 ? 6 : day - 1;
    startOfWeek.setDate(startOfWeek.getDate() - diff);
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 7);

    // Start of current month
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const [totalPosts, byPlatform, byStatus, scheduledThisWeek, publishedThisMonth] =
      await Promise.all([
        prisma.socialPost.count({ where: { agencyId } }),

        prisma.socialPost.groupBy({
          by: ["platform"],
          where: { agencyId },
          _count: { id: true },
        }),

        prisma.socialPost.groupBy({
          by: ["status"],
          where: { agencyId },
          _count: { id: true },
        }),

        prisma.socialPost.count({
          where: {
            agencyId,
            status: "SCHEDULED",
            scheduledAt: { gte: startOfWeek, lt: endOfWeek },
          },
        }),

        prisma.socialPost.count({
          where: {
            agencyId,
            status: "PUBLISHED",
            publishedAt: { gte: startOfMonth, lt: endOfMonth },
          },
        }),
      ]);

    return NextResponse.json({
      totalPosts,
      byPlatform: byPlatform.map((g) => ({
        platform: g.platform,
        _count: g._count.id,
      })),
      byStatus: byStatus.map((g) => ({
        status: g.status,
        _count: g._count.id,
      })),
      scheduledThisWeek,
      publishedThisMonth,
    });
  } catch (error) {
    console.error("[GET /api/admin/seo/social/stats]", error);
    return NextResponse.json(
      { error: "Failed to fetch social stats" },
      { status: 500 },
    );
  }
}
