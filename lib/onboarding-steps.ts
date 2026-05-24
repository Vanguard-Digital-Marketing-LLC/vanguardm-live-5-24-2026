export type OnboardingServiceType = "WEB" | "SMA" | "PPC" | "SEO";

export interface StepDefinition {
  key: string;
  label: string;
  condition: "always" | OnboardingServiceType;
}

/** Master list of all possible steps in order */
const ALL_STEPS: StepDefinition[] = [
  { key: "business_info", label: "Business Information", condition: "always" },
  { key: "web", label: "Website", condition: "WEB" },
  { key: "sma", label: "Social Media", condition: "SMA" },
  { key: "ppc", label: "Pay-Per-Click", condition: "PPC" },
  { key: "seo", label: "SEO", condition: "SEO" },
  { key: "files", label: "File Uploads", condition: "always" },
  { key: "review", label: "Review & Submit", condition: "always" },
];

/**
 * Return the ordered list of steps for a given set of services.
 * Always includes business_info, files, and review.
 */
export function getStepsForServices(serviceTypes: string[]): StepDefinition[] {
  return ALL_STEPS.filter(
    (step) =>
      step.condition === "always" ||
      serviceTypes.includes(step.condition)
  );
}

/** Get step index by key */
export function getStepIndex(serviceTypes: string[], stepKey: string): number {
  const steps = getStepsForServices(serviceTypes);
  return steps.findIndex((s) => s.key === stepKey);
}

/** File upload categories */
export const FILE_CATEGORIES = [
  { key: "logo", label: "Logo Files", description: "Logo files (vector preferred — AI, EPS, SVG)" },
  { key: "brand_guide", label: "Brand Guidelines", description: "Brand guidelines, style guides, font files" },
  { key: "ad_creative", label: "Ad Creative", description: "Existing ad images, videos, or graphics" },
  { key: "credentials", label: "Account Credentials", description: "Secure documents with login details", warning: "These files are stored securely but we recommend sharing credentials via a password manager when possible." },
  { key: "content", label: "Content", description: "Text, images, spreadsheets for campaigns or website" },
  { key: "other", label: "Other", description: "Anything else we should have" },
] as const;

export type FileCategory = (typeof FILE_CATEGORIES)[number]["key"];

/** Allowed MIME types for uploads */
export const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "text/csv",
  "application/zip",
  "application/x-zip-compressed",
]);

export const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB

/** Check whether a stepKey is valid for the given service types */
export function isValidStepKey(stepKey: string, serviceTypes: string[]): boolean {
  const validSteps = getStepsForServices(serviceTypes);
  return validSteps.some((s) => s.key === stepKey);
}
