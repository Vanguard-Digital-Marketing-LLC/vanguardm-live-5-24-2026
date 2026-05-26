import { randomBytes } from "crypto";
import { prisma } from "@/lib/db";
import { hashToken } from "@/lib/token-hash";

/**
 * SHA-256 hash of an onboarding token, used both for write (storage) and read
 * (lookup). Mirrors the password-reset pattern from PR #12: the raw token is
 * delivered to the user exactly once (in the invite URL); the DB only ever
 * holds the hash, so a DB read alone is not enough to forge access.
 */
export function hashOnboardingToken(token: string): string {
  return hashToken(token);
}

/**
 * Generate a fresh raw onboarding token + its sha256 hash. Callers should
 * persist the hash on the ClientOnboarding row and embed the raw value in the
 * URL emailed to the respondent.
 *
 * The raw token is 64 hex chars (32 random bytes) — well above the legacy
 * cuid length and matches the format the migration uses to detect already-
 * hashed rows.
 */
export function generateOnboardingTokenPair(): { raw: string; hash: string } {
  const raw = randomBytes(32).toString("hex");
  return { raw, hash: hashOnboardingToken(raw) };
}

/**
 * Build the patch used to revoke an onboarding token on status transition to
 * a terminal state (SUBMITTED / COMPLETED).
 *
 * The spec asks for `token` and `tokenExpiresAt` to be nulled, but the
 * current schema declares both as required (and per the audit-fixes spec's
 * scope rules we may not change `prisma/schema.prisma`). Setting
 * `tokenExpiresAt` to the epoch makes the standard expiry check (in
 * `validateOnboardingToken`) reject any future presentation of the raw
 * token, achieving the same revocation effect.
 *
 * We intentionally do NOT rewrite the stored token hash: keeping it lets
 * `classifyOnboardingToken` re-find the row and respond with 410 Gone (vs.
 * 403 Forbidden) when the original URL is replayed post-submit. Since the
 * column already holds a one-way hash, leaving it in place exposes no
 * additional credential material to a DB-read attacker.
 */
export function buildRevokedTokenData(): { tokenExpiresAt: Date } {
  return { tokenExpiresAt: new Date(0) };
}

/**
 * Validate an onboarding token from the URL.
 * Returns the onboarding record if valid, null otherwise.
 *
 * Lookup hashes the user-supplied token first; the DB only stores the hash.
 */
export async function validateOnboardingToken(token: string) {
  if (!token || token.length < 10) return null;

  const tokenHash = hashOnboardingToken(token);

  const onboarding = await prisma.clientOnboarding.findUnique({
    where: { token: tokenHash },
    include: {
      client: { select: { id: true, name: true } },
      responses: true,
      files: {
        select: {
          id: true,
          category: true,
          fileName: true,
          mimeType: true,
          fileSize: true,
          createdAt: true,
        },
      },
    },
  });

  if (!onboarding) return null;

  // Token expired (revoked rows also land here — expiry is set to the epoch)
  if (onboarding.tokenExpiresAt < new Date()) return null;

  // Already completed / submitted — no more edits
  if (onboarding.status === "COMPLETED") return null;

  return onboarding;
}

/**
 * Classify a presented onboarding token without leaking why it failed.
 *
 *   - `ok`      → the token is valid and editable; the row is returned.
 *   - `gone`    → the token matches a row whose status is past the editable
 *                 window (SUBMITTED or COMPLETED). Callers should return
 *                 410 Gone.
 *   - `invalid` → the token does not match any row, or the row is expired
 *                 with a still-editable status. Callers should return 403.
 *
 * Two lookups are required because `validateOnboardingToken` returns null
 * for both "no such row" and "row exists but is expired/completed". The
 * second lookup distinguishes those cases so the route handler can return
 * 410 Gone for revoked-on-submit URLs (vs. a generic 403).
 */
export async function classifyOnboardingToken(
  token: string
): Promise<
  | { kind: "ok"; onboarding: NonNullable<Awaited<ReturnType<typeof validateOnboardingToken>>> }
  | { kind: "gone" }
  | { kind: "invalid" }
> {
  const onboarding = await validateOnboardingToken(token);
  if (onboarding) return { kind: "ok", onboarding };

  if (!token || token.length < 10) return { kind: "invalid" };

  // Re-fetch by hash to disambiguate "submitted/completed" from "never
  // existed". buildRevokedTokenData leaves the stored hash intact precisely
  // so this lookup still finds the row after revoke-on-submit.
  const tokenHash = hashOnboardingToken(token);
  const row = await prisma.clientOnboarding.findUnique({
    where: { token: tokenHash },
    select: { status: true },
  });

  if (row && (row.status === "SUBMITTED" || row.status === "COMPLETED")) {
    return { kind: "gone" };
  }

  return { kind: "invalid" };
}
