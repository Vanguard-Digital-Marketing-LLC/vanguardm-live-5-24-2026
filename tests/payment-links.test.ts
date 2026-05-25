import { describe, it, expect, beforeAll } from "vitest";
import {
  signPaymentParams,
  verifyPaymentSignature,
} from "@/lib/payment-links";

beforeAll(() => {
  process.env.PAYMENT_LINK_SECRET ||= "test-payment-secret-please-ignore";
});

describe("payment-links", () => {
  it("verifies a freshly signed link", () => {
    const { exp, signature } = signPaymentParams(10000, "Web design deposit", "agency-1");
    expect(verifyPaymentSignature(10000, "Web design deposit", signature, exp, "agency-1")).toBe(true);
  });

  it("rejects a tampered amount", () => {
    const { exp, signature } = signPaymentParams(10000, "Job", "agency-1");
    expect(verifyPaymentSignature(1, "Job", signature, exp, "agency-1")).toBe(false);
  });

  it("rejects a tampered agency", () => {
    const { exp, signature } = signPaymentParams(10000, "Job", "agency-1");
    expect(verifyPaymentSignature(10000, "Job", signature, exp, "agency-2")).toBe(false);
  });

  it("rejects an expired link", () => {
    const { signature } = signPaymentParams(10000, "Job", "agency-1");
    expect(verifyPaymentSignature(10000, "Job", signature, Date.now() - 1, "agency-1")).toBe(false);
  });

  it("rejects when exp is changed (exp is part of the signed payload)", () => {
    const { exp, signature } = signPaymentParams(10000, "Job", "agency-1");
    expect(verifyPaymentSignature(10000, "Job", signature, exp + 1000, "agency-1")).toBe(false);
  });

  it("rejects malformed signatures", () => {
    const { exp } = signPaymentParams(10000, "Job", "agency-1");
    expect(verifyPaymentSignature(10000, "Job", "not-hex", exp, "agency-1")).toBe(false);
    expect(verifyPaymentSignature(10000, "Job", "", exp, "agency-1")).toBe(false);
  });

  it("no delimiter collision between amount and description", () => {
    // The old ":"-joined scheme let (100, "Job 1") and (1, "00Job 1") collide.
    const a = signPaymentParams(100, "Job 1", "agency-1");
    expect(verifyPaymentSignature(1, "00Job 1", a.signature, a.exp, "agency-1")).toBe(false);
  });

  it("distinguishes agency vs no-agency payloads", () => {
    const withAgency = signPaymentParams(5000, "Job", "agency-1");
    expect(verifyPaymentSignature(5000, "Job", withAgency.signature, withAgency.exp, undefined)).toBe(false);
  });
});
