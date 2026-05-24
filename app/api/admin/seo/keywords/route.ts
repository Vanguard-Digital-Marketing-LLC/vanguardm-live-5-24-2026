import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { checkRateLimit } from "@/lib/api-rate-limit";
import { requireAdminFeature } from "@/lib/api-middleware";
import {
  createKeywordSchema,
  bulkCreateKeywordsSchema,
} from "@/lib/validations/seo";

/* ──────────────────────────────────────────────
   GET /api/admin/seo/keywords
   List all keywords for the agency (seed database).
   Supports search, intent, source, tag filters,
   sorting, and cursor-free pagination.
   ────────────────────────────────────────────── */

export async function GET(request: NextRequest) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { agencyId, errorResponse } = await requireAdminFeature("seo");
  if (errorResponse) return errorResponse;

  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");
  const intent = searchParams.get("intent");
  const source = searchParams.get("source");
  const tag = searchParams.get("tag");
  const sort = searchParams.get("sort") || "createdAt";
  const dir = searchParams.get("dir") === "asc" ? "asc" : "desc";
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const limit = Math.min(200, Math.max(1, parseInt(searchParams.get("limit") || "50", 10)));

  // Build where clause
  const where: Record<string, unknown> = { agencyId };
  if (search) where.term = { contains: search, mode: "insensitive" };
  if (intent) where.intent = intent;
  if (source) where.source = source;
  if (tag) where.tags = { has: tag };

  // Validate sort field
  const allowedSorts = ["volume", "difficulty", "trafficPotential", "term", "createdAt"];
  const orderField = allowedSorts.includes(sort) ? sort : "createdAt";

  const [data, total] = await Promise.all([
    prisma.keyword.findMany({
      where,
      orderBy: { [orderField]: dir },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        _count: { select: { serpResults: true, listMemberships: true } },
      },
    }),
    prisma.keyword.count({ where }),
  ]);

  return NextResponse.json(data, {
    headers: {
      "X-Total-Count": String(total),
      "X-Page": String(page),
      "X-Limit": String(limit),
    },
  });
}

/* ──────────────────────────────────────────────
   POST /api/admin/seo/keywords
   Create or upsert keyword(s).
   Single keyword: { term, volume, ... }
   Bulk: { keywords: [...] }
   ────────────────────────────────────────────── */

export async function POST(request: NextRequest) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { agencyId, errorResponse } = await requireAdminFeature("seo");
  if (errorResponse) return errorResponse;

  try {
    const body = await request.json();

    // Bulk upsert path
    if (body.keywords) {
      const parsed = bulkCreateKeywordsSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json(
          { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
          { status: 400 },
        );
      }

      const results = await Promise.all(
        parsed.data.keywords.map((kw) =>
          prisma.keyword.upsert({
            where: {
              term_agencyId: { term: kw.term.toLowerCase().trim(), agencyId },
            },
            create: {
              ...kw,
              term: kw.term.toLowerCase().trim(),
              agencyId,
            },
            update: {
              ...kw,
              term: kw.term.toLowerCase().trim(),
              lastMetricsUpdate: new Date(),
            },
          }),
        ),
      );

      return NextResponse.json(
        { created: results.length, keywords: results },
        { status: 201 },
      );
    }

    // Single keyword path
    const parsed = createKeywordSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const keyword = await prisma.keyword.upsert({
      where: {
        term_agencyId: { term: parsed.data.term.toLowerCase().trim(), agencyId },
      },
      create: {
        ...parsed.data,
        term: parsed.data.term.toLowerCase().trim(),
        agencyId,
      },
      update: {
        ...parsed.data,
        term: parsed.data.term.toLowerCase().trim(),
        lastMetricsUpdate: new Date(),
      },
    });

    return NextResponse.json(keyword, { status: 201 });
  } catch (err) {
    console.error("[POST /api/admin/seo/keywords]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
