import { describe, it, expect, vi, beforeEach } from "vitest";
import { createHash } from "crypto";

// --- Mocks (must register before importing modules under test) ---
const findUnique = vi.fn();
const update = vi.fn();

vi.mock("@/lib/db", () => ({
  prisma: {
    clientOnboarding: {
      findUnique: (...a: unknown[]) => findUnique(...a),
      update: (...a: unknown[]) => update(...a),
    },
  },
}));

vi.mock("@/lib/rate-limit", () => ({
  rateLimitAsync: vi.fn(async () => ({ allowed: true, resetIn: 0 })),
}));

vi.mock("@/lib/turnstile", () => ({
  verifyTurnstile: vi.fn(async () => true),
}));

vi.mock("@/lib/email", () => ({
  sendEmail: vi.fn(async () => ({})),
}));

import {
  buildRevokedTokenData,
  classifyOnboardingToken,
  generateOnboardingTokenPair,
  hashOnboardingToken,
  validateOnboardingToken,
} from "@/lib/onboarding-auth";

function sha256hex(input: string): string {
  return createHash("sha256").update(input).digest("hex");
}

function rowFor(opts: {
  token: string;
  status?: "DRAFT" | "IN_PROGRESS" | "SUBMITTED" | "COMPLETED";
  tokenExpiresAt?: Date;
}) {
  return {
    id: "ob_1",
    clientId: "c_1",
    status: opts.status ?? "IN_PROGRESS",
    currentStep: 0,
    serviceTypes: ["WEB"],
    token: opts.token,
    tokenExpiresAt: opts.tokenExpiresAt ?? new Date(Date.now() + 86_400_000),
    respondentName: null,
    respondentEmail: null,
    client: { id: "c_1", name: "Stark Industries" },
    responses: [],
    files: [],
  };
}

beforeEach(() => vi.clearAllMocks());

describe("validateOnboardingToken — hash lookup", () => {
  it("finds a row when the stored token is the sha256 hash of the presented raw value", async () => {
    const raw = "raw-onboarding-token-abcdef";
    findUnique.mockImplementation(({ where }: { where: { token: string } }) =>
      where.token === sha256hex(raw) ? rowFor({ token: sha256hex(raw) }) : null
    );

    const result = await validateOnboardingToken(raw);

    expect(result).not.toBeNull();
    expect(result?.id).toBe("ob_1");
    // The lookup must hash before querying — never query by raw.
    expect(findUnique.mock.calls[0][0].where.token).toBe(sha256hex(raw));
    expect(findUnique.mock.calls[0][0].where.token).not.toBe(raw);
  });

  it("returns null when the caller presents the already-hashed value (defense in depth)", async () => {
    const raw = "raw-onboarding-token-abcdef";
    const stored = sha256hex(raw);
    // DB only ever matches `stored` exactly.
    findUnique.mockImplementation(({ where }: { where: { token: string } }) =>
      where.token === stored ? rowFor({ token: stored }) : null
    );

    // Passing in the hash itself causes a hash-of-hash lookup that misses.
    const result = await validateOnboardingToken(stored);

    expect(result).toBeNull();
    expect(findUnique.mock.calls[0][0].where.token).toBe(sha256hex(stored));
  });

  it("returns null for an expired token even if the hash matches", async () => {
    const raw = "raw-token-expired-xyz";
    findUnique.mockResolvedValue(
      rowFor({ token: sha256hex(raw), tokenExpiresAt: new Date(0) })
    );

    expect(await validateOnboardingToken(raw)).toBeNull();
  });

  it("returns null for a COMPLETED onboarding even if the hash matches", async () => {
    const raw = "raw-token-completed";
    findUnique.mockResolvedValue(
      rowFor({ token: sha256hex(raw), status: "COMPLETED" })
    );

    expect(await validateOnboardingToken(raw)).toBeNull();
  });

  it("rejects empty / too-short tokens without touching the DB", async () => {
    expect(await validateOnboardingToken("")).toBeNull();
    expect(await validateOnboardingToken("short")).toBeNull();
    expect(findUnique).not.toHaveBeenCalled();
  });
});

describe("classifyOnboardingToken — 410 vs 403 disambiguation", () => {
  it("returns ok with the row when the token is valid and editable", async () => {
    const raw = "raw-valid-token";
    findUnique.mockResolvedValue(rowFor({ token: sha256hex(raw) }));

    const result = await classifyOnboardingToken(raw);

    expect(result.kind).toBe("ok");
    if (result.kind === "ok") expect(result.onboarding.id).toBe("ob_1");
  });

  it("returns gone (410) when the row exists with status=SUBMITTED (post revoke-on-submit)", async () => {
    const raw = "raw-token-after-submit";
    // First call (inside validateOnboardingToken) rejects via expiry.
    // Second call (inside classifyOnboardingToken) returns the row with
    // status=SUBMITTED so the classifier can flag it gone.
    findUnique
      .mockResolvedValueOnce(
        rowFor({
          token: sha256hex(raw),
          status: "SUBMITTED",
          tokenExpiresAt: new Date(0),
        })
      )
      .mockResolvedValueOnce({ status: "SUBMITTED" });

    const result = await classifyOnboardingToken(raw);

    expect(result.kind).toBe("gone");
  });

  it("returns gone (410) for a COMPLETED row even when expiry is still in the future", async () => {
    const raw = "raw-token-completed";
    findUnique
      .mockResolvedValueOnce(rowFor({ token: sha256hex(raw), status: "COMPLETED" }))
      .mockResolvedValueOnce({ status: "COMPLETED" });

    const result = await classifyOnboardingToken(raw);

    expect(result.kind).toBe("gone");
  });

  it("returns invalid (403) when nothing matches the hash", async () => {
    findUnique.mockResolvedValue(null);

    const result = await classifyOnboardingToken("raw-token-unknown");

    expect(result.kind).toBe("invalid");
  });

  it("returns invalid (403) for empty / too-short tokens without touching DB", async () => {
    expect((await classifyOnboardingToken("")).kind).toBe("invalid");
    expect((await classifyOnboardingToken("xx")).kind).toBe("invalid");
    expect(findUnique).not.toHaveBeenCalled();
  });
});

describe("generateOnboardingTokenPair — raw out, hash stored", () => {
  it("returns a raw token + the sha256 hex of that raw token", () => {
    const { raw, hash } = generateOnboardingTokenPair();

    expect(raw).toMatch(/^[0-9a-f]{64}$/);
    expect(hash).toBe(sha256hex(raw));
    // Critical: the raw value is what the user sees in the URL; the hash is
    // what gets persisted. They must NEVER be the same value.
    expect(hash).not.toBe(raw);
  });

  it("hashOnboardingToken is a pure sha256-hex of the input", () => {
    const input = "any-string";
    expect(hashOnboardingToken(input)).toBe(sha256hex(input));
  });

  it("hash is what should be passed to prisma.clientOnboarding.create({ data: { token } })", () => {
    // Simulate the admin-create write path: a caller using the helper must
    // store `hash` (not `raw`) and email `raw`.
    const { raw, hash } = generateOnboardingTokenPair();

    const createArgs = { data: { token: hash } };

    // The persisted value must equal sha256(raw) and must not equal raw.
    expect(createArgs.data.token).toBe(sha256hex(raw));
    expect(createArgs.data.token).not.toBe(raw);
  });
});

describe("buildRevokedTokenData — pushes expiry into the past", () => {
  it("returns a tokenExpiresAt at or before the unix epoch", () => {
    const patch = buildRevokedTokenData();
    expect(patch.tokenExpiresAt.getTime()).toBeLessThanOrEqual(0);
  });

  it("a revoked row is rejected by validateOnboardingToken (functional revocation)", async () => {
    const raw = "raw-token-being-revoked";
    const patch = buildRevokedTokenData();
    findUnique.mockResolvedValue(
      rowFor({
        token: sha256hex(raw),
        tokenExpiresAt: patch.tokenExpiresAt,
        status: "SUBMITTED",
      })
    );

    expect(await validateOnboardingToken(raw)).toBeNull();
  });
});

// ─── Route-level: GET on a SUBMITTED onboarding returns 410 ─────────────────
describe("GET /api/onboarding/[token] — revoked-on-submit returns 410", () => {
  it("responds 410 Gone when the underlying onboarding is already SUBMITTED", async () => {
    const raw = "raw-token-for-route-410";
    findUnique
      .mockResolvedValueOnce(
        rowFor({
          token: sha256hex(raw),
          status: "SUBMITTED",
          tokenExpiresAt: new Date(0),
        })
      )
      .mockResolvedValueOnce({ status: "SUBMITTED" });

    const { GET } = await import("@/app/api/onboarding/[token]/route");
    const res = await GET(
      // The route only awaits params; no headers/body needed.
      {} as never,
      { params: Promise.resolve({ token: raw }) }
    );

    expect(res.status).toBe(410);
    const body = await res.json();
    expect(body.error).toMatch(/already been submitted/i);
  });

  it("responds 403 Forbidden when the token is unknown", async () => {
    findUnique.mockResolvedValue(null);

    const { GET } = await import("@/app/api/onboarding/[token]/route");
    const res = await GET(
      {} as never,
      { params: Promise.resolve({ token: "raw-token-unknown-yyy" }) }
    );

    expect(res.status).toBe(403);
  });
});
