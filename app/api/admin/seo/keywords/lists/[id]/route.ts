import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { checkRateLimit } from "@/lib/api-rate-limit";
import { requireAdminAuth } from "@/lib/api-middleware";
import { updateKeywordListSchema } from "@/lib/validations/seo";

type RouteCtx = { params: Promise<{ id: string }> };

/* ──────────────────────────────────────────────
   GET /api/admin/seo/keywords/lists/[id]
   Get a list with all keyword entries joined to
   full keyword data.
   ────────────────────────────────────────────── */

export async function GET(request: NextRequest, { params }: RouteCtx) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { agencyId, errorResponse } = await requireAdminAuth();
  if (errorResponse) return errorResponse;

  const { id } = await params;

  const list = await prisma.keywordList.findFirst({
    where: { id, agencyId },
    include: {
      client: { select: { id: true, name: true } },
      entries: {
        include: {
          keyword: true,
        },
        orderBy: { addedAt: "desc" },
      },
    },
  });

  if (!list) {
    return NextResponse.json({ error: "List not found" }, { status: 404 });
  }

  return NextResponse.json(list);
}

/* ──────────────────────────────────────────────
   PATCH /api/admin/seo/keywords/lists/[id]
   Update list name, notes, or clientId.
   ────────────────────────────────────────────── */

export async function PATCH(request: NextRequest, { params }: RouteCtx) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { agencyId, errorResponse } = await requireAdminAuth();
  if (errorResponse) return errorResponse;

  const { id } = await params;

  try {
    const existing = await prisma.keywordList.findFirst({ where: { id, agencyId } });
    if (!existing) {
      return NextResponse.json({ error: "List not found" }, { status: 404 });
    }

    const body = await request.json();
    const parsed = updateKeywordListSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const list = await prisma.keywordList.update({
      where: { id },
      data: parsed.data,
      include: {
        _count: { select: { entries: true } },
        client: { select: { id: true, name: true } },
      },
    });

    return NextResponse.json(list);
  } catch (err) {
    console.error("[PATCH /api/admin/seo/keywords/lists/[id]]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/* ──────────────────────────────────────────────
   DELETE /api/admin/seo/keywords/lists/[id]
   Delete a list (entries cascade). Requires ADMIN.
   ────────────────────────────────────────────── */

export async function DELETE(request: NextRequest, { params }: RouteCtx) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { agencyId, errorResponse } = await requireAdminAuth("ADMIN");
  if (errorResponse) return errorResponse;

  const { id } = await params;

  const existing = await prisma.keywordList.findFirst({ where: { id, agencyId } });
  if (!existing) {
    return NextResponse.json({ error: "List not found" }, { status: 404 });
  }

  await prisma.keywordList.delete({ where: { id } });

  return NextResponse.json({ success: true });
}

/* ──────────────────────────────────────────────
   POST /api/admin/seo/keywords/lists/[id]
   Add keywords to the list.
   Body: { keywordIds: string[] }
   ────────────────────────────────────────────── */

export async function POST(request: NextRequest, { params }: RouteCtx) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { agencyId, errorResponse } = await requireAdminAuth();
  if (errorResponse) return errorResponse;

  const { id } = await params;

  try {
    const existing = await prisma.keywordList.findFirst({ where: { id, agencyId } });
    if (!existing) {
      return NextResponse.json({ error: "List not found" }, { status: 404 });
    }

    const body = await request.json();
    const keywordIds = body.keywordIds;
    if (!Array.isArray(keywordIds) || keywordIds.length === 0) {
      return NextResponse.json(
        { error: "keywordIds must be a non-empty array" },
        { status: 400 },
      );
    }

    // Verify all keywords belong to the agency
    const keywords = await prisma.keyword.findMany({
      where: { id: { in: keywordIds }, agencyId },
      select: { id: true },
    });
    const validIds = new Set(keywords.map((k) => k.id));
    const invalidIds = keywordIds.filter((kid: string) => !validIds.has(kid));
    if (invalidIds.length > 0) {
      return NextResponse.json(
        { error: "Some keyword IDs are invalid or not in your agency", invalidIds },
        { status: 400 },
      );
    }

    const result = await prisma.keywordListEntry.createMany({
      data: keywordIds.map((keywordId: string) => ({
        keywordId,
        listId: id,
      })),
      skipDuplicates: true,
    });

    return NextResponse.json({ added: result.count }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/admin/seo/keywords/lists/[id]]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
