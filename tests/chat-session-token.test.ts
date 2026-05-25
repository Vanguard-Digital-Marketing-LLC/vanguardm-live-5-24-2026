import { describe, it, expect, beforeEach } from "vitest";
import { signChatToken, verifyChatToken } from "@/lib/chat-session-token";

beforeEach(() => {
  process.env.AUTH_SECRET = "test-secret-for-chat-tokens";
});

describe("chat session token (H3)", () => {
  it("verifies a freshly signed token for the same session", () => {
    const token = signChatToken("cs_abc");
    expect(verifyChatToken("cs_abc", token)).toBe(true);
  });

  it("rejects a token issued for a different session", () => {
    const token = signChatToken("cs_abc");
    expect(verifyChatToken("cs_other", token)).toBe(false);
  });

  it("rejects empty, null, and malformed tokens", () => {
    expect(verifyChatToken("cs_abc", "")).toBe(false);
    expect(verifyChatToken("cs_abc", null)).toBe(false);
    expect(verifyChatToken("cs_abc", undefined)).toBe(false);
    expect(verifyChatToken("cs_abc", "no-dot-here")).toBe(false);
  });

  it("rejects when the session id is empty", () => {
    expect(verifyChatToken("", signChatToken("cs_abc"))).toBe(false);
  });

  it("rejects an expired token", () => {
    expect(verifyChatToken("cs_abc", `1000.${"0".repeat(64)}`)).toBe(false);
  });

  it("rejects a tampered signature", () => {
    const token = signChatToken("cs_abc");
    const expiry = token.split(".")[0];
    expect(verifyChatToken("cs_abc", `${expiry}.${"0".repeat(64)}`)).toBe(false);
  });
});
