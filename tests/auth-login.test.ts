import { describe, it, expect, vi, beforeEach } from "vitest";
import bcrypt from "bcryptjs";
import { decodeJwt } from "jose";

// --- Mocks (login must never touch a real DB / network) ---
const userFindUnique = vi.fn();
const userUpdate = vi.fn();
const refreshTokenCreate = vi.fn();

vi.mock("@/lib/db", () => ({
  prisma: {
    user: {
      findUnique: (...a: unknown[]) => userFindUnique(...a),
      update: (...a: unknown[]) => userUpdate(...a),
    },
    refreshToken: {
      create: (...a: unknown[]) => refreshTokenCreate(...a),
    },
  },
}));

vi.mock("@/lib/rate-limit", () => ({
  rateLimitAsync: vi.fn(async () => ({ allowed: true, remaining: 4, resetIn: 0 })),
}));

// JWT secret must be present before route → jwt module load.
process.env.NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET || "test-secret-min-32-bytes-long-aaaaaaaaaa";

import { POST } from "@/app/api/auth/login/route";

// Minimal NextRequest stub: login only uses headers.get() and json().
function req(body: Record<string, unknown>, headers: Record<string, string> = {}) {
  return {
    headers: {
      get: (k: string) => headers[k.toLowerCase()] ?? null,
    },
    json: async () => body,
  } as never;
}

const PLAINTEXT_PASSWORD = "Abcdef12!";
const PASSWORD_HASH = bcrypt.hashSync(PLAINTEXT_PASSWORD, 4);

const ADMIN_USER = {
  id: "u-admin",
  email: "admin@example.com",
  name: "Admin User",
  password: PASSWORD_HASH,
  isAdmin: true,
  role: "ADMIN" as const,
  agencyId: "ag-test",
  failedLoginAttempts: 0,
  lockedUntil: null,
  image: null,
  clientId: null,
  portalOnboarded: false,
  agency: { slug: "vanguard" },
};

beforeEach(() => {
  vi.clearAllMocks();
  userUpdate.mockResolvedValue({});
  refreshTokenCreate.mockResolvedValue({});
});

describe("POST /api/auth/login — JWT carries tenant claims (B.3)", () => {
  it("issues an access token whose decoded payload contains agencyId, agencySlug, and role for an admin user", async () => {
    userFindUnique.mockResolvedValue(ADMIN_USER);

    const res = await POST(req({ email: ADMIN_USER.email, password: PLAINTEXT_PASSWORD }));

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(typeof body.accessToken).toBe("string");
    expect(body.accessToken).toMatch(/\./);

    // Decode without verification — we only assert the claim payload shape.
    const claims = decodeJwt(body.accessToken);
    expect(claims.agencyId).toBe("ag-test");
    expect(claims.agencySlug).toBe("vanguard");
    expect(claims.role).toBe("ADMIN");
    expect(claims.isAdmin).toBe(true);
    expect(claims.sub).toBe("u-admin");
    expect(claims.email).toBe("admin@example.com");

    // Confirms the route queried the related agency.slug (so the claim is real, not stale).
    expect(userFindUnique).toHaveBeenCalledTimes(1);
    const findArgs = userFindUnique.mock.calls[0][0];
    expect(findArgs.include?.agency?.select?.slug).toBe(true);
  });

  it("emits null tenant claims for a platform user without an agency binding", async () => {
    userFindUnique.mockResolvedValue({
      ...ADMIN_USER,
      id: "u-platform",
      email: "platform@example.com",
      agencyId: null,
      agency: null,
    });

    const res = await POST(req({ email: "platform@example.com", password: PLAINTEXT_PASSWORD }));

    expect(res.status).toBe(200);
    const body = await res.json();
    const claims = decodeJwt(body.accessToken);
    expect(claims.agencyId).toBeNull();
    expect(claims.agencySlug).toBeNull();
    expect(claims.role).toBe("ADMIN");
  });
});
