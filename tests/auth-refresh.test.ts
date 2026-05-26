import { describe, it, expect, vi, beforeEach } from "vitest";
import { decodeJwt } from "jose";

// --- Mocks (refresh must never touch a real DB / network) ---
const refreshTokenFindUnique = vi.fn();
const refreshTokenDelete = vi.fn();
const refreshTokenCreate = vi.fn();
const agencyFindUnique = vi.fn();
const transactionRun = vi.fn(async (ops: unknown) => ops);

vi.mock("@/lib/db", () => ({
  prisma: {
    refreshToken: {
      findUnique: (...a: unknown[]) => refreshTokenFindUnique(...a),
      delete: (...a: unknown[]) => refreshTokenDelete(...a),
      create: (...a: unknown[]) => refreshTokenCreate(...a),
    },
    agency: {
      findUnique: (...a: unknown[]) => agencyFindUnique(...a),
    },
    $transaction: (ops: unknown) => transactionRun(ops),
  },
}));

vi.mock("@/lib/rate-limit", () => ({
  rateLimitAsync: vi.fn(async () => ({ allowed: true, remaining: 9, resetIn: 0 })),
}));

process.env.NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET || "test-secret-min-32-bytes-long-aaaaaaaaaa";

import { POST } from "@/app/api/auth/refresh/route";

function req(body: Record<string, unknown>, headers: Record<string, string> = {}) {
  return {
    headers: {
      get: (k: string) => headers[k.toLowerCase()] ?? null,
    },
    json: async () => body,
  } as never;
}

const STORED_TOKEN = {
  id: "rt-1",
  tokenHash: "any-hash",
  userId: "u-admin",
  expiresAt: new Date(Date.now() + 60_000),
  user: {
    id: "u-admin",
    email: "admin@example.com",
    name: "Admin User",
    role: "ADMIN" as const,
    isAdmin: true,
    agencyId: "ag-test",
  },
};

beforeEach(() => {
  vi.clearAllMocks();
  refreshTokenDelete.mockResolvedValue({});
  refreshTokenCreate.mockResolvedValue({});
});

describe("POST /api/auth/refresh — rotated JWT keeps tenant claims (B.3 sibling)", () => {
  it("issues a refreshed access token whose payload carries agencyId and agencySlug", async () => {
    refreshTokenFindUnique.mockResolvedValue(STORED_TOKEN);
    agencyFindUnique.mockResolvedValue({ slug: "vanguard" });

    const res = await POST(req({ refreshToken: "raw-refresh-token-aaaa" }));

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(typeof body.accessToken).toBe("string");

    const claims = decodeJwt(body.accessToken);
    expect(claims.agencyId).toBe("ag-test");
    expect(claims.agencySlug).toBe("vanguard");
    expect(claims.role).toBe("ADMIN");
    expect(claims.isAdmin).toBe(true);
    expect(claims.sub).toBe("u-admin");

    // Confirm the route actually queried the agency.slug (the claim isn't stale).
    expect(agencyFindUnique).toHaveBeenCalledTimes(1);
    expect(agencyFindUnique.mock.calls[0][0]).toEqual({
      where: { id: "ag-test" },
      select: { slug: true },
    });

    // And the refresh-token row was rotated.
    expect(refreshTokenDelete).toHaveBeenCalled();
    expect(refreshTokenCreate).toHaveBeenCalled();
  });

  it("emits null tenant claims for a refresh on a platform user (no agency)", async () => {
    refreshTokenFindUnique.mockResolvedValue({
      ...STORED_TOKEN,
      user: { ...STORED_TOKEN.user, agencyId: null },
    });

    const res = await POST(req({ refreshToken: "raw-refresh-token-bbbb" }));

    expect(res.status).toBe(200);
    const claims = decodeJwt((await res.json()).accessToken);
    expect(claims.agencyId).toBeNull();
    expect(claims.agencySlug).toBeNull();

    // Should not have queried agency.findUnique (skipped for null agencyId).
    expect(agencyFindUnique).not.toHaveBeenCalled();
  });
});
