import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { checkRateLimit } from "@/lib/api-rate-limit";
import { requireAdminFeature } from "@/lib/api-middleware";

export const dynamic = "force-dynamic";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const auth = await requireAdminFeature("leads", "ADMIN");
  if (auth.errorResponse) return auth.errorResponse;
  const { agencyId } = auth;

  const { id } = await params;
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "invalid body" }, { status: 400 });

  const data: Record<string, unknown> = {};
  if (typeof body.headline === "string") data.headline = body.headline.trim();
  if (typeof body.description === "string") data.description = body.description.trim();
  if (typeof body.ctaText === "string") data.ctaText = body.ctaText.trim();
  if (typeof body.ctaLink === "string") data.ctaLink = body.ctaLink.trim();
  if (body.offerType !== undefined)
    data.offerType = body.offerType ? String(body.offerType).trim() : null;
  if (typeof body.isActive === "boolean") data.isActive = body.isActive;
  if (Array.isArray(body.showOnPaths) || body.showOnPaths === null)
    data.showOnPaths = body.showOnPaths ?? null;

  const result = await prisma.exitPopupConfig.updateMany({
    where: { id, agencyId },
    data,
  });
  if (result.count === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const config = await prisma.exitPopupConfig.findFirst({ where: { id, agencyId } });
  return NextResponse.json(config);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const auth = await requireAdminFeature("leads", "ADMIN");
  if (auth.errorResponse) return auth.errorResponse;
  const { agencyId } = auth;

  const { id } = await params;
  const result = await prisma.exitPopupConfig.deleteMany({ where: { id, agencyId } });
  if (result.count === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
