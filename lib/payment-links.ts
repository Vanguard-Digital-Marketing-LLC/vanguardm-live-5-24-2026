import { createHmac, timingSafeEqual } from "crypto";

function getSecret(): string {
  const s = process.env.NEXTAUTH_SECRET;
  if (!s) throw new Error("NEXTAUTH_SECRET environment variable is required for payment link signing");
  return s;
}

/** Sign payment params so clients can't tamper with the amount or agency. */
export function signPaymentParams(amount: number, description: string, agencyId?: string): string {
  const payload = agencyId ? `${amount}:${description}:${agencyId}` : `${amount}:${description}`;
  return createHmac("sha256", getSecret())
    .update(payload)
    .digest("hex");
}

/** Verify the HMAC signature on a payment link (timing-safe). */
export function verifyPaymentSignature(
  amount: number,
  description: string,
  signature: string,
  agencyId?: string,
): boolean {
  const expected = signPaymentParams(amount, description, agencyId);
  if (expected.length !== signature.length) return false;
  return timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
}
