import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { checkRateLimit } from "@/lib/api-rate-limit";
import { requireAdminAuth } from "@/lib/api-middleware";
import { updateSocialPostSchema } from "@/lib/validations/seo";

/* ──────────────────────────────────────────────
   /api/admin/seo/social/[id]
   GET:    Single social post detail.
   PATCH:  Update social post fields.
   DELETE: Remove social post (ADMIN or creator only).
   ────────────────────────────────────────────── */

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { session, agencyId, errorResponse } = await requireAdminAuth();
  if (errorResponse) return errorResponse;

  const { id } = await params;

  const post = await prisma.socialPost.findFirst({
    where: { id, agencyId },
    include: {
      client: { select: { id: true, name: true } },
      createdBy: { select: { id: true, name: true } },
    },
  });

  if (!post) {
    return NextResponse.json({ error: "Social post not found" }, { status: 404 });
  }

  return NextResponse.json(post);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { session, agencyId, errorResponse } = await requireAdminAuth();
  if (errorResponse) return errorResponse;

  const { id } = await params;

  const existing = await prisma.socialPost.findFirst({ where: { id, agencyId } });
  if (!existing) {
    return NextResponse.json({ error: "Social post not found" }, { status: 404 });
  }

  try {
    const body = await request.json();
    const parsed = updateSocialPostSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const { scheduledAt, publishedAt, ...rest } = parsed.data;

    const updateData: Record<string, unknown> = { ...rest };

    if (scheduledAt !== undefined) {
      updateData.scheduledAt = scheduledAt ? new Date(scheduledAt) : null;
    }
    if (publishedAt !== undefined) {
      updateData.publishedAt = publishedAt ? new Date(publishedAt) : null;
    }

    const post = await prisma.socialPost.update({
      where: { id },
      data: updateData,
      include: {
        client: { select: { id: true, name: true } },
        createdBy: { select: { id: true, name: true } },
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error("[PATCH /api/admin/seo/social/[id]]", error);
    return NextResponse.json(
      { error: "Failed to update social post" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { session, agencyId, errorResponse } = await requireAdminAuth();
  if (errorResponse) return errorResponse;

  const { id } = await params;

  const existing = await prisma.socialPost.findFirst({ where: { id, agencyId } });
  if (!existing) {
    return NextResponse.json({ error: "Social post not found" }, { status: 404 });
  }

  // Only ADMIN role or the post creator can delete
  const userRole = session.user.role ?? (session.user.isAdmin ? "ADMIN" : "USER");
  if (userRole !== "ADMIN" && existing.createdById !== session.user.id) {
    return NextResponse.json(
      { error: "Forbidden: only admins or the post creator can delete" },
      { status: 403 },
    );
  }

  await prisma.socialPost.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
