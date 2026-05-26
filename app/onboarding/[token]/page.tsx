import { classifyOnboardingToken } from "@/lib/onboarding-auth";
import OnboardingClientPage from "./OnboardingClientPage";

export default async function OnboardingPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const classification = await classifyOnboardingToken(token);

  // Show "Thank You" for tokens that hit a terminal state (SUBMITTED /
  // COMPLETED). buildRevokedTokenData (B.4) pushes tokenExpiresAt to the
  // epoch on submit, so validateOnboardingToken returns null even for the
  // freshly-submitted row — classifyOnboardingToken disambiguates that case.
  if (classification.kind === "gone") {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-3">Thank You!</h1>
          <p className="text-slate-400 text-sm">
            Your onboarding questionnaire has been submitted successfully. Our team
            will review your responses and reach out shortly.
          </p>
        </div>
      </div>
    );
  }

  if (classification.kind !== "ok") {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-white mb-3">Link Unavailable</h1>
          <p className="text-slate-400 text-sm">
            This onboarding link has expired or is invalid. Please contact
            your account manager for a new link.
          </p>
        </div>
      </div>
    );
  }

  const onboarding = classification.onboarding;

  // Build responses map
  const responsesMap: Record<string, Record<string, unknown>> = {};
  for (const r of onboarding.responses) {
    responsesMap[r.stepKey] = r.data as Record<string, unknown>;
  }

  return (
    <OnboardingClientPage
      onboardingId={onboarding.id}
      clientName={onboarding.client.name}
      serviceTypes={onboarding.serviceTypes}
      initialResponses={responsesMap}
      initialFiles={onboarding.files.map((f) => ({
        ...f,
        createdAt: f.createdAt.toISOString(),
      }))}
      initialStep={onboarding.currentStep}
      token={token}
    />
  );
}
