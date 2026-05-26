import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock next-auth's auth() function
const mockAuth = vi.fn();
vi.mock("@/auth", () => ({ auth: () => mockAuth() }));

// Mock rate-limit. The real module exports `rateLimitAsync` (and is consumed
// as such by lib/api-middleware.ts); the prior mock exported `rateLimit`
// which made this stub a silent no-op — future tests that exercise rate-
// limited paths would have hit real Redis instead.
vi.mock("@/lib/rate-limit", () => ({
  rateLimitAsync: async () => ({ allowed: true, remaining: 99, resetIn: 60000 }),
}));

// requireAdminAuth reads request headers (subdomain agency slug); provide an
// empty header set by default so tests run outside a real Next request scope.
// Individual tests can mutate `headersState.value` to inject `x-agency-slug`
// for subdomain-aware branches (super-admin tightening, agency-mismatch).
// `vi.hoisted` keeps the shared state available to the hoisted vi.mock factory.
const headersState = vi.hoisted(() => ({ value: new Headers() }));
vi.mock("next/headers", () => ({
  headers: () => Promise.resolve(headersState.value),
}));

import { requireAuth, requireAdminAuth, requirePortalAuth } from "@/lib/api-middleware";

describe("requireAuth", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns errorResponse when not authenticated", async () => {
    mockAuth.mockResolvedValue(null);
    const result = await requireAuth();
    expect(result.errorResponse).toBeDefined();
    expect(result.errorResponse!.status).toBe(401);
  });

  it("returns session when authenticated", async () => {
    const session = { user: { id: "u1", role: "ADMIN", isAdmin: true } };
    mockAuth.mockResolvedValue(session);
    const result = await requireAuth();
    expect(result.session).toBeDefined();
    expect(result.session!.user.id).toBe("u1");
  });

  it("returns 403 when role does not match", async () => {
    const session = { user: { id: "u1", role: "TEAM", isAdmin: false } };
    mockAuth.mockResolvedValue(session);
    const result = await requireAuth("ADMIN");
    expect(result.errorResponse).toBeDefined();
    expect(result.errorResponse!.status).toBe(403);
  });

  it("allows matching role", async () => {
    const session = { user: { id: "u1", role: "ADMIN", isAdmin: true } };
    mockAuth.mockResolvedValue(session);
    const result = await requireAuth("ADMIN");
    expect(result.session).toBeDefined();
  });
});

describe("requireAdminAuth", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset the next/headers mock so a previous test's subdomain header
    // doesn't bleed into the next test (super-admin tightening cases below
    // set `x-agency-slug` to exercise the subdomain branch).
    headersState.value = new Headers();
  });

  it("returns errorResponse when not authenticated", async () => {
    mockAuth.mockResolvedValue(null);
    const result = await requireAdminAuth();
    expect(result.errorResponse).toBeDefined();
    expect(result.errorResponse!.status).toBe(401);
  });

  it("returns 403 for non-admin/team roles", async () => {
    const session = { user: { id: "u1", role: "CLIENT", isAdmin: false } };
    mockAuth.mockResolvedValue(session);
    const result = await requireAdminAuth();
    expect(result.errorResponse).toBeDefined();
    expect(result.errorResponse!.status).toBe(403);
  });

  it("returns 403 when no agencyId", async () => {
    const session = { user: { id: "u1", role: "ADMIN", isAdmin: true, agencyId: null } };
    mockAuth.mockResolvedValue(session);
    const result = await requireAdminAuth();
    expect(result.errorResponse).toBeDefined();
    expect(result.errorResponse!.status).toBe(403);
  });

  it("returns session + agencyId for admin with agency", async () => {
    const session = { user: { id: "u1", role: "ADMIN", isAdmin: true, agencyId: "ag1" } };
    mockAuth.mockResolvedValue(session);
    const result = await requireAdminAuth();
    expect(result.session).toBeDefined();
    expect(result.agencyId).toBe("ag1");
  });

  it("defaults to ADMIN + TEAM when no roles specified", async () => {
    const session = { user: { id: "u1", role: "TEAM", isAdmin: false, agencyId: "ag1" } };
    mockAuth.mockResolvedValue(session);
    const result = await requireAdminAuth();
    expect(result.session).toBeDefined();
    expect(result.agencyId).toBe("ag1");
  });

  it("enforces specific role when provided", async () => {
    const session = { user: { id: "u1", role: "TEAM", isAdmin: false, agencyId: "ag1" } };
    mockAuth.mockResolvedValue(session);
    const result = await requireAdminAuth("ADMIN");
    expect(result.errorResponse).toBeDefined();
    expect(result.errorResponse!.status).toBe(403);
  });

  // ── B.1 super-admin tightening regression coverage ───────────────────────
  // The legacy check admitted `isAdmin === true && (!agencySlug || agencySlug === "vanguard")`,
  // letting a historic admin with a null agencySlug silently act as a platform
  // super-admin. Tightened to strict `agencySlug === "vanguard"`. These cases
  // pin the new behavior so a future regression is caught.

  it("returns 403 for isAdmin=true with no agencyId after super-admin tightening", async () => {
    // Null agencyId + null agencySlug: previously could be admitted on the
    // permissive branch. The tightened check now falls through to the
    // "No agency context" 403 (operators must run the backfill migration
    // 20260526070000_backfill_super_admin_slug).
    const session = {
      user: {
        id: "u1",
        role: "ADMIN",
        isAdmin: true,
        agencyId: null,
        agencySlug: null,
      },
    };
    mockAuth.mockResolvedValue(session);
    const result = await requireAdminAuth();
    expect(result.errorResponse).toBeDefined();
    expect(result.errorResponse!.status).toBe(403);
  });

  it("allows isAdmin=true when agencyId/slug is the vanguard tenant", async () => {
    // Properly backfilled super-admin: agencySlug === "vanguard" + agencyId set.
    // No subdomain header → super-admin shortcut never evaluated; falls through
    // to the agencyId-from-session path and returns success.
    const session = {
      user: {
        id: "u1",
        role: "ADMIN",
        isAdmin: true,
        agencyId: "ag-vg",
        agencySlug: "vanguard",
      },
    };
    mockAuth.mockResolvedValue(session);
    const result = await requireAdminAuth();
    expect(result.errorResponse).toBeUndefined();
    expect(result.session).toBeDefined();
    expect(result.agencyId).toBe("ag-vg");
  });

  it("returns 403 for isAdmin=true with a non-vanguard agencySlug", async () => {
    // Tenant admin (isAdmin within their own tenant but NOT a platform
    // super-admin) hitting a different tenant's subdomain. Inject the
    // subdomain header so the super-admin branch is exercised: with
    // `agencySlug === "other"` the user is NOT a platform super-admin, and
    // since `session.user.agencySlug !== subdomainSlug` we get the agency-
    // mismatch 403 — confirming the tightened check does not admit `other`.
    headersState.value = new Headers({ "x-agency-slug": "vanguard" });
    const session = {
      user: {
        id: "u1",
        role: "ADMIN",
        isAdmin: true,
        agencyId: "ag-x",
        agencySlug: "other",
      },
    };
    mockAuth.mockResolvedValue(session);
    const result = await requireAdminAuth();
    expect(result.errorResponse).toBeDefined();
    expect(result.errorResponse!.status).toBe(403);
  });
});

describe("requirePortalAuth", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 401 when not authenticated", async () => {
    mockAuth.mockResolvedValue(null);
    const result = await requirePortalAuth();
    expect(result.errorResponse).toBeDefined();
    expect(result.errorResponse!.status).toBe(401);
  });

  it("returns 401 for non-CLIENT roles (e.g. admin carrying a clientId)", async () => {
    const session = { user: { id: "u1", role: "ADMIN", isAdmin: true, clientId: "c1" } };
    mockAuth.mockResolvedValue(session);
    const result = await requirePortalAuth();
    expect(result.errorResponse).toBeDefined();
    expect(result.errorResponse!.status).toBe(401);
  });

  it("returns 403 when CLIENT has no linked clientId", async () => {
    const session = { user: { id: "u1", role: "CLIENT", clientId: null } };
    mockAuth.mockResolvedValue(session);
    const result = await requirePortalAuth();
    expect(result.errorResponse).toBeDefined();
    expect(result.errorResponse!.status).toBe(403);
  });

  it("returns session + clientId for a linked CLIENT", async () => {
    const session = { user: { id: "u1", role: "CLIENT", clientId: "c1" } };
    mockAuth.mockResolvedValue(session);
    const result = await requirePortalAuth();
    expect(result.session).toBeDefined();
    expect(result.clientId).toBe("c1");
  });
});
