import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { checkRateLimit } from "@/lib/api-rate-limit";
import { requireAdminFeature } from "@/lib/api-middleware";
import { createContentProjectSchema } from "@/lib/validations/seo";

/* ──────────────────────────────────────────────
   GET /api/admin/seo/content
   List content projects for the agency.
   Supports ?clientId= and ?search= filters.
   ────────────────────────────────────────────── */

export async function GET(request: NextRequest) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { agencyId, errorResponse } = await requireAdminFeature("seo");
  if (errorResponse) return errorResponse;

  const { searchParams } = new URL(request.url);
  const clientId = searchParams.get("clientId");
  const search = searchParams.get("search");

  const where: Record<string, unknown> = { agencyId };
  if (clientId) where.clientId = clientId;
  if (search) where.name = { contains: search, mode: "insensitive" };

  const data = await prisma.contentProject.findMany({
    where,
    orderBy: { updatedAt: "desc" },
    include: {
      _count: { select: { entries: true } },
      client: { select: { id: true, name: true } },
    },
  });

  return NextResponse.json(data);
}

/* ──────────────────────────────────────────────
   POST /api/admin/seo/content
   Create a new content project.
   ────────────────────────────────────────────── */

export async function POST(request: NextRequest) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { agencyId, errorResponse } = await requireAdminFeature("seo");
  if (errorResponse) return errorResponse;

  try {
    const body = await request.json();
    const parsed = createContentProjectSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const project = await prisma.contentProject.create({
      data: { ...parsed.data, agencyId },
      include: {
        _count: { select: { entries: true } },
        client: { select: { id: true, name: true } },
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (err) {
    console.error("[POST /api/admin/seo/content]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
