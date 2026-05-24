import { describe, it, expect } from "vitest";
import { isValidStepKey } from "@/lib/onboarding-steps";

describe("isValidStepKey", () => {
  it("allows business_info for any service types", () => {
    expect(isValidStepKey("business_info", ["WEB"])).toBe(true);
    expect(isValidStepKey("business_info", ["PPC"])).toBe(true);
    expect(isValidStepKey("business_info", [])).toBe(true);
  });

  it("allows web step only for WEB service", () => {
    expect(isValidStepKey("web", ["WEB"])).toBe(true);
    expect(isValidStepKey("web", ["WEB", "SEO"])).toBe(true);
  });

  it("rejects web step without WEB service", () => {
    expect(isValidStepKey("web", ["PPC"])).toBe(false);
    expect(isValidStepKey("web", ["SEO"])).toBe(false);
  });

  it("allows always-present steps", () => {
    expect(isValidStepKey("files", ["WEB"])).toBe(true);
    expect(isValidStepKey("review", [])).toBe(true);
  });

  it("rejects arbitrary keys", () => {
    expect(isValidStepKey("admin_hack", ["WEB"])).toBe(false);
    expect(isValidStepKey("", ["WEB"])).toBe(false);
  });
});
