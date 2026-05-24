import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { checkRateLimit } from "@/lib/api-rate-limit";
import { requireAdminAuth } from "@/lib/api-middleware";
import { createContentEntrySchema } from "@/lib/validations/seo";

/* ──────────────────────────────────────────────
   GET /api/admin/seo/content/[id]/entries
   List entries for a content project.
   Supports ?search=, ?status=, ?contentType=,
   ?sort= and ?dir= parameters.
   ────────────────────────────────────────────── */

const SORTABLE_FIELDS = ["organicTraffic", "trafficValue", "referringDomains", "domainRating"] as const;
type SortField = (typeof SORTABLE_FIELDS)[number];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { agencyId, errorResponse } = await requireAdminAuth();
  if (errorResponse) return errorResponse;

  const { id } = await params;

  // Verify project belongs to this agency
  const project = await prisma.contentProject.findFirst({
    where: { id, agencyId },
    select: { id: true },
  });
  if (!project) {
    return NextResponse.json({ error: "Content project not found" }, { status: 404 });
  }

  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");
  const status = searchParams.get("status");
  const contentType = searchParams.get("contentType");
  const sort = searchParams.get("sort") as SortField | null;
  const dir = searchParams.get("dir") === "asc" ? "asc" : "desc";

  const where: Record<string, unknown> = { projectId: id };

  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { url: { contains: search, mode: "insensitive" } },
    ];
  }
  if (status) where.status = status;
  if (contentType) where.contentType = contentType;

  // Build orderBy
  const orderBy: Record<string, string> =
    sort && (SORTABLE_FIELDS as readonly string[]).includes(sort)
      ? { [sort]: dir }
      : { createdAt: "desc" };

  const data = await prisma.contentEntry.findMany({
    where,
    orderBy,
  });

  return NextResponse.json(data);
}

/* ──────────────────────────────────────────────
   POST /api/admin/seo/content/[id]/entries
   Add an entry to a content project.
   ────────────────────────────────────────────── */

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { agencyId, errorResponse } = await requireAdminAuth();
  if (errorResponse) return errorResponse;

  const { id } = await params;

  // Verify project belongs to this agency
  const project = await prisma.contentProject.findFirst({
    where: { id, agencyId },
    select: { id: true },
  });
  if (!project) {
    return NextResponse.json({ error: "Content project not found" }, { status: 404 });
  }

  try {
    const body = await request.json();
    const parsed = createContentEntrySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const { publishedAt, ...rest } = parsed.data;

    const entry = await prisma.contentEntry.create({
      data: {
        ...rest,
        publishedAt: publishedAt ? new Date(publishedAt) : null,
        projectId: id,
      },
    });

    return NextResponse.json(entry, { status: 201 });
  } catch (err) {
    console.error("[POST /api/admin/seo/content/[id]/entries]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
