import { headers } from "next/headers";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

/**
 * Resolves the effective agencyId for server components.
 *
 * - If on a subdomain (x-agency-slug set by middleware), platform super admins
 *   see that subdomain's agency data instead of their own.
 * - Regular users always see their own agency's data.
 * - Returns null if no agency context can be determined.
 */
export async function resolveAgencyId(): Promise<string | null> {
  const session = await auth();
  if (!session?.user?.id) return null;

  const headersList = await headers();
  const subdomainSlug = headersList.get("x-agency-slug");

  // Platform super admin on a subdomain → use the subdomain's agency
  const isPlatformSuperAdmin =
    session.user.isAdmin === true && session.user.agencySlug === "vanguard";

  if (subdomainSlug && isPlatformSuperAdmin) {
    const agency = await prisma.agency.findUnique({
      where: { slug: subdomainSlug },
      select: { id: true },
    });
    if (agency) return agency.id;
  }

  return session.user.agencyId ?? null;
}
