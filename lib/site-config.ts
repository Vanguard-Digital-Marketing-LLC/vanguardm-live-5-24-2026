export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://vanguardm.com";

/**
 * Root domain that all tenant subdomains live under (e.g. "vanguardm.com").
 * Derived from SITE_URL so it follows the configured environment.
 */
const SITE_ROOT_DOMAIN = (() => {
  try {
    return new URL(SITE_URL).hostname.toLowerCase();
  } catch {
    return "vanguardm.com";
  }
})();

/**
 * Returns true only if `host` belongs to our own domain: the apex root domain,
 * a `*.<root>` tenant subdomain, or localhost (for development).
 *
 * SECURITY: this is the allowlist that prevents host-header poisoning. The Host /
 * X-Forwarded-Host headers are attacker-controllable, so they must be validated
 * before being used to build links in emails (password reset, invites).
 */
function isTrustedHost(host: string): boolean {
  // X-Forwarded-Host can be a comma-separated list; take the first entry, drop the port.
  const hostname = host.split(",")[0].trim().split(":")[0].toLowerCase();
  if (!hostname) return false;
  if (hostname === "localhost" || hostname === "127.0.0.1") return true;
  if (hostname === SITE_ROOT_DOMAIN) return true;
  return hostname.endsWith(`.${SITE_ROOT_DOMAIN}`);
}

/**
 * Get the base URL for building links (emails, redirects).
 *
 * Honors the request's Host header ONLY when it is one of our own domains, so
 * legitimate tenant subdomains (e.g. acme.vanguardm.com) are preserved. Any
 * untrusted/spoofed host falls back to the trusted SITE_URL, preventing
 * host-header poisoning of password-reset and invite links.
 */
export function getBaseUrl(request?: { headers: { get(name: string): string | null } }): string {
  if (request) {
    const host = request.headers.get("host") || request.headers.get("x-forwarded-host");
    if (host && isTrustedHost(host)) {
      const hostname = host.split(",")[0].trim().split(":")[0].toLowerCase();
      const isLocal = hostname === "localhost" || hostname === "127.0.0.1";
      // Force https for real hosts; only allow http for local development.
      const proto = isLocal ? request.headers.get("x-forwarded-proto") || "http" : "https";
      return `${proto}://${host.split(",")[0].trim()}`;
    }
  }
  return SITE_URL;
}
