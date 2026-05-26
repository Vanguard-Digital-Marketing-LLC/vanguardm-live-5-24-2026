import { describe, it, expect } from "vitest";

import { safeCallbackUrl } from "@/lib/safe-callback-url";

const ORIGIN = "https://vanguardm.com";

describe("safeCallbackUrl", () => {
  it("passes a same-origin relative path unchanged", () => {
    expect(safeCallbackUrl("/admin", ORIGIN)).toBe("/admin");
  });

  it("preserves search + hash on a same-origin relative path", () => {
    expect(safeCallbackUrl("/admin?tab=clients#x", ORIGIN)).toBe(
      "/admin?tab=clients#x",
    );
  });

  it("rejects protocol-relative URLs (//evil.com/...)", () => {
    expect(safeCallbackUrl("//evil.com/x", ORIGIN)).toBe("/dashboard");
  });

  it("rejects absolute URLs on a different origin", () => {
    expect(safeCallbackUrl("https://evil.com/x", ORIGIN)).toBe("/dashboard");
  });

  it("accepts absolute URLs on the same origin and strips origin", () => {
    expect(safeCallbackUrl("https://vanguardm.com/admin", ORIGIN)).toBe(
      "/admin",
    );
  });

  it("rejects a different subdomain (subdomain.host !== host)", () => {
    expect(
      safeCallbackUrl("https://acme.vanguardm.com/portal", ORIGIN),
    ).toBe("/dashboard");
  });

  it("rejects javascript: URLs", () => {
    expect(safeCallbackUrl("javascript:alert(1)", ORIGIN)).toBe("/dashboard");
  });

  it("rejects data: URLs", () => {
    expect(safeCallbackUrl("data:text/html,<script>", ORIGIN)).toBe(
      "/dashboard",
    );
  });

  it("falls back for empty string", () => {
    expect(safeCallbackUrl("", ORIGIN)).toBe("/dashboard");
  });

  it("falls back for null", () => {
    expect(safeCallbackUrl(null, ORIGIN)).toBe("/dashboard");
  });

  it("falls back for undefined", () => {
    expect(safeCallbackUrl(undefined, ORIGIN)).toBe("/dashboard");
  });
});
