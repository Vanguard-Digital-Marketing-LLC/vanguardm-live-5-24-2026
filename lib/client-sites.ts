export type SiteType = "nextjs" | "static" | "monolith";

export interface SiteConfig {
  path: string;
  type: SiteType;
  pm2Name?: string;
  port?: number;
  /**
   * System user that owns the site files and runs the pm2 process.
   * The agent will `sudo -u <siteUser>` for bash / write_file / edit_file
   * unless siteUser === "vanguardm" (the agent's own uid).
   */
  siteUser: string;
}

/**
 * Hardcoded map of client domains to their site configuration.
 * Static sites default to /home/vanguardm/public_html/<domain>/
 */
const SITE_MAP: Record<string, SiteConfig> = {
  "advtechdetailing.com": {
    path: "/var/www/advtech-detailing",
    type: "nextjs",
    pm2Name: "advtech",
    port: 3002,
    siteUser: "advtech",
  },
  "360vastgoedpresentatie.nl": {
    path: "/var/www/360vastgoedpresentatie",
    type: "nextjs",
    pm2Name: "cardinal360",
    port: 3006,
    siteUser: "cardinal360",
  },
  "coffeebreakevents.com": {
    path: "/var/www/coffeebreakevents",
    type: "nextjs",
    pm2Name: "coffeebreak",
    port: 3003,
    siteUser: "coffeebreak",
  },
  "howdygaragedoors.com": {
    path: "/var/www/howdy-admin",
    type: "nextjs",
    pm2Name: "howdy",
    port: 3005,
    siteUser: "howdy",
  },
  "abwmsonline.org": {
    path: "/home/vanguardm/abwms-app",
    type: "nextjs",
    pm2Name: "abwms",
    port: 3001,
    siteUser: "vanguardm",
  },
  "vanguardm.com": {
    path: "/home/vanguardm/public_html",
    type: "monolith",
    pm2Name: "vanguardm",
    port: 3000,
    siteUser: "vanguardm",
  },
  // Admin / dashboard apps (added 2026-04-25 for per-site agent ops)
  "admin.bvacservices.com": {
    path: "/var/www/bvac-admin",
    type: "nextjs",
    pm2Name: "bvac-admin",
    port: 3004,
    siteUser: "bvac",
  },
  "wiserbizz.com": {
    path: "/var/www/wiserbizz-admin",
    type: "nextjs",
    pm2Name: "wiserbizz-admin",
    port: 3008,
    siteUser: "wiserbizz",
  },
  "fearlessgym.com": {
    path: "/var/www/fearless-gym",
    type: "nextjs",
    pm2Name: "fearless-gym",
    port: 3009,
    siteUser: "fearless",
  },
  // Static sites
  "bvacservices.com": {
    path: "/home/vanguardm/public_html/bvacservices.com",
    type: "static",
    siteUser: "vanguardm",
  },
  "fergrepair.com": {
    path: "/home/vanguardm/public_html/fergrepair.com",
    type: "static",
    siteUser: "vanguardm",
  },
  "dbcgamer.com": {
    path: "/home/vanguardm/public_html/dbcgamer.com",
    type: "static",
    siteUser: "vanguardm",
  },
};

/**
 * Resolve a client domain to its site configuration.
 * Falls back to a static site path under public_html if not explicitly mapped.
 */
export function resolveSiteConfig(domain: string): SiteConfig | null {
  const normalized = domain
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/+$/, "");

  if (SITE_MAP[normalized]) {
    return SITE_MAP[normalized];
  }

  // Fallback: check if it looks like a hosted static site
  return null;
}
