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
  const search = searchParams.get("search") || "";

  const where = search
    ? {
        agencyId,
        OR: [
          { name: { contains: search, mode: "insensitive" as const } },
          { email: { contains: search, mode: "insensitive" as const } },
        ],
      }
    : { agencyId };

  const [data, totalCount] = await Promise.all([
    prisma.user.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isAdmin: true,
        createdAt: true,
        _count: { select: { coursePurchases: true, certificates: true } },
      },
    }),
    prisma.user.count({ where }),
  ]);

  return NextResponse.json({ data, totalCount, page, pageSize });
}
