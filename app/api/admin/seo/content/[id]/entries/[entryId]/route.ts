import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { checkRateLimit } from "@/lib/api-rate-limit";
import { requireAdminFeature } from "@/lib/api-middleware";
import { updateContentEntrySchema } from "@/lib/validations/seo";

/* ──────────────────────────────────────────────
   PATCH /api/admin/seo/content/[id]/entries/[entryId]
   Update a single content entry.
   ────────────────────────────────────────────── */

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; entryId: string }> },
) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { agencyId, errorResponse } = await requireAdminFeature("seo");
  if (errorResponse) return errorResponse;

  const { id, entryId } = await params;

  // Verify project belongs to this agency
  const project = await prisma.contentProject.findFirst({
    where: { id, agencyId },
    select: { id: true },
  });
  if (!project) {
    return NextResponse.json({ error: "Content project not found" }, { status: 404 });
  }

  // Verify entry belongs to this project
  const existing = await prisma.contentEntry.findFirst({
    where: { id: entryId, projectId: id },
  });
  if (!existing) {
    return NextResponse.json({ error: "Content entry not found" }, { status: 404 });
  }

  try {
    const body = await request.json();
    const parsed = updateContentEntrySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const { publishedAt, ...rest } = parsed.data;

    const updateData: Record<string, unknown> = { ...rest };
    if (publishedAt !== undefined) {
      updateData.publishedAt = publishedAt ? new Date(publishedAt) : null;
    }

    const entry = await prisma.contentEntry.update({
      where: { id: entryId },
      data: updateData,
    });

    return NextResponse.json(entry);
  } catch (err) {
    console.error("[PATCH /api/admin/seo/content/[id]/entries/[entryId]]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/* ──────────────────────────────────────────────
   DELETE /api/admin/seo/content/[id]/entries/[entryId]
   Delete a single content entry.
   ────────────────────────────────────────────── */

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; entryId: string }> },
) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { agencyId, errorResponse } = await requireAdminFeature("seo");
  if (errorResponse) return errorResponse;

  const { id, entryId } = await params;

  // Verify project belongs to this agency
  const project = await prisma.contentProject.findFirst({
    where: { id, agencyId },
    select: { id: true },
  });
  if (!project) {
    return NextResponse.json({ error: "Content project not found" }, { status: 404 });
  }

  // Verify entry belongs to this project
  const existing = await prisma.contentEntry.findFirst({
    where: { id: entryId, projectId: id },
  });
  if (!existing) {
    return NextResponse.json({ error: "Content entry not found" }, { status: 404 });
  }

  await prisma.contentEntry.delete({ where: { id: entryId } });
  return NextResponse.json({ success: true });
}
