import { headers } from "next/headers";
import { prisma } from "@/lib/db";
import type { AgencyBranding } from "@/lib/report-html";

type PageBranding = Omit<AgencyBranding, "fromEmail">;

const DEFAULT_BRANDING: PageBranding = {
  name: "Vanguard Digital Marketing",
  slug: "vanguard",
  logoUrl: null,
  primaryColor: "#10b981",
  accentColor: "#f59e0b",
};

/**
 * Resolve agency branding server-side from x-agency-slug header.
 * Returns default Vanguard branding if not on a subdomain.
 */
export async function resolveAgencyBranding(): Promise<PageBranding> {
  const headersList = await headers();
  const slug = headersList.get("x-agency-slug");

  if (!slug) return DEFAULT_BRANDING;

  const agency = await prisma.agency.findUnique({
    where: { slug },
    select: { name: true, slug: true, logoUrl: true, primaryColor: true, accentColor: true },
  });

  if (!agency) return DEFAULT_BRANDING;

  return {
    name: agency.name,
    slug: agency.slug,
    logoUrl: agency.logoUrl,
    primaryColor: agency.primaryColor || DEFAULT_BRANDING.primaryColor,
    accentColor: agency.accentColor || DEFAULT_BRANDING.accentColor,
  };
}
