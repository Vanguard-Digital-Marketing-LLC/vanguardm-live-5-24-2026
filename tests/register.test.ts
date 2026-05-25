import { describe, it, expect, vi, beforeEach } from "vitest";

// --- Mocks (register must never touch a real DB / network) ---
const userFindUnique = vi.fn();
const userCreate = vi.fn();
const txRunner = vi.fn();

vi.mock("@/lib/db", () => ({
  prisma: {
    user: {
      findUnique: (...a: unknown[]) => userFindUnique(...a),
      create: (...a: unknown[]) => userCreate(...a),
    },
    $transaction: (cb: unknown) => txRunner(cb),
  },
}));
vi.mock("@/lib/turnstile", () => ({ verifyTurnstile: vi.fn(async () => true) }));
vi.mock("@/lib/rate-limit", () => ({
  rateLimitAsync: vi.fn(async () => ({ allowed: true, resetIn: 0 })),
}));

import { POST } from "@/app/api/auth/register/route";

// Minimal NextRequest stub: register only uses headers.get() and json().
function req(body: Record<string, unknown>) {
  return { headers: { get: () => null }, json: async () => body } as never;
}

const VALID = { name: "Test", password: "Abcdef12", turnstileToken: "t" };

beforeEach(() => vi.clearAllMocks());

describe("register — roles are never derived from email (H1)", () => {
  it("creates a plain USER even for an admin-pattern email when there is no invite", async () => {
    userFindUnique.mockResolvedValue(null);
    userCreate.mockResolvedValue({ id: "u1" });

    const res = await POST(req({ ...VALID, email: "james@vanguardm.com" }));

    expect(res.status).toBe(200);
    expect(userCreate).toHaveBeenCalledTimes(1);
    const data = userCreate.mock.calls[0][0].data;
    expect(data.role).toBe("USER");
    expect(data.isAdmin).toBe(false);
    expect(data.agencyId).toBeUndefined();
  });

  it("rejects an invite whose email does not match the registering email", async () => {
    userFindUnique.mockResolvedValue(null);
    txRunner.mockImplementation(async (cb: (tx: unknown) => unknown) =>
      cb({
        teamInvite: {
          findFirst: async () => ({
            id: "i1",
            email: "staff@vanguardm.com",
            role: "ADMIN",
            agencyId: "a1",
            expiresAt: new Date(Date.now() + 3_600_000),
          }),
          update: async () => ({}),
        },
        user: { create: userCreate },
      })
    );

    const res = await POST(req({ ...VALID, email: "attacker@evil.com", invite: "tok" }));

    expect(res.status).toBe(403);
    expect(userCreate).not.toHaveBeenCalled();
  });

  it("grants the invite's role + agency when the email matches", async () => {
    userFindUnique.mockResolvedValue(null);
    txRunner.mockImplementation(async (cb: (tx: unknown) => unknown) =>
      cb({
        teamInvite: {
          findFirst: async () => ({
            id: "i1",
            email: "staff@vanguardm.com",
            role: "ADMIN",
            agencyId: "a1",
            expiresAt: new Date(Date.now() + 3_600_000),
          }),
          update: async () => ({}),
        },
        user: { create: userCreate },
      })
    );

    const res = await POST(req({ ...VALID, email: "staff@vanguardm.com", invite: "tok" }));

    expect(res.status).toBe(200);
    const data = userCreate.mock.calls[0][0].data;
    expect(data.role).toBe("ADMIN");
    expect(data.isAdmin).toBe(true);
    expect(data.agencyId).toBe("a1");
  });

  it("rejects an expired invite", async () => {
    userFindUnique.mockResolvedValue(null);
    txRunner.mockImplementation(async (cb: (tx: unknown) => unknown) =>
      cb({
        teamInvite: {
          findFirst: async () => ({
            id: "i1",
            email: "staff@vanguardm.com",
            role: "TEAM",
            agencyId: "a1",
            expiresAt: new Date(Date.now() - 1000),
          }),
          update: async () => ({}),
        },
        user: { create: userCreate },
      })
    );

    const res = await POST(req({ ...VALID, email: "staff@vanguardm.com", invite: "tok" }));

    expect(res.status).toBe(410);
    expect(userCreate).not.toHaveBeenCalled();
  });
});
