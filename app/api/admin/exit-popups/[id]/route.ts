import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { checkRateLimit } from "@/lib/api-rate-limit";
import { requireAdminAuth } from "@/lib/api-middleware";

export const dynamic = "force-dynamic";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const auth = await requireAdminAuth("ADMIN");
  if (auth.errorResponse) return auth.errorResponse;
  const { agencyId } = auth;

  const { id } = await params;
  const existing = await prisma.exitPopupConfig.findFirst({ where: { id, agencyId } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

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

  const config = await prisma.exitPopupConfig.update({ where: { id }, data });
  return NextResponse.json(config);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const auth = await requireAdminAuth("ADMIN");
  if (auth.errorResponse) return auth.errorResponse;
  const { agencyId } = auth;

  const { id } = await params;
  const existing = await prisma.exitPopupConfig.findFirst({ where: { id, agencyId } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.exitPopupConfig.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
