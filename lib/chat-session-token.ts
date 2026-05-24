import crypto from "crypto";

/**
 * Short-lived, signed token that proves a chat session has passed Turnstile.
 * Lets us verify Turnstile ONCE per chat session instead of on every message
 * (Turnstile tokens are single-use), while keeping the public chat endpoint
 * protected against unauthenticated abuse. Format: "<expiryMs>.<hmac>".
 */
const TTL_MS = 2 * 60 * 60 * 1000; // 2 hours

function secret(): string {
  return process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || "";
}

export function signChatToken(sessionId: string): string {
  const expiry = Date.now() + TTL_MS;
  const mac = crypto
    .createHmac("sha256", secret())
    .update(`${sessionId}|${expiry}`)
    .digest("hex");
  return `${expiry}.${mac}`;
}

export function verifyChatToken(sessionId: string, token: string | undefined | null): boolean {
  if (!sessionId || !token) return false;
  const dot = token.indexOf(".");
  if (dot < 0) return false;
  const expiry = Number(token.slice(0, dot));
  const mac = token.slice(dot + 1);
  if (!Number.isFinite(expiry) || expiry < Date.now()) return false;
  const expected = crypto
    .createHmac("sha256", secret())
    .update(`${sessionId}|${expiry}`)
    .digest("hex");
  if (mac.length !== expected.length) return false;
  try {
    return crypto.timingSafeEqual(Buffer.from(mac), Buffer.from(expected));
  } catch {
    return false;
  }
}
