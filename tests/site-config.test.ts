import { describe, it, expect } from "vitest";
import { getBaseUrl, SITE_URL } from "@/lib/site-config";

// Minimal request stub whose headers.get() is case-insensitive like the Web Headers API.
function req(headers: Record<string, string>) {
  const lower = Object.fromEntries(
    Object.entries(headers).map(([k, v]) => [k.toLowerCase(), v])
  );
  return { headers: { get: (name: string) => lower[name.toLowerCase()] ?? null } };
}

describe("getBaseUrl — host-header poisoning protection", () => {
  it("falls back to SITE_URL when no request is given", () => {
    expect(getBaseUrl()).toBe(SITE_URL);
  });

  it("honors the apex host", () => {
    expect(getBaseUrl(req({ host: "vanguardm.com" }))).toBe("https://vanguardm.com");
  });

  it("honors a legitimate tenant subdomain", () => {
    expect(getBaseUrl(req({ host: "acme.vanguardm.com" }))).toBe("https://acme.vanguardm.com");
  });

  it("rejects a spoofed Host header and falls back to SITE_URL", () => {
    expect(getBaseUrl(req({ host: "evil.com" }))).toBe(SITE_URL);
  });

  it("rejects a spoofed X-Forwarded-Host and falls back to SITE_URL", () => {
    expect(getBaseUrl(req({ "x-forwarded-host": "evil.com" }))).toBe(SITE_URL);
  });

  it("rejects a look-alike suffix domain (evilvanguardm.com)", () => {
    expect(getBaseUrl(req({ host: "evilvanguardm.com" }))).toBe(SITE_URL);
  });

  it("rejects an attacker prefix (vanguardm.com.evil.com)", () => {
    expect(getBaseUrl(req({ host: "vanguardm.com.evil.com" }))).toBe(SITE_URL);
  });

  it("takes the first entry of a comma-listed X-Forwarded-Host", () => {
    expect(getBaseUrl(req({ "x-forwarded-host": "acme.vanguardm.com, evil.com" }))).toBe(
      "https://acme.vanguardm.com"
    );
  });

  it("forces https for real hosts even if x-forwarded-proto says http (no downgrade)", () => {
    expect(getBaseUrl(req({ host: "vanguardm.com", "x-forwarded-proto": "http" }))).toBe(
      "https://vanguardm.com"
    );
  });

  it("allows http for localhost in development", () => {
    expect(getBaseUrl(req({ host: "localhost:3000" }))).toBe("http://localhost:3000");
  });
});
