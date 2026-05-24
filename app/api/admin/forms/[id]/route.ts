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
  const { agencyId, errorResponse } = await requireAdminFeature("leads", "ADMIN");
  if (errorResponse) return errorResponse;

  const { id } = await params;
  const existing = await prisma.multiStepForm.findFirst({ where: { id, agencyId } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "invalid body" }, { status: 400 });

  const data: Record<string, unknown> = {};
  if (typeof body.name === "string") data.name = body.name.trim();
  if (typeof body.slug === "string") {
    const slug = body.slug.trim().toLowerCase();
    if (!/^[a-z0-9][a-z0-9-]*$/.test(slug)) {
      return NextResponse.json(
        { error: "slug must be lowercase alphanumeric/dashes" },
        { status: 400 },
      );
    }
    if (slug !== existing.slug) {
      const conflict = await prisma.multiStepForm.findUnique({ where: { slug } });
      if (conflict) return NextResponse.json({ error: "slug already in use" }, { status: 409 });
    }
    data.slug = slug;
  }
  if (typeof body.isActive === "boolean") data.isActive = body.isActive;
  if (Array.isArray(body.steps)) data.steps = body.steps;

  const result = await prisma.multiStepForm.updateMany({
    where: { id, agencyId },
    data,
  });
  if (result.count === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const form = await prisma.multiStepForm.findFirst({ where: { id, agencyId } });
  return NextResponse.json(form);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { agencyId, errorResponse } = await requireAdminFeature("leads", "ADMIN");
  if (errorResponse) return errorResponse;

  const { id } = await params;
  const result = await prisma.multiStepForm.deleteMany({ where: { id, agencyId } });
  if (result.count === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
