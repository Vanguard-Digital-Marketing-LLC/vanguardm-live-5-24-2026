import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { checkRateLimit } from "@/lib/api-rate-limit";
import { requireAdminAuth } from "@/lib/api-middleware";
import { updateContentProjectSchema } from "@/lib/validations/seo";

/* ──────────────────────────────────────────────
   GET /api/admin/seo/content/[id]
   Get a single content project with all entries.
   ────────────────────────────────────────────── */

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { agencyId, errorResponse } = await requireAdminAuth();
  if (errorResponse) return errorResponse;

  const { id } = await params;

  const project = await prisma.contentProject.findFirst({
    where: { id, agencyId },
    include: {
      entries: { orderBy: { createdAt: "desc" } },
      client: { select: { id: true, name: true } },
    },
  });

  if (!project) {
    return NextResponse.json({ error: "Content project not found" }, { status: 404 });
  }

  return NextResponse.json(project);
}

/* ──────────────────────────────────────────────
   PATCH /api/admin/seo/content/[id]
   Update a content project.
   ────────────────────────────────────────────── */

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { agencyId, errorResponse } = await requireAdminAuth();
  if (errorResponse) return errorResponse;

  const { id } = await params;

  const existing = await prisma.contentProject.findFirst({ where: { id, agencyId } });
  if (!existing) {
    return NextResponse.json({ error: "Content project not found" }, { status: 404 });
  }

  try {
    const body = await request.json();
    const parsed = updateContentProjectSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const project = await prisma.contentProject.update({
      where: { id },
      data: parsed.data,
      include: {
        _count: { select: { entries: true } },
        client: { select: { id: true, name: true } },
      },
    });

    return NextResponse.json(project);
  } catch (err) {
    console.error("[PATCH /api/admin/seo/content/[id]]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/* ──────────────────────────────────────────────
   DELETE /api/admin/seo/content/[id]
   Delete a content project (cascades to entries).
   Requires ADMIN role.
   ────────────────────────────────────────────── */

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { agencyId, errorResponse } = await requireAdminAuth("ADMIN");
  if (errorResponse) return errorResponse;

  const { id } = await params;

  const existing = await prisma.contentProject.findFirst({ where: { id, agencyId } });
  if (!existing) {
    return NextResponse.json({ error: "Content project not found" }, { status: 404 });
  }

  await prisma.contentProject.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
