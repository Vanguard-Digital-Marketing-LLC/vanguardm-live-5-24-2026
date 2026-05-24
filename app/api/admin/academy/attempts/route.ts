import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminAuth } from "@/lib/api-middleware";
import { checkRateLimit } from "@/lib/api-rate-limit";

export async function GET(request: NextRequest) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;

  const { agencyId, errorResponse } = await requireAdminAuth();
  if (errorResponse) return errorResponse;

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "20");
  const courseFilter = searchParams.get("course") || undefined;
  const passedFilter = searchParams.get("passed");
  const sortBy = searchParams.get("sortBy") || "attemptedAt";
  const sortDir = (searchParams.get("sortDir") || "desc") as "asc" | "desc";

  // Scope to agency via user relation
  const where: Record<string, unknown> = { user: { agencyId } };
  if (courseFilter) where.courseSlug = courseFilter;
  if (passedFilter === "true") where.passed = true;
  if (passedFilter === "false") where.passed = false;

  const orderBy: Record<string, string> = {};
  if (["attemptedAt", "score", "courseSlug"].includes(sortBy)) {
    orderBy[sortBy] = sortDir;
  } else {
    orderBy.attemptedAt = "desc";
  }

  const [data, totalCount] = await Promise.all([
    prisma.quizAttempt.findMany({
      where,
      orderBy,
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        user: { select: { id: true, name: true, email: true } },
        certificate: { select: { id: true, certificateNumber: true } },
      },
    }),
    prisma.quizAttempt.count({ where }),
  ]);

  return NextResponse.json({ data, totalCount, page, pageSize });
}
