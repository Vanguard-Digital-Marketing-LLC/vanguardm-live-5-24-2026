/**
 * Server-side Cloudflare Turnstile verification.
 *
 * The NEXT_PUBLIC_DISABLE_TURNSTILE bypass is honored only when
 * NODE_ENV !== "production". A misconfigured production build cannot
 * bypass verification even if the env var is set.
 */
export async function verifyTurnstile(token: string): Promise<boolean> {
  if (
    process.env.NODE_ENV !== "production" &&
    process.env.NEXT_PUBLIC_DISABLE_TURNSTILE === "true"
  ) {
    console.warn("[turnstile] BYPASSED via NEXT_PUBLIC_DISABLE_TURNSTILE (non-prod)");
    return true;
  }

  const secret = process.env.TURNSTILE_SECRET;
  if (!secret) {
    console.error("TURNSTILE_SECRET not configured");
    return false;
  }

  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
    },
  );

  const data = await res.json();
  return data.success === true;
}
