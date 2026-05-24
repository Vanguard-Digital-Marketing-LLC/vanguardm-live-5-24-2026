import { prisma } from "@/lib/db";
import { hasFeature } from "@/lib/plan-limits";
import { resolveAgencyId } from "@/lib/resolve-agency";
import UpgradeRequired from "@/components/admin/shared/UpgradeRequired";

/**
 * Server-side feature gate for /admin/* pages.
 *
 * Usage:
 *   const gate = await requireFeature("agent");
 *   if (gate) return gate;  // renders an upgrade prompt
 *
 * Returns a JSX element to render in place of the page (the upgrade prompt)
 * if the agency's plan tier doesn't include `feature`. Returns null when
 * access is allowed.
 */
export async function requireFeature(feature: string): Promise<React.ReactElement | null> {
  const agencyId = await resolveAgencyId();
  if (!agencyId) return null; // session-less requests handled by the page itself

  const agency = await prisma.agency.findUnique({
    where: { id: agencyId },
    select: { planTier: true },
  });
  if (!agency) return null;

  if (hasFeature(agency.planTier, feature)) return null;

  return <UpgradeRequired feature={feature} currentPlan={agency.planTier} />;
}
