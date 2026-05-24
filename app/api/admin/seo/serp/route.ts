import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { checkRateLimit } from "@/lib/api-rate-limit";
import { requireAdminAuth } from "@/lib/api-middleware";
import { createSerpSnapshotSchema } from "@/lib/validations/seo";

/* ──────────────────────────────────────────────
   GET /api/admin/seo/serp
   List SERP snapshots for the agency.
   ────────────────────────────────────────────── */

export async function GET(request: NextRequest) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { agencyId, errorResponse } = await requireAdminAuth();
  if (errorResponse) return errorResponse;

  const snapshots = await prisma.serpSnapshot.findMany({
    where: { agencyId },
    orderBy: { scrapedAt: "desc" },
    include: {
      _count: { select: { results: true } },
    },
  });

  return NextResponse.json(snapshots);
}

/* ──────────────────────────────────────────────
   POST /api/admin/seo/serp
   Create a new SERP snapshot (empty shell).
   ────────────────────────────────────────────── */

export async function POST(request: NextRequest) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { agencyId, errorResponse } = await requireAdminAuth();
  if (errorResponse) return errorResponse;

  try {
    const body = await request.json();
    const parsed = createSerpSnapshotSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const snapshot = await prisma.serpSnapshot.create({
      data: {
        ...parsed.data,
        agencyId,
        keywordCount: 0,
        resultCount: 0,
      },
      include: {
        _count: { select: { results: true } },
      },
    });

    return NextResponse.json(snapshot, { status: 201 });
  } catch (err) {
    console.error("[POST /api/admin/seo/serp]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
