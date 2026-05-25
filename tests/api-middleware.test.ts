import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock next-auth's auth() function
const mockAuth = vi.fn();
vi.mock("@/auth", () => ({ auth: () => mockAuth() }));

// Mock rate-limit
vi.mock("@/lib/rate-limit", () => ({
  rateLimit: () => ({ allowed: true, remaining: 99, resetIn: 60000 }),
}));

// requireAdminAuth reads request headers (subdomain agency slug); provide an
// empty header set so it runs outside a real Next request scope.
vi.mock("next/headers", () => ({
  headers: () => Promise.resolve(new Headers()),
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
