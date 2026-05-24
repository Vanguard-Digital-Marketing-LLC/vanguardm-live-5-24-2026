"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Save } from "lucide-react";
import { getStepsForServices } from "@/lib/onboarding-steps";
import WizardProgressBar from "./WizardProgressBar";
import type { OnboardingFileData } from "./FileList";
import BusinessInfoStep from "./steps/BusinessInfoStep";
import WebStep from "./steps/WebStep";
import SmaStep from "./steps/SmaStep";
import PpcStep from "./steps/PpcStep";
import SeoStep from "./steps/SeoStep";
import FileUploadsStep from "./steps/FileUploadsStep";
import ReviewStep from "./steps/ReviewStep";

interface OnboardingWizardProps {
  onboardingId: string;
  clientName: string;
  serviceTypes: string[];
  initialResponses: Record<string, Record<string, unknown>>;
  initialFiles: OnboardingFileData[];
  initialStep: number;
  mode: "admin" | "client";
  token?: string;
}

type SaveStatus = "idle" | "saving" | "saved" | "error";

export default function OnboardingWizard({
  onboardingId,
  clientName,
  serviceTypes,
  initialResponses,
  initialFiles,
  initialStep,
  mode,
  token,
}: OnboardingWizardProps) {
  const router = useRouter();
  const steps = getStepsForServices(serviceTypes);
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [responses, setResponses] = useState<Record<string, Record<string, unknown>>>(initialResponses);
  const [files, setFiles] = useState<OnboardingFileData[]>(initialFiles);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(() => {
    return new Set(Object.keys(initialResponses));
  });

  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentStepDef = steps[currentStep];

  // API base URL
  const apiBase = mode === "admin"
    ? `/api/admin/onboarding/${onboardingId}`
    : `/api/onboarding/${token}`;

  // Auto-save with debounce + retry + localStorage backup
  const saveStepData = useCallback(
    async (stepKey: string, data: Record<string, unknown>, retries = 2) => {
      setSaveStatus("saving");
      try {
        const res = await fetch(`${apiBase}/responses`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ stepKey, data, currentStep }),
        });
        if (!res.ok) throw new Error("Save failed");
        setSaveStatus("saved");
        localStorage.removeItem(`onboarding-draft-${onboardingId}-${stepKey}`);
        setTimeout(() => setSaveStatus("idle"), 2000);
      } catch {
        if (retries > 0) {
          setTimeout(() => saveStepData(stepKey, data, retries - 1), 3000);
          return;
        }
        localStorage.setItem(
          `onboarding-draft-${onboardingId}-${stepKey}`,
          JSON.stringify(data)
        );
        setSaveStatus("error");
      }
    },
    [apiBase, currentStep, onboardingId]
  );

  const handleFieldChange = useCallback(
    (field: string, value: unknown) => {
      const stepKey = currentStepDef?.key;
      if (!stepKey || stepKey === "review" || stepKey === "files") return;

      setResponses((prev) => {
        const stepData = { ...(prev[stepKey] || {}), [field]: value };
        const next = { ...prev, [stepKey]: stepData };

        // Propagate website_url from business_info → web step
        if (stepKey === "business_info" && field === "website_url" && typeof value === "string") {
          const webData = { ...(next["web"] || {}) };
          if (!webData["web_current_url"]) {
            webData["web_current_url"] = value;
            next["web"] = webData;
          }
        }

        // Debounced save
        if (saveTimer.current) clearTimeout(saveTimer.current);
        saveTimer.current = setTimeout(() => saveStepData(stepKey, stepData), 2000);

        return next;
      });

      setCompletedSteps((prev) => new Set([...prev, stepKey]));
    },
    [currentStepDef, saveStepData]
  );

  // Flush on step change
  useEffect(() => {
    return () => {
      if (saveTimer.current) {
        clearTimeout(saveTimer.current);
        saveTimer.current = null;
      }
    };
  }, [currentStep]);

  // Restore any unsaved drafts from localStorage on mount
  useEffect(() => {
    steps.forEach((step) => {
      const key = `onboarding-draft-${onboardingId}-${step.key}`;
      const draft = localStorage.getItem(key);
      if (draft) {
        try {
          const data = JSON.parse(draft);
          setResponses((prev) => ({
            ...prev,
            [step.key]: { ...(prev[step.key] || {}), ...data },
          }));
        } catch {
          localStorage.removeItem(key);
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Save immediately when navigating away from a step
  const navigateToStep = useCallback(
    (index: number) => {
      if (saveTimer.current) {
        clearTimeout(saveTimer.current);
        saveTimer.current = null;
        const stepKey = currentStepDef?.key;
        if (stepKey && stepKey !== "review" && stepKey !== "files" && responses[stepKey]) {
          saveStepData(stepKey, responses[stepKey]);
        }
      }
      setCurrentStep(index);
    },
    [currentStepDef, responses, saveStepData]
  );

  // File operations
  const handleFileUpload = useCallback(
    async (file: File, category: string) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("category", category);

      const res = await fetch(`${apiBase}/files`, { method: "POST", body: formData });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Upload failed");
      }
      const newFile = await res.json();
      setFiles((prev) => [newFile, ...prev]);
    },
    [apiBase]
  );

  const handleFileDownload = useCallback(
    (fileId: string) => {
      window.open(`${apiBase}/files/${fileId}`, "_blank");
    },
    [apiBase]
  );

  const handleFileDelete = useCallback(
    async (fileId: string) => {
      if (mode === "client") return; // clients can't delete
      const res = await fetch(`${apiBase}/files/${fileId}`, { method: "DELETE" });
      if (res.ok) setFiles((prev) => prev.filter((f) => f.id !== fileId));
    },
    [apiBase, mode]
  );

  // Submit / Complete
  const handleSubmit = useCallback(
    async (turnstileToken?: string) => {
      if (mode === "admin") {
        // Admin marks complete
        const res = await fetch(`${apiBase}/complete`, { method: "POST" });
        if (!res.ok) throw new Error("Failed to complete");
        router.push(`/admin/onboarding/${onboardingId}`);
        router.refresh();
      } else {
        // Client submits
        const res = await fetch(`${apiBase}/submit`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ turnstileToken }),
        });
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Submit failed");
        }
        // Show success state
        router.refresh();
      }
    },
    [apiBase, mode, onboardingId, router]
  );

  // Render current step content
  const renderStep = () => {
    const stepKey = currentStepDef?.key;
    const data = (responses[stepKey] || {}) as Record<string, unknown>;

    switch (stepKey) {
      case "business_info":
        return <BusinessInfoStep data={data} onChange={handleFieldChange} />;
      case "web":
        return <WebStep data={data} onChange={handleFieldChange} />;
      case "sma":
        return <SmaStep data={data} onChange={handleFieldChange} />;
      case "ppc":
        return <PpcStep data={data} onChange={handleFieldChange} />;
      case "seo":
        return <SeoStep data={data} onChange={handleFieldChange} />;
      case "files":
        return (
          <FileUploadsStep
            files={files}
            onUpload={handleFileUpload}
            onDownload={handleFileDownload}
            onDelete={mode === "admin" ? handleFileDelete : undefined}
          />
        );
      case "review":
        return (
          <ReviewStep
            responses={responses}
            files={files}
            steps={steps}
            serviceTypes={serviceTypes}
            mode={mode}
            onEditStep={navigateToStep}
            onDownloadFile={handleFileDownload}
            onSubmit={handleSubmit}
          />
        );
      default:
        return <div className="text-slate-400">Unknown step</div>;
    }
  };

  const isFirst = currentStep === 0;
  const isLast = currentStep === steps.length - 1;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white">{clientName}</h2>
          <p className="text-sm text-slate-400">Onboarding Questionnaire</p>
          <p className="text-xs text-slate-500 mt-0.5">
            Estimated time: {steps.length <= 4 ? "10–15" : steps.length <= 6 ? "15–25" : "25–40"} minutes
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          {saveStatus === "saving" && (
            <span className="flex items-center gap-1.5 text-amber-400">
              <div className="w-3 h-3 border-2 border-amber-400/30 border-t-amber-400 rounded-full animate-spin" />
              Saving...
            </span>
          )}
          {saveStatus === "saved" && (
            <span className="flex items-center gap-1.5 text-emerald-400">
              <Save size={12} />
              Saved
            </span>
          )}
          {saveStatus === "error" && (
            <button
              onClick={() => {
                const stepKey = currentStepDef?.key;
                if (stepKey && responses[stepKey]) saveStepData(stepKey, responses[stepKey]);
              }}
              className="flex items-center gap-1.5 text-red-400 hover:text-red-300 transition-colors text-xs"
            >
              <Save size={12} />
              Save failed — tap to retry
            </button>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <WizardProgressBar
        steps={steps}
        currentStep={currentStep}
        onStepClick={navigateToStep}
        completedSteps={completedSteps}
      />

      {/* Step content */}
      <div className="min-h-[400px]">
        {renderStep()}
      </div>

      {/* Navigation */}
      {currentStepDef?.key !== "review" && (
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <button
            onClick={() => navigateToStep(currentStep - 1)}
            disabled={isFirst}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={16} />
            Previous
          </button>
          <button
            onClick={() => navigateToStep(currentStep + 1)}
            disabled={isLast}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Next
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
