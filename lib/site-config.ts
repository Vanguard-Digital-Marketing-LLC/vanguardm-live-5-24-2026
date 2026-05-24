export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://vanguardm.com";

/** Get the base URL from a request's Host header (preserves subdomain) */
export function getBaseUrl(request?: { headers: { get(name: string): string | null } }): string {
  if (request) {
    const host = request.headers.get("host") || request.headers.get("x-forwarded-host");
    if (host) {
      const proto = request.headers.get("x-forwarded-proto") || "https";
      return `${proto}://${host}`;
    }
  }
  return SITE_URL;
}
