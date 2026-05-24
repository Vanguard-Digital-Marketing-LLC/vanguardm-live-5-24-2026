import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminAuth } from "@/lib/api-middleware";
import { checkRateLimit } from "@/lib/api-rate-limit";
import { isValidStepKey } from "@/lib/onboarding-steps";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { agencyId, errorResponse } = await requireAdminAuth();
  if (errorResponse) return errorResponse;

  const { id } = await params;

  // Verify onboarding belongs to agency
  const onboarding = await prisma.clientOnboarding.findFirst({ where: { id, agencyId } });
  if (!onboarding) return NextResponse.json({ error: "Onboarding not found" }, { status: 404 });

  const responses = await prisma.onboardingResponse.findMany({
    where: { onboardingId: id },
    orderBy: { updatedAt: "desc" },
  });

  return NextResponse.json(responses);
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
  const body = await request.json();

  if (!body.stepKey || !body.data) {
    return NextResponse.json({ error: "stepKey and data are required" }, { status: 400 });
  }

  // Verify onboarding belongs to agency
  const onboarding = await prisma.clientOnboarding.findFirst({ where: { id, agencyId } });
  if (!onboarding) return NextResponse.json({ error: "Onboarding not found" }, { status: 404 });

  if (!isValidStepKey(body.stepKey, onboarding.serviceTypes)) {
    return NextResponse.json({ error: "Invalid step for this onboarding" }, { status: 400 });
  }

  const MAX_RESPONSE_SIZE = 50_000;
  const bodyStr = JSON.stringify(body.data);
  if (bodyStr.length > MAX_RESPONSE_SIZE) {
    return NextResponse.json({ error: "Response data too large" }, { status: 413 });
  }

  const response = await prisma.onboardingResponse.upsert({
    where: { onboardingId_stepKey: { onboardingId: id, stepKey: body.stepKey } },
    create: { onboardingId: id, stepKey: body.stepKey, data: body.data },
    update: { data: body.data },
  });

  // Move from DRAFT to IN_PROGRESS on first save
  if (onboarding.status === "DRAFT") {
    await prisma.clientOnboarding.update({
      where: { id },
      data: { status: "IN_PROGRESS" },
    });
  }

  // Update currentStep if provided
  if (typeof body.currentStep === "number") {
    await prisma.clientOnboarding.update({
      where: { id },
      data: { currentStep: body.currentStep },
    });
  }

  return NextResponse.json(response);
}
