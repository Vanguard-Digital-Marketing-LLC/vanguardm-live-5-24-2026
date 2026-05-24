import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { checkRateLimit } from "@/lib/api-rate-limit";
import { requireAdminFeature } from "@/lib/api-middleware";
import { bulkImportSerpSchema } from "@/lib/validations/seo";
import { extractDomain } from "@/lib/seo/ctr-curve";

/* ──────────────────────────────────────────────
   POST /api/admin/seo/serp/import
   Bulk import SERP data.
   For each result:
     1. Upsert keyword by term + agencyId
     2. Extract domain from URL
     3. Create SerpResult linked to keyword + snapshot
   ────────────────────────────────────────────── */

export async function POST(request: NextRequest) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { agencyId, errorResponse } = await requireAdminFeature("seo");
  if (errorResponse) return errorResponse;

  try {
    const body = await request.json();
    const parsed = bulkImportSerpSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const { snapshotName, results } = parsed.data;

    // 1. Create the snapshot
    const snapshot = await prisma.serpSnapshot.create({
      data: {
        name: snapshotName || `Import ${new Date().toISOString().slice(0, 16)}`,
        source: "csv_import",
        keywordCount: 0,
        resultCount: 0,
        agencyId,
      },
    });

    // 2. Collect unique keyword terms from the results
    const uniqueTerms = [...new Set(results.map((r) => r.keywordTerm.toLowerCase().trim()))];

    // 3. Upsert all keywords
    const keywordMap = new Map<string, string>(); // term -> id
    await Promise.all(
      uniqueTerms.map(async (term) => {
        const kw = await prisma.keyword.upsert({
          where: { term_agencyId: { term, agencyId } },
          create: { term, agencyId, source: "CSV_IMPORT" },
          update: { lastMetricsUpdate: new Date() },
        });
        keywordMap.set(term, kw.id);
      }),
    );

    // 4. Bulk create SerpResults
    const serpResultsData = results.map((r) => ({
      snapshotId: snapshot.id,
      keywordId: keywordMap.get(r.keywordTerm.toLowerCase().trim())!,
      position: r.position,
      url: r.url,
      domain: extractDomain(r.url),
      title: r.title,
      description: r.description || null,
    }));

    await prisma.serpResult.createMany({ data: serpResultsData });

    // 5. Update snapshot counts
    const updatedSnapshot = await prisma.serpSnapshot.update({
      where: { id: snapshot.id },
      data: {
        keywordCount: uniqueTerms.length,
        resultCount: serpResultsData.length,
      },
      include: { _count: { select: { results: true } } },
    });

    return NextResponse.json(
      {
        snapshot: updatedSnapshot,
        keywordsUpserted: uniqueTerms.length,
        resultsCreated: serpResultsData.length,
      },
      { status: 201 },
    );
  } catch (err) {
    console.error("[POST /api/admin/seo/serp/import]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
