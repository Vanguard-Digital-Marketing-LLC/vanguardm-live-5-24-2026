"use client";

import OnboardingWizard from "@/components/admin/onboarding/OnboardingWizard";
import type { OnboardingFileData } from "@/components/admin/onboarding/FileList";

interface Props {
  onboardingId: string;
  clientName: string;
  serviceTypes: string[];
  initialResponses: Record<string, Record<string, unknown>>;
  initialFiles: OnboardingFileData[];
  initialStep: number;
  token: string;
}

export default function OnboardingClientPage(props: Props) {
  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Branding header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <span className="text-emerald-400 font-display font-bold text-xl">Vanguard</span>
          </div>
        </div>

        {/* Wizard */}
        <OnboardingWizard
          onboardingId={props.onboardingId}
          clientName={props.clientName}
          serviceTypes={props.serviceTypes}
          initialResponses={props.initialResponses}
          initialFiles={props.initialFiles}
          initialStep={props.initialStep}
          mode="client"
          token={props.token}
        />
      </div>
    </div>
  );
}
