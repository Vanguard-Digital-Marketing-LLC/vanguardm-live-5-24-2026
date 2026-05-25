import { NextRequest, NextResponse } from "next/server";
import { validateOnboardingToken } from "@/lib/onboarding-auth";
import { getStepsForServices } from "@/lib/onboarding-steps";
import { checkRateLimit } from "@/lib/api-rate-limit";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  // Throttle to stop token-guessing enumeration (other onboarding verbs already do this).
  const blocked = await checkRateLimit(request, "onboarding");
  if (blocked) return blocked;

  const { token } = await params;
  const onboarding = await validateOnboardingToken(token);

  if (!onboarding) {
    return NextResponse.json(
      { error: "Invalid or expired onboarding link" },
      { status: 403 }
    );
  }

  // Build response map from step responses
  const responsesMap: Record<string, unknown> = {};
  for (const r of onboarding.responses) {
    responsesMap[r.stepKey] = r.data;
  }

  return NextResponse.json({
    id: onboarding.id,
    clientName: onboarding.client.name,
    serviceTypes: onboarding.serviceTypes,
    status: onboarding.status,
    currentStep: onboarding.currentStep,
    respondentName: onboarding.respondentName,
    respondentEmail: onboarding.respondentEmail,
    steps: getStepsForServices(onboarding.serviceTypes),
    responses: responsesMap,
    files: onboarding.files,
  });
}
