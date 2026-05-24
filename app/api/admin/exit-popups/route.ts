import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { checkRateLimit } from "@/lib/api-rate-limit";
import { requireAdminAuth } from "@/lib/api-middleware";

export const dynamic = "force-dynamic";

/* ──────────────────────────────────────────────
   GET /api/admin/exit-popups   list all configs
   POST /api/admin/exit-popups  create new
   ────────────────────────────────────────────── */

export async function GET(request: NextRequest) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const auth = await requireAdminAuth("ADMIN");
  if (auth.errorResponse) return auth.errorResponse;
  const { agencyId } = auth;

  const configs = await prisma.exitPopupConfig.findMany({
    where: { agencyId },
    orderBy: { updatedAt: "desc" },
  });
  return NextResponse.json({ data: configs });
}

export async function POST(request: NextRequest) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const auth = await requireAdminAuth("ADMIN");
  if (auth.errorResponse) return auth.errorResponse;
  const { agencyId } = auth;

  const body = await request.json().catch(() => null);
  const headline = body?.headline?.toString().trim();
  const description = body?.description?.toString().trim();
  const ctaText = body?.ctaText?.toString().trim();
  const ctaLink = body?.ctaLink?.toString().trim();
  if (!headline || !description || !ctaText || !ctaLink) {
    return NextResponse.json(
      { error: "headline, description, ctaText, ctaLink are required" },
      { status: 400 },
    );
  }

  const config = await prisma.exitPopupConfig.create({
    data: {
      agencyId,
      headline,
      description,
      ctaText,
      ctaLink,
      offerType: body.offerType?.toString().trim() || null,
      isActive: body.isActive !== false,
      showOnPaths: Array.isArray(body.showOnPaths) ? body.showOnPaths : null,
    },
  });
  return NextResponse.json(config, { status: 201 });
}
