import { createHmac, timingSafeEqual } from "crypto";

function getSecret(): string {
  // Prefer a dedicated payment-link secret so a leak of either the auth secret
  // or the payment secret can't forge the other's tokens. Fall back to
  // NEXTAUTH_SECRET so existing deploys keep signing until PAYMENT_LINK_SECRET
  // is configured.
  const s = process.env.PAYMENT_LINK_SECRET || process.env.NEXTAUTH_SECRET;
  if (!s) {
    throw new Error(
      "PAYMENT_LINK_SECRET or NEXTAUTH_SECRET is required for payment link signing",
    );
  }
  return s;
}

/** Default payment-link lifetime. */
export const PAYMENT_LINK_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

// Unambiguous canonicalization: JSON of fixed-typed fields. Because the amount
// is a number and the strings are JSON-quoted/escaped, two distinct
// (amount, description, agencyId, exp) tuples cannot serialize to the same
// payload — unlike the old ":"-joined string, where "100:Job 1" and
// "1:00Job 1" collided and let an attacker forge an unauthorized amount.
function canonicalPayload(
  amount: number,
  description: string,
  agencyId: string | undefined,
  exp: number,
): string {
  return JSON.stringify({ a: amount, d: description, g: agencyId ?? null, e: exp });
}

function computeSignature(
  amount: number,
  description: string,
  agencyId: string | undefined,
  exp: number,
): string {
  return createHmac("sha256", getSecret())
    .update(canonicalPayload(amount, description, agencyId, exp))
    .digest("hex");
}

export interface SignedPaymentLink {
  /** Expiry as epoch milliseconds. Must be carried in the link and re-supplied on verify. */
  exp: number;
  signature: string;
}

/**
 * Sign payment params with an expiry. The expiry is part of the signed payload,
 * so links can't be tampered with and stop working after `ttlMs`.
 */
export function signPaymentParams(
  amount: number,
  description: string,
  agencyId?: string,
  ttlMs: number = PAYMENT_LINK_TTL_MS,
): SignedPaymentLink {
  const exp = Date.now() + ttlMs;
  return { exp, signature: computeSignature(amount, description, agencyId, exp) };
}

/** Verify a payment link's signature and expiry (timing-safe). */
export function verifyPaymentSignature(
  amount: number,
  description: string,
  signature: string,
  exp: number,
  agencyId?: string,
): boolean {
  if (!Number.isFinite(exp) || Date.now() > exp) return false;
  // Signature must be exactly a 64-char sha256 hex digest; reject anything else
  // before decoding so Buffer.from can't silently truncate malformed input.
  if (typeof signature !== "string" || !/^[0-9a-f]{64}$/i.test(signature)) return false;
  const expected = computeSignature(amount, description, agencyId, exp);
  return timingSafeEqual(Buffer.from(expected, "hex"), Buffer.from(signature, "hex"));
}
