import { describe, it, expect } from "vitest";
import { hasFeature, PLAN_FEATURES } from "@/lib/plan-limits";

describe("hasFeature", () => {
  it("STARTER has basic features", () => {
    expect(hasFeature("STARTER", "clients")).toBe(true);
    expect(hasFeature("STARTER", "tasks")).toBe(true);
    expect(hasFeature("STARTER", "tickets")).toBe(true);
    expect(hasFeature("STARTER", "portal")).toBe(true);
  });

  it("STARTER lacks advanced features", () => {
    expect(hasFeature("STARTER", "reports")).toBe(false);
    expect(hasFeature("STARTER", "blog")).toBe(false);
    expect(hasFeature("STARTER", "leads")).toBe(false);
    expect(hasFeature("STARTER", "agent")).toBe(false);
    expect(hasFeature("STARTER", "whitelabel")).toBe(false);
  });

  it("PRO has mid-tier features", () => {
    expect(hasFeature("PRO", "reports")).toBe(true);
    expect(hasFeature("PRO", "blog")).toBe(true);
    expect(hasFeature("PRO", "leads")).toBe(true);
    expect(hasFeature("PRO", "approvals")).toBe(true);
  });

  it("PRO lacks enterprise features", () => {
    expect(hasFeature("PRO", "agent")).toBe(false);
    expect(hasFeature("PRO", "whitelabel")).toBe(false);
  });

  it("ENTERPRISE has all features", () => {
    expect(hasFeature("ENTERPRISE", "agent")).toBe(true);
    expect(hasFeature("ENTERPRISE", "whitelabel")).toBe(true);
    expect(hasFeature("ENTERPRISE", "clients")).toBe(true);
    expect(hasFeature("ENTERPRISE", "reports")).toBe(true);
  });

  it("PLAN_FEATURES has all three tiers", () => {
    expect(Object.keys(PLAN_FEATURES)).toEqual(["STARTER", "PRO", "ENTERPRISE"]);
  });

  it("each tier is a superset of the previous", () => {
    for (const feature of PLAN_FEATURES.STARTER) {
      expect(PLAN_FEATURES.PRO.has(feature)).toBe(true);
    }
    for (const feature of PLAN_FEATURES.PRO) {
      expect(PLAN_FEATURES.ENTERPRISE.has(feature)).toBe(true);
    }
  });
});
