import { NextRequest, NextResponse } from "next/server";
import { classifyOnboardingToken } from "@/lib/onboarding-auth";
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
  const result = await classifyOnboardingToken(token);

  if (result.kind === "gone") {
    // Token matched a row whose onboarding is already submitted/completed.
    // The URL is revoked; surface 410 so the client can show "already
    // submitted" rather than "broken link".
    return NextResponse.json(
      { error: "This onboarding has already been submitted." },
      { status: 410 }
    );
  }

  if (result.kind === "invalid") {
    return NextResponse.json(
      { error: "Invalid or expired onboarding link" },
      { status: 403 }
    );
  }

  const { onboarding } = result;

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
