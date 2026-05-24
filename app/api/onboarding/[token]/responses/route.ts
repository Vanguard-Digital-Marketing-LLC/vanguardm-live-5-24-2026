import { NextRequest, NextResponse } from "next/server";
import { validateOnboardingToken } from "@/lib/onboarding-auth";
import { rateLimitAsync } from "@/lib/rate-limit";
import { prisma } from "@/lib/db";
import { isValidStepKey } from "@/lib/onboarding-steps";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  // Rate limit: 60 saves per minute per token
  const rl = await rateLimitAsync(`onboarding-save:${token}`, 60, 60_000);
  if (!rl.allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const onboarding = await validateOnboardingToken(token);
  if (!onboarding) {
    return NextResponse.json({ error: "Invalid or expired link" }, { status: 403 });
  }

  if (onboarding.status === "SUBMITTED") {
    return NextResponse.json({ error: "Already submitted" }, { status: 400 });
  }

  const body = await request.json();
  if (!body.stepKey || !body.data) {
    return NextResponse.json({ error: "stepKey and data are required" }, { status: 400 });
  }

  if (!isValidStepKey(body.stepKey, onboarding.serviceTypes)) {
    return NextResponse.json({ error: "Invalid step for this onboarding" }, { status: 400 });
  }

  const MAX_RESPONSE_SIZE = 50_000;
  const bodyStr = JSON.stringify(body.data);
  if (bodyStr.length > MAX_RESPONSE_SIZE) {
    return NextResponse.json({ error: "Response data too large" }, { status: 413 });
  }

  const response = await prisma.onboardingResponse.upsert({
    where: {
      onboardingId_stepKey: {
        onboardingId: onboarding.id,
        stepKey: body.stepKey,
      },
    },
    create: {
      onboardingId: onboarding.id,
      stepKey: body.stepKey,
      data: body.data,
    },
    update: { data: body.data },
  });

  // Move from DRAFT to IN_PROGRESS on first save
  if (onboarding.status === "DRAFT") {
    await prisma.clientOnboarding.update({
      where: { id: onboarding.id },
      data: { status: "IN_PROGRESS" },
    });
  }

  // Update currentStep if provided
  if (typeof body.currentStep === "number") {
    await prisma.clientOnboarding.update({
      where: { id: onboarding.id },
      data: { currentStep: body.currentStep },
    });
  }

  return NextResponse.json({ saved: true, stepKey: response.stepKey });
}
