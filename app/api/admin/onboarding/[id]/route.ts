import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminAuth } from "@/lib/api-middleware";
import { checkRateLimit } from "@/lib/api-rate-limit";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { agencyId, errorResponse } = await requireAdminAuth();
  if (errorResponse) return errorResponse;

  const { id } = await params;
  const onboarding = await prisma.clientOnboarding.findFirst({
    where: { id, agencyId },
    include: {
      client: { select: { id: true, name: true, email: true } },
      createdBy: { select: { id: true, name: true } },
      responses: true,
      files: {
        select: {
          id: true,
          category: true,
          fileName: true,
          mimeType: true,
          fileSize: true,
          uploadedBy: true,
          createdAt: true,
        },
      },
    },
  });

  if (!onboarding) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(onboarding);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { agencyId, errorResponse } = await requireAdminAuth("ADMIN");
  if (errorResponse) return errorResponse;

  const { id } = await params;

  const existing = await prisma.clientOnboarding.findFirst({ where: { id, agencyId } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await request.json();

  const allowedFields = ["status", "currentStep", "respondentName", "respondentEmail", "serviceTypes"];
  const data: Record<string, unknown> = {};
  for (const field of allowedFields) {
    if (body[field] !== undefined) data[field] = body[field];
  }

  if (body.tokenExpiresAt) data.tokenExpiresAt = new Date(body.tokenExpiresAt);

  const onboarding = await prisma.clientOnboarding.update({
    where: { id },
    data,
    include: {
      client: { select: { id: true, name: true } },
    },
  });

  return NextResponse.json(onboarding);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { agencyId, errorResponse } = await requireAdminAuth("ADMIN");
  if (errorResponse) return errorResponse;

  const { id } = await params;

  const existing = await prisma.clientOnboarding.findFirst({ where: { id, agencyId } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Delete associated files from storage
  const files = await prisma.onboardingFile.findMany({ where: { onboardingId: id } });
  if (files.length > 0) {
    const { deleteFiles } = await import("@/lib/storage");
    await deleteFiles(files.map((f) => f.storagePath));
  }

  await prisma.clientOnboarding.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
