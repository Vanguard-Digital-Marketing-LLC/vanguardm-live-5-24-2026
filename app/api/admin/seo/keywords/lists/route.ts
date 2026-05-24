import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { checkRateLimit } from "@/lib/api-rate-limit";
import { requireAdminAuth } from "@/lib/api-middleware";
import { createKeywordListSchema } from "@/lib/validations/seo";

/* ──────────────────────────────────────────────
   GET /api/admin/seo/keywords/lists
   List all keyword lists for the agency.
   ────────────────────────────────────────────── */

export async function GET(request: NextRequest) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { agencyId, errorResponse } = await requireAdminAuth();
  if (errorResponse) return errorResponse;

  const lists = await prisma.keywordList.findMany({
    where: { agencyId },
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { entries: true } },
      client: { select: { id: true, name: true } },
    },
  });

  return NextResponse.json(lists);
}

/* ──────────────────────────────────────────────
   POST /api/admin/seo/keywords/lists
   Create a new keyword list.
   ────────────────────────────────────────────── */

export async function POST(request: NextRequest) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { agencyId, errorResponse } = await requireAdminAuth();
  if (errorResponse) return errorResponse;

  try {
    const body = await request.json();
    const parsed = createKeywordListSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const list = await prisma.keywordList.create({
      data: { ...parsed.data, agencyId },
      include: {
        _count: { select: { entries: true } },
        client: { select: { id: true, name: true } },
      },
    });

    return NextResponse.json(list, { status: 201 });
  } catch (err) {
    console.error("[POST /api/admin/seo/keywords/lists]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
