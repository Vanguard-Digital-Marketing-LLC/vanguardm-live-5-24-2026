import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { checkRateLimit } from "@/lib/api-rate-limit";
import { requireAdminFeature } from "@/lib/api-middleware";

type RouteCtx = { params: Promise<{ id: string }> };

/* ──────────────────────────────────────────────
   GET /api/admin/seo/serp/[id]
   Get a snapshot with results + keyword data.
   Supports ?domain= filter on results.
   ────────────────────────────────────────────── */

export async function GET(request: NextRequest, { params }: RouteCtx) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { agencyId, errorResponse } = await requireAdminFeature("seo");
  if (errorResponse) return errorResponse;

  const { id } = await params;
  const { searchParams } = new URL(request.url);
  const domainFilter = searchParams.get("domain");

  const snapshot = await prisma.serpSnapshot.findFirst({
    where: { id, agencyId },
  });

  if (!snapshot) {
    return NextResponse.json({ error: "Snapshot not found" }, { status: 404 });
  }

  // Build results filter
  const resultsWhere: Record<string, unknown> = { snapshotId: id };
  if (domainFilter) {
    resultsWhere.domain = { contains: domainFilter, mode: "insensitive" };
  }

  const results = await prisma.serpResult.findMany({
    where: resultsWhere,
    orderBy: { position: "asc" },
    include: {
      keyword: {
        select: {
          id: true,
          term: true,
          volume: true,
          difficulty: true,
          intent: true,
          trafficPotential: true,
        },
      },
    },
  });

  return NextResponse.json({ ...snapshot, results });
}

/* ──────────────────────────────────────────────
   DELETE /api/admin/seo/serp/[id]
   Delete snapshot + cascade results. Requires ADMIN.
   ────────────────────────────────────────────── */

export async function DELETE(request: NextRequest, { params }: RouteCtx) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { agencyId, errorResponse } = await requireAdminFeature("seo", "ADMIN");
  if (errorResponse) return errorResponse;

  const { id } = await params;

  const existing = await prisma.serpSnapshot.findFirst({ where: { id, agencyId } });
  if (!existing) {
    return NextResponse.json({ error: "Snapshot not found" }, { status: 404 });
  }

  // Delete results first (cascade may handle this, but being explicit)
  await prisma.serpResult.deleteMany({ where: { snapshotId: id } });
  await prisma.serpSnapshot.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
