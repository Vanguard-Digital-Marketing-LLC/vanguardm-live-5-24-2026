import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { checkRateLimit } from "@/lib/api-rate-limit";
import { requireAdminAuth } from "@/lib/api-middleware";

export const dynamic = "force-dynamic";

/* GET /api/admin/forms — list MultiStepForms scoped to agency
   POST /api/admin/forms — create */

export async function GET(request: NextRequest) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { agencyId, errorResponse } = await requireAdminAuth();
  if (errorResponse) return errorResponse;

  const forms = await prisma.multiStepForm.findMany({
    where: { agencyId },
    orderBy: { updatedAt: "desc" },
    include: { _count: { select: { responses: true } } },
  });
  return NextResponse.json({ data: forms });
}

export async function POST(request: NextRequest) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { agencyId, errorResponse } = await requireAdminAuth("ADMIN");
  if (errorResponse) return errorResponse;

  const body = await request.json().catch(() => null);
  const name = body?.name?.toString().trim();
  const slug = body?.slug?.toString().trim().toLowerCase();
  if (!name || !slug) {
    return NextResponse.json({ error: "name and slug are required" }, { status: 400 });
  }
  if (!/^[a-z0-9][a-z0-9-]*$/.test(slug)) {
    return NextResponse.json(
      { error: "slug must be lowercase alphanumeric/dashes" },
      { status: 400 },
    );
  }

  // Steps: accept array or empty default
  const steps = Array.isArray(body.steps) ? body.steps : [];

  // Slug is globally unique — guard
  const conflict = await prisma.multiStepForm.findUnique({ where: { slug } });
  if (conflict) {
    return NextResponse.json({ error: "slug already in use" }, { status: 409 });
  }

  const form = await prisma.multiStepForm.create({
    data: {
      agencyId,
      name,
      slug,
      steps,
      isActive: body.isActive !== false,
    },
  });
  return NextResponse.json(form, { status: 201 });
}
