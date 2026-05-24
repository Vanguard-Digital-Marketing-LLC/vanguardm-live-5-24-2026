import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { hasFeature } from "@/lib/plan-features";

// Re-export the client-safe parts so server code can keep importing from here.
export { PLAN_FEATURES, hasFeature, FEATURE_LABELS } from "@/lib/plan-features";

/**
 * Enforce that an agency's current plan includes a feature. Returns null
 * when allowed, or a 402 NextResponse pointing at the upgrade page.
 *
 * Server-only — uses Prisma to read the live plan tier rather than
 * trusting a possibly-stale session value.
 */
export async function enforcePlanFeature(
  agencyId: string,
  feature: string,
): Promise<NextResponse | null> {
  const agency = await prisma.agency.findUnique({
    where: { id: agencyId },
    select: { planTier: true, subscriptionStatus: true },
  });

  if (!agency) {
    return NextResponse.json({ error: "Agency not found" }, { status: 404 });
  }

  // Treat canceled/unpaid subs as STARTER regardless of stored planTier so
  // a lapsed PRO can't keep using PRO endpoints between webhook deliveries.
  const effectiveTier =
    agency.subscriptionStatus === "CANCELED" || agency.subscriptionStatus === "UNPAID"
      ? "STARTER"
      : agency.planTier;

  if (!hasFeature(effectiveTier, feature)) {
    return NextResponse.json(
      { error: "Feature not available on current plan", feature, planTier: effectiveTier },
      { status: 402 },
    );
  }

  return null;
}

/**
 * Enforce client creation limit for an agency.
 * Returns { allowed: true } or { allowed: false, limit, current }.
 * Server-only — uses Prisma.
 */
export async function enforceClientLimit(agencyId: string): Promise<
  { allowed: true } | { allowed: false; limit: number; current: number }
> {
  const agency = await prisma.agency.findUnique({
    where: { id: agencyId },
    select: { maxClients: true },
  });

  if (!agency) return { allowed: false, limit: 0, current: 0 };

  const clientCount = await prisma.client.count({ where: { agencyId } });

  if (clientCount >= agency.maxClients) {
    return { allowed: false, limit: agency.maxClients, current: clientCount };
  }

  return { allowed: true };
}
