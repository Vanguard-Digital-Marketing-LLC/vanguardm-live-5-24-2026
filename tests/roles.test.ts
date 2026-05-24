import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock env vars before importing the module
beforeEach(() => {
  vi.stubEnv("AUTH_ADMIN_EMAIL", "james@vanguardm.com,admin@test.com");
  vi.stubEnv("AUTH_EMPLOYEE_DOMAIN", "vanguardm.com");
});

describe("resolveRoleFromEmail", () => {
  it("returns ADMIN for admin emails", async () => {
    const { resolveRoleFromEmail } = await import("@/lib/roles");
    const result = resolveRoleFromEmail("james@vanguardm.com");
    expect(result).toEqual({ role: "ADMIN", isAdmin: true });
  });

  it("returns ADMIN for case-insensitive admin emails", async () => {
    const { resolveRoleFromEmail } = await import("@/lib/roles");
    const result = resolveRoleFromEmail("ADMIN@TEST.COM");
    expect(result).toEqual({ role: "ADMIN", isAdmin: true });
  });

  it("returns TEAM for employee domain emails", async () => {
    const { resolveRoleFromEmail } = await import("@/lib/roles");
    const result = resolveRoleFromEmail("employee@vanguardm.com");
    expect(result).toEqual({ role: "TEAM", isAdmin: false });
  });

  it("returns USER for unknown emails", async () => {
    const { resolveRoleFromEmail } = await import("@/lib/roles");
    const result = resolveRoleFromEmail("random@gmail.com");
    expect(result).toEqual({ role: "USER", isAdmin: false });
  });
});
