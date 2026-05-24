import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { checkRateLimit } from "@/lib/api-rate-limit";
import { requireAdminFeature } from "@/lib/api-middleware";
import { estimateTraffic } from "@/lib/seo/ctr-curve";

export async function GET(request: NextRequest) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { agencyId, errorResponse } = await requireAdminFeature("seo");
  if (errorResponse) return errorResponse;

  const { searchParams } = new URL(request.url);
  const domain = searchParams.get("domain");
  const snapshotId = searchParams.get("snapshotId");

  if (!domain) {
    return NextResponse.json({ error: "domain parameter is required" }, { status: 400 });
  }

  const cleanDomain = domain.replace(/^(https?:\/\/)?(www\.)?/, "").replace(/\/.*$/, "").toLowerCase();

  try {
    const where: Record<string, unknown> = {
      domain: { contains: cleanDomain, mode: "insensitive" },
      snapshot: { agencyId },
    };
    if (snapshotId) where.snapshotId = snapshotId;

    const results = await prisma.serpResult.findMany({
      where,
      include: {
        keyword: {
          select: {
            id: true,
            term: true,
            volume: true,
            difficulty: true,
            intent: true,
            cps: true,
            trafficPotential: true,
          },
        },
        snapshot: {
          select: { id: true, name: true, scrapedAt: true },
        },
      },
      orderBy: { position: "asc" },
    });

    // Dedupe: keep the best (lowest) position per keyword
    const bestByKeyword = new Map<string, typeof results[number]>();
    for (const r of results) {
      const existing = bestByKeyword.get(r.keywordId);
      if (!existing || r.position < existing.position) {
        bestByKeyword.set(r.keywordId, r);
      }
    }

    const deduped = Array.from(bestByKeyword.values());

    const mapped = deduped.map((r) => ({
      keyword: r.keyword,
      position: r.position,
      url: r.url,
      title: r.title,
      estimatedTraffic: estimateTraffic(r.keyword.volume ?? 0, r.position),
      snapshotId: r.snapshot.id,
      scrapedAt: r.snapshot.scrapedAt,
    }));

    // Sort by estimated traffic descending
    mapped.sort((a, b) => b.estimatedTraffic - a.estimatedTraffic);

    const totalEstimatedTraffic = mapped.reduce((sum, r) => sum + r.estimatedTraffic, 0);
    const topKeyword = mapped[0]?.keyword.term || null;

    return NextResponse.json({
      summary: {
        domain: cleanDomain,
        totalKeywords: mapped.length,
        totalEstimatedTraffic,
        topKeyword,
      },
      results: mapped,
    });
  } catch (err) {
    console.error("[GET /api/admin/seo/domains/lookup]", err);
    return NextResponse.json({ error: "Failed to perform domain lookup" }, { status: 500 });
  }
}
