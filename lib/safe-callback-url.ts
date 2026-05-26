/**
 * Closes an open-redirect at sign-in. The `callbackUrl` query parameter on
 * `/auth/sign-in` was previously assigned straight to `window.location.href`,
 * which let an attacker craft a link like
 * `https://vanguardm.com/auth/sign-in?callbackUrl=https://evil.com/...` and
 * bounce a freshly-authenticated user to an attacker-controlled origin (a
 * classic credential / OAuth-token theft setup). This helper normalises the
 * raw value so only same-origin redirects survive; everything else falls back
 * to `/dashboard`.
 *
 * Rules:
 *   - null / undefined / "" → `/dashboard`
 *   - "//evil.com/x" (protocol-relative) → `/dashboard`
 *   - "/admin" or "/admin?x=1#y" (relative path) → returned as-is
 *   - absolute URL matching `origin` → path + search + hash only
 *   - absolute URL on a different origin (including different subdomain) → `/dashboard`
 *   - `javascript:` / `data:` / any non-http(s) scheme → `/dashboard`
 *     (these parse as URLs but their `.origin` won't match the page origin)
 *   - any URL parse failure → `/dashboard`
 */
export function safeCallbackUrl(
  raw: string | null | undefined,
  origin: string,
): string {
  if (!raw) return "/dashboard";

  // Protocol-relative URLs (`//host/path`) resolve off-origin in browsers,
  // so they're effectively absolute. Reject before the "starts with /" check.
  if (raw.startsWith("//")) return "/dashboard";

  // Same-origin relative path.
  if (raw.startsWith("/")) return raw;

  try {
    const u = new URL(raw);
    const expected = new URL(origin).origin;
    if (u.origin === expected) {
      return u.pathname + u.search + u.hash;
    }
    return "/dashboard";
  } catch {
    return "/dashboard";
  }
}
