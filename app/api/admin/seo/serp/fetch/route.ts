import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { checkRateLimit } from "@/lib/api-rate-limit";
import { requireAdminFeature } from "@/lib/api-middleware";
import { fetchSerpSchema } from "@/lib/validations/seo";
import { fetchSerp, extractDomain, fetchAllKeywordMetrics } from "@/lib/seo/ctr-curve";
import type { FetchSerpResponse } from "@/lib/seo/ctr-curve";

/* ──────────────────────────────────────────────
   POST /api/admin/seo/serp/fetch
   Live SERP fetch (the "Fetch Button").
   For each keyword:
     1. Call fetchSerp()
     2. Upsert keyword in DB (update serpFeatures)
     3. Store results in a new SerpSnapshot
   Returns results + any errors.
   ────────────────────────────────────────────── */

export async function POST(request: NextRequest) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { agencyId, errorResponse } = await requireAdminFeature("seo");
  if (errorResponse) return errorResponse;

  try {
    const body = await request.json();
    const parsed = fetchSerpSchema.safeParse(body);
    if (!parsed.success) {
      const details = parsed.error.flatten().fieldErrors;
      const msg = parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ");
      console.error("[POST /api/admin/seo/serp/fetch] Validation:", msg);
      return NextResponse.json(
        { error: `Validation failed: ${msg}`, details },
        { status: 400 },
      );
    }

    const { keywords, gl, hl, num, snapshotName } = parsed.data;

    // 1. Create a snapshot shell
    const snapshot = await prisma.serpSnapshot.create({
      data: {
        name: snapshotName || `Fetch ${new Date().toISOString().slice(0, 16)}`,
        source: "api_fetch",
        keywordCount: 0,
        resultCount: 0,
        agencyId,
      },
    });

    // 2. Fetch SERPs + keyword metrics in parallel
    const normalizedTerms = keywords.map((k) => k.toLowerCase().trim());

    // Fire SERP fetches and metrics fetch simultaneously
    const [serpResponses, metricsMap] = await Promise.all([
      Promise.all(keywords.map((term) => fetchSerp(term, { gl, hl, num }))),
      fetchAllKeywordMetrics(normalizedTerms, {
        locationCode: gl === "us" ? 2840 : undefined,
        languageCode: hl,
      }),
    ]);

    // 3. Upsert keywords with both SERP features and metrics
    const fetchResults: (FetchSerpResponse & { keywordId: string })[] = [];
    const errors: { keyword: string; error: string }[] = [];

    for (let i = 0; i < keywords.length; i++) {
      const term = normalizedTerms[i];
      const result = serpResponses[i];
      const metrics = metricsMap.get(term);

      const intentValue = metrics?.intent as "INFORMATIONAL" | "COMMERCIAL" | "TRANSACTIONAL" | "NAVIGATIONAL" | undefined;

      const kw = await prisma.keyword.upsert({
        where: { term_agencyId: { term, agencyId } },
        create: {
          term,
          agencyId,
          source: "CSV_IMPORT",
          serpFeatures: result.serpFeatures,
          volume: metrics?.volume ?? null,
          difficulty: metrics?.difficulty ?? null,
          cps: metrics?.cps ?? null,
          intent: intentValue ?? null,
          lastMetricsUpdate: new Date(),
        },
        update: {
          serpFeatures: result.serpFeatures.length > 0 ? result.serpFeatures : undefined,
          volume: metrics?.volume ?? undefined,
          difficulty: metrics?.difficulty ?? undefined,
          cps: metrics?.cps ?? undefined,
          intent: intentValue ?? undefined,
          source: "CSV_IMPORT",
          lastMetricsUpdate: new Date(),
        },
      });

      if (result.error) {
        errors.push({ keyword: keywords[i], error: result.error });
      }

      fetchResults.push({ ...result, keywordId: kw.id });
    }

    // 3. Bulk create SerpResults from all fetch responses
    const allSerpData = fetchResults.flatMap((fr) =>
      fr.results.map((r) => ({
        snapshotId: snapshot.id,
        keywordId: fr.keywordId,
        position: r.position,
        url: r.url,
        domain: extractDomain(r.url),
        title: r.title,
        description: r.description || null,
      })),
    );

    if (allSerpData.length > 0) {
      await prisma.serpResult.createMany({ data: allSerpData });
    }

    // 4. Update snapshot counts
    const uniqueKeywordIds = new Set(allSerpData.map((r) => r.keywordId));
    await prisma.serpSnapshot.update({
      where: { id: snapshot.id },
      data: {
        keywordCount: uniqueKeywordIds.size,
        resultCount: allSerpData.length,
      },
    });

    return NextResponse.json({
      snapshotId: snapshot.id,
      keywordsFetched: keywords.length,
      resultsStored: allSerpData.length,
      results: fetchResults.map((fr) => ({
        keyword: fr.keyword,
        keywordId: fr.keywordId,
        resultCount: fr.results.length,
        serpFeatures: fr.serpFeatures,
        error: fr.error || null,
      })),
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (err) {
    console.error("[POST /api/admin/seo/serp/fetch]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
