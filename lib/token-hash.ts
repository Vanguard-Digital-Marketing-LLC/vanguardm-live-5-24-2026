import { createHash, randomBytes, timingSafeEqual } from "crypto";

/** Generate a cryptographically random refresh token (returned to client) */
export function generateRefreshToken(): string {
  return randomBytes(64).toString("hex");
}

/** SHA-256 hash a token for DB storage (never store plaintext) */
export function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

/** Timing-safe comparison of two token hashes */
export function compareTokenHash(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  return timingSafeEqual(Buffer.from(a), Buffer.from(b));
}
