import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { checkRateLimit } from "@/lib/api-rate-limit";
import { requireAdminAuth } from "@/lib/api-middleware";
import { createSocialPostSchema } from "@/lib/validations/seo";

/* ──────────────────────────────────────────────
   GET /api/admin/seo/social
   List social posts for the agency.
   Filters: platform, status, clientId, from/to date range.
   ────────────────────────────────────────────── */

export async function GET(request: NextRequest) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { agencyId, errorResponse } = await requireAdminAuth();
  if (errorResponse) return errorResponse;

  const { searchParams } = new URL(request.url);
  const platform = searchParams.get("platform");
  const status = searchParams.get("status");
  const clientId = searchParams.get("clientId");
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const where: Record<string, unknown> = { agencyId };

  if (platform) where.platform = platform;
  if (status) where.status = status;
  if (clientId) where.clientId = clientId;

  if (from || to) {
    const scheduledAtFilter: Record<string, Date> = {};
    if (from) scheduledAtFilter.gte = new Date(from);
    if (to) scheduledAtFilter.lte = new Date(to);
    where.scheduledAt = scheduledAtFilter;
  }

  const data = await prisma.socialPost.findMany({
    where,
    orderBy: [{ scheduledAt: "desc" }, { createdAt: "desc" }],
    include: {
      client: { select: { id: true, name: true } },
      createdBy: { select: { id: true, name: true } },
    },
  });

  return NextResponse.json(data);
}

/* ──────────────────────────────────────────────
   POST /api/admin/seo/social
   Create a new social post.
   ────────────────────────────────────────────── */

export async function POST(request: NextRequest) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { session, agencyId, errorResponse } = await requireAdminAuth();
  if (errorResponse) return errorResponse;

  try {
    const body = await request.json();
    const parsed = createSocialPostSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const { scheduledAt, ...rest } = parsed.data;

    const post = await prisma.socialPost.create({
      data: {
        ...rest,
        scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
        agencyId,
        createdById: session.user.id,
      },
      include: {
        client: { select: { id: true, name: true } },
        createdBy: { select: { id: true, name: true } },
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("[POST /api/admin/seo/social]", error);
    return NextResponse.json(
      { error: "Failed to create social post" },
      { status: 500 },
    );
  }
}
