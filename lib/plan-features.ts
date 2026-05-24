import type { PlanTier } from "@/lib/generated/prisma/client";

/**
 * Client-safe plan→feature data + helpers.
 * Pure module — no DB / Node-only imports — so it's safe in client components.
 * For DB-backed enforcement (e.g. enforceClientLimit), import from "@/lib/plan-limits".
 */

export const PLAN_FEATURES: Record<PlanTier, Set<string>> = {
  STARTER: new Set([
    "clients", "tasks", "tickets", "messages", "notifications",
    "team", "onboarding", "portal", "contacts",
  ]),
  PRO: new Set([
    "clients", "tasks", "tickets", "messages", "notifications",
    "team", "onboarding", "portal", "contacts",
    "reports", "blog", "leads", "approvals", "projects",
  ]),
  ENTERPRISE: new Set([
    "clients", "tasks", "tickets", "messages", "notifications",
    "team", "onboarding", "portal", "contacts",
    "reports", "blog", "leads", "approvals", "projects",
    "agent", "whitelabel",
  ]),
};

export function hasFeature(planTier: PlanTier, feature: string): boolean {
  return PLAN_FEATURES[planTier]?.has(feature) ?? false;
}

export const FEATURE_LABELS: Record<string, { name: string; minPlan: string; blurb: string }> = {
  reports: {
    name: "Client reports",
    minPlan: "Pro",
    blurb: "Schedule and ship branded performance reports to clients.",
  },
  blog: {
    name: "Blog",
    minPlan: "Pro",
    blurb: "Publish marketing content from inside the agency dashboard.",
  },
  leads: {
    name: "Leads & funnels",
    minPlan: "Pro",
    blurb: "Capture and score leads, manage the pipeline, run multi-step forms.",
  },
  approvals: {
    name: "Approvals",
    minPlan: "Pro",
    blurb: "Send work to clients for approval and track sign-off.",
  },
  agent: {
    name: "AI agent runs",
    minPlan: "Enterprise",
    blurb: "Claude-powered agents draft briefs, analyse SERPs, and ship code changes to client sites.",
  },
  whitelabel: {
    name: "White-label",
    minPlan: "Enterprise",
    blurb: "Custom domain + remove all Vanguard branding for your clients.",
  },
};
