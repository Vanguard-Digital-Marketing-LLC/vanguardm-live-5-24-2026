"use client";

import { Check } from "lucide-react";

interface Step {
  key: string;
  label: string;
}

interface WizardProgressBarProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (index: number) => void;
  completedSteps: Set<string>;
}

export default function WizardProgressBar({
  steps,
  currentStep,
  onStepClick,
  completedSteps,
}: WizardProgressBarProps) {
  return (
    <div className="w-full">
      {/* Desktop: horizontal */}
      <div className="hidden md:flex items-center gap-1">
        {steps.map((step, i) => {
          const hasData = completedSteps.has(step.key);
          const isPast = i < currentStep;
          const isActive = i === currentStep;

          // 3-state logic:
          // - complete: has data AND user has moved past this step
          // - partial: has data AND step is current or future (in-progress)
          // - empty: no data saved yet
          const isComplete = hasData && isPast;
          const isPartial = hasData && !isPast;

          return (
            <button
              key={step.key}
              onClick={() => onStepClick(i)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors flex-1 min-w-0 ${
                isActive
                  ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                  : isComplete
                  ? "bg-white/5 text-slate-300 hover:bg-white/10"
                  : isPartial
                  ? "bg-amber-500/10 text-amber-300 hover:bg-amber-500/15 border border-amber-500/20"
                  : "bg-white/[0.02] text-slate-500 hover:bg-white/5"
              }`}
            >
              <span
                className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  isComplete
                    ? "bg-emerald-500/20 text-emerald-400"
                    : isPartial
                    ? "bg-amber-500/20 border border-amber-500/50 text-amber-400"
                    : isActive
                    ? "bg-emerald-500/30 text-emerald-300"
                    : "bg-white/10 text-slate-500"
                }`}
              >
                {isComplete ? (
                  <Check size={10} />
                ) : isPartial ? (
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                ) : (
                  i + 1
                )}
              </span>
              <span className="truncate">{step.label}</span>
            </button>
          );
        })}
      </div>

      {/* Mobile: compact */}
      <div className="md:hidden flex items-center justify-between gap-2">
        <span className="text-xs text-slate-400">
          Step {currentStep + 1} of {steps.length}
        </span>
        <span className="text-sm text-white font-medium">
          {steps[currentStep]?.label}
        </span>
        <div className="flex gap-1">
          {steps.map((step, i) => {
            const hasData = completedSteps.has(step.key);
            const isPast = i < currentStep;
            return (
              <button
                key={step.key}
                onClick={() => onStepClick(i)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === currentStep
                    ? "bg-emerald-400"
                    : hasData && isPast
                    ? "bg-emerald-400/40"
                    : hasData
                    ? "bg-amber-400/60"
                    : "bg-white/10"
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
