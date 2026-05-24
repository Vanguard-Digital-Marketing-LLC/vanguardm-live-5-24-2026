import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { checkRateLimit } from "@/lib/api-rate-limit";
import { requireAdminAuth } from "@/lib/api-middleware";
import { updateKeywordSchema } from "@/lib/validations/seo";

type RouteCtx = { params: Promise<{ id: string }> };

/* ──────────────────────────────────────────────
   GET /api/admin/seo/keywords/[id]
   Get a single keyword with latest SERP results.
   ────────────────────────────────────────────── */

export async function GET(request: NextRequest, { params }: RouteCtx) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { agencyId, errorResponse } = await requireAdminAuth();
  if (errorResponse) return errorResponse;

  const { id } = await params;

  const keyword = await prisma.keyword.findFirst({
    where: { id, agencyId },
    include: {
      serpResults: {
        take: 10,
        orderBy: { createdAt: "desc" },
        include: {
          snapshot: {
            select: { id: true, name: true, scrapedAt: true },
          },
        },
      },
      listMemberships: {
        include: {
          list: { select: { id: true, name: true } },
        },
      },
    },
  });

  if (!keyword) {
    return NextResponse.json({ error: "Keyword not found" }, { status: 404 });
  }

  return NextResponse.json(keyword);
}

/* ──────────────────────────────────────────────
   PATCH /api/admin/seo/keywords/[id]
   Update keyword fields.
   ────────────────────────────────────────────── */

export async function PATCH(request: NextRequest, { params }: RouteCtx) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { agencyId, errorResponse } = await requireAdminAuth();
  if (errorResponse) return errorResponse;

  const { id } = await params;

  try {
    const existing = await prisma.keyword.findFirst({ where: { id, agencyId } });
    if (!existing) {
      return NextResponse.json({ error: "Keyword not found" }, { status: 404 });
    }

    const body = await request.json();
    const parsed = updateKeywordSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const data = { ...parsed.data } as Record<string, unknown>;
    if (data.term && typeof data.term === "string") {
      data.term = data.term.toLowerCase().trim();
    }
    data.lastMetricsUpdate = new Date();

    const keyword = await prisma.keyword.update({
      where: { id },
      data,
    });

    return NextResponse.json(keyword);
  } catch (err) {
    console.error("[PATCH /api/admin/seo/keywords/[id]]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/* ──────────────────────────────────────────────
   DELETE /api/admin/seo/keywords/[id]
   Delete a keyword. Requires ADMIN role.
   ────────────────────────────────────────────── */

export async function DELETE(request: NextRequest, { params }: RouteCtx) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { agencyId, errorResponse } = await requireAdminAuth("ADMIN");
  if (errorResponse) return errorResponse;

  const { id } = await params;

  const existing = await prisma.keyword.findFirst({ where: { id, agencyId } });
  if (!existing) {
    return NextResponse.json({ error: "Keyword not found" }, { status: 404 });
  }

  await prisma.keyword.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
