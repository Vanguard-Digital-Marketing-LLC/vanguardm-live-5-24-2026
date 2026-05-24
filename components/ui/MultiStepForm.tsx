"use client";

import { useState, useEffect, useCallback } from "react";

/* ──────────────────────────────────────────────
   MultiStepForm — Wizard-style multi-step form.
   Fetches form config from API by slug, renders
   steps with progress bar, and submits responses.
   ────────────────────────────────────────────── */

interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "phone" | "textarea" | "select" | "checkbox" | "radio";
  placeholder?: string;
  required?: boolean;
  options?: string[];
}

interface FormStep {
  title: string;
  description?: string;
  fields: FormField[];
}

interface FormConfig {
  id: string;
  name: string;
  slug: string;
  steps: FormStep[];
  isActive: boolean;
}

interface MultiStepFormProps {
  formSlug: string;
  onComplete?: () => void;
}

export default function MultiStepForm({
  formSlug,
  onComplete,
}: MultiStepFormProps) {
  const [form, setForm] = useState<FormConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string | boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Fetch form config
  useEffect(() => {
    fetch(`/api/leads/forms/${formSlug}`)
      .then((r) => {
        if (!r.ok) throw new Error("Form not found");
        return r.json();
      })
      .then((data) => {
        setForm(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [formSlug]);

  const steps = form?.steps || [];
  const step = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  const progress = steps.length > 0 ? ((currentStep + 1) / steps.length) * 100 : 0;

  const handleFieldChange = useCallback(
    (name: string, value: string | boolean) => {
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    [],
  );

  const validateStep = (): boolean => {
    if (!step) return false;
    for (const field of step.fields) {
      if (field.required) {
        const val = formData[field.name];
        if (val === undefined || val === "" || val === false) {
          return false;
        }
      }
    }
    return true;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    if (isLastStep) {
      handleSubmit();
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch(`/api/leads/forms/${formSlug}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: formData,
          completedSteps: steps.length,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        onComplete?.();
      } else {
        const err = await res.json();
        setError(err.error || "Failed to submit form");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12 text-slate-400 text-sm">
        Loading form...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-400 text-sm">{error}</div>
    );
  }

  if (!form || !form.isActive) {
    return (
      <div className="text-center py-12 text-slate-400 text-sm">
        This form is not currently available.
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 bg-emerald/10 rounded-full flex items-center justify-center">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#10b981"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="font-display text-xl font-bold text-white mb-2">
          Thank You!
        </h3>
        <p className="text-slate-400 text-sm">
          Your response has been submitted. We&apos;ll be in touch soon.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-slate-400 font-display uppercase tracking-wider">
            Step {currentStep + 1} of {steps.length}
          </span>
          <span className="text-xs text-slate-500">{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Step content */}
      {step && (
        <div className="space-y-6">
          <div>
            <h3 className="font-display text-lg font-bold text-white">
              {step.title}
            </h3>
            {step.description && (
              <p className="text-sm text-slate-400 mt-1">{step.description}</p>
            )}
          </div>

          {/* Fields */}
          <div className="space-y-4">
            {step.fields.map((field) => (
              <div key={field.name}>
                {field.type === "checkbox" || field.type === "radio" ? (
                  <span className="block text-xs text-slate-400 mb-1.5 font-medium">
                    {field.label}
                    {field.required && (
                      <span className="text-red-400 ml-0.5">*</span>
                    )}
                  </span>
                ) : (
                  <label htmlFor={`msf-${field.name}`} className="block text-xs text-slate-400 mb-1.5 font-medium">
                    {field.label}
                    {field.required && (
                      <span className="text-red-400 ml-0.5">*</span>
                    )}
                  </label>
                )}

                {field.type === "textarea" ? (
                  <textarea
                    id={`msf-${field.name}`}
                    value={(formData[field.name] as string) || ""}
                    onChange={(e) =>
                      handleFieldChange(field.name, e.target.value)
                    }
                    placeholder={field.placeholder}
                    required={field.required}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald/50 focus:ring-1 focus:ring-emerald/25 transition-colors min-h-[100px]"
                  />
                ) : field.type === "select" ? (
                  <select
                    id={`msf-${field.name}`}
                    value={(formData[field.name] as string) || ""}
                    onChange={(e) =>
                      handleFieldChange(field.name, e.target.value)
                    }
                    required={field.required}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald/50 focus:ring-1 focus:ring-emerald/25 transition-colors [&>option]:text-black [&>option]:bg-white"
                  >
                    <option value="">
                      {field.placeholder || "Select an option"}
                    </option>
                    {field.options?.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : field.type === "checkbox" ? (
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!formData[field.name]}
                      onChange={(e) =>
                        handleFieldChange(field.name, e.target.checked)
                      }
                      className="w-4 h-4 rounded border-white/20 bg-white/5 text-emerald focus:ring-emerald/25"
                    />
                    <span className="text-sm text-slate-300">
                      {field.placeholder || field.label}
                    </span>
                  </label>
                ) : field.type === "radio" ? (
                  <div className="space-y-2">
                    {field.options?.map((opt) => (
                      <label
                        key={opt}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name={field.name}
                          value={opt}
                          checked={formData[field.name] === opt}
                          onChange={() =>
                            handleFieldChange(field.name, opt)
                          }
                          className="w-4 h-4 border-white/20 bg-white/5 text-emerald focus:ring-emerald/25"
                        />
                        <span className="text-sm text-slate-300">{opt}</span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <input
                    id={`msf-${field.name}`}
                    type={
                      field.type === "phone"
                        ? "tel"
                        : field.type === "email"
                          ? "email"
                          : "text"
                    }
                    value={(formData[field.name] as string) || ""}
                    onChange={(e) =>
                      handleFieldChange(field.name, e.target.value)
                    }
                    placeholder={field.placeholder}
                    required={field.required}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald/50 focus:ring-1 focus:ring-emerald/25 transition-colors"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center justify-between pt-2">
            {currentStep > 0 ? (
              <button
                onClick={handleBack}
                className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
              >
                &larr; Back
              </button>
            ) : (
              <div />
            )}
            <button
              onClick={handleNext}
              disabled={!validateStep() || submitting}
              className="px-6 py-2.5 bg-emerald hover:bg-emerald-400 disabled:opacity-40 text-slate-950 font-display font-bold text-sm uppercase tracking-wider rounded-lg transition-colors"
            >
              {submitting
                ? "Submitting..."
                : isLastStep
                  ? "Submit"
                  : "Next \u2192"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
