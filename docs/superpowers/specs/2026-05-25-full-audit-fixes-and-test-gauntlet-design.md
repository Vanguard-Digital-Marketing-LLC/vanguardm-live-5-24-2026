# Full Audit Fixes & 40-Tester Gauntlet — Design Spec

**Date**: 2026-05-25
**Branch**: `chore/full-audit-fixes-2026-05` (worktree at `C:\Users\james\vanguard-repos\vanguardm-fix-and-test\`)
**Owner**: James (Vanguard Digital Marketing)
**Status**: Approved — open questions resolved 2026-05-25

## 1. Background

A four-track audit of `vanguardm.com` (Next.js 16 + Prisma 7 + NextAuth v5 + Stripe SaaS) produced four classes of finding:

- **Code-review of PR #12** — 8 correctness findings (1 HIGH, 2 MEDIUM, 5 LOW/NIT).
- **Security review of PR #12** — clean (no HIGH/MEDIUM at confidence ≥8).
- **Subdomain + functionality audit** — 7 multi-tenant / auth gaps (1 open redirect, 1 super-admin definition inconsistency, 1 parallel-token agency-claim hole, plus regex case-sensitivity, X-Forwarded-Host policy gap, onboarding token plaintext, reserved-slug list misses).
- **Outdated dependency audit** — `npm audit` clean; major-version laggers: stripe 20→22, @stripe/stripe-js 8→9, TypeScript 5→6, ESLint 9→10, googleapis 171→172, lucide-react 0→1.

No app instance is currently runnable locally (no `node_modules`; Windows `npm install` is known broken per session memory).

## 2. Goals & Non-Goals

### Goals
- Land every finding from the audit as a separate commit on `chore/full-audit-fixes-2026-05`.
- Group commits into four logically-cohesive PRs (Phase A–D) so review and rollback are independent.
- Validate frontend↔DB round-trips for the five high-value surfaces (forms, tasks, AI agent runs, reports, client portals) via a 40-tester Playwright gauntlet executed against a real WSL-hosted stack.
- No phase is marked complete without captured command output proving the verification gate passed.

### Non-Goals
- No production deploy. All four PRs stop at the open-PR state.
- No changes to live prod data, live Stripe accounts, or any `.vanguardm.com` host.
- No SQL-level Row-Level Security retrofit (called out in the architecture review but out of scope here).
- No refactor of god-files (`TaskBoard.tsx` 1,405 LOC, `agent-executor.ts` 822 LOC) — separate work.

## 3. Workflow Architecture

### Branching
One worktree on `chore/full-audit-fixes-2026-05`, branched from `origin/main` at commit `4e0ee7c`. All phase commits live on this branch. Four PRs cherry-pick or stack from this branch (one per phase).

### Phase sequence

```
A (low-risk edits)  →  B (auth fixes + tests)  →  C (SDK upgrades)  →  D (WSL infra + 40 testers)
       ↓                          ↓                         ↓                              ↓
  verify gate              verify gate              verify gate                   RYG gauntlet
```

Sequential because:
- A's middleware regex edits land first so B's auth tests can rely on canonical lowercase subdomains.
- B's super-admin migration must precede C's upgrades so Stripe tests don't trip on a still-permissive isAdmin path.
- C's SDK bumps must be in place before D's testers exercise Stripe checkout flows.
- D needs a stable codebase to test against.

### Subagent dispatch model

| Phase | Subagents | Why |
|---|---|---|
| A | 0 (main thread) | 11 small edits; coordination cost > work cost. |
| B | 4 parallel | Each auth fix touches independent code paths. |
| C | 3 in series | Share `package.json` / `tsconfig.json`; parallel would conflict. |
| D | 2 in series (setup), then 40 parallel (gauntlet) | Setup is sequential; testers are read/independent. |

### Verification gates

Using `superpowers:verification-before-completion`:

- **Per-phase gate** at the end of A, B, C:
  ```
  npx tsc --noEmit
  npm run lint
  npm run test
  npm audit --omit=dev --package-lock-only
  ```
  All four must exit 0. Output captured to `docs/superpowers/verify-logs/phase-<X>-<utc>.log` and referenced in the phase commit message. The `npm audit` gate exists specifically to detect regressions of the `overrides` block (see §6 Phase C note on `postcss` and `@hono/node-server`): if a future dep bump backs out either override, the per-phase gate fails.
- **Phase D gate**: above four plus `npm run test:e2e` plus the aggregated RYG report. Target: ≥36/40 testers green.
- A failing gate stops the phase. Partial work is committed (no lost progress) but the PR is marked Draft.

### Risk controls
- A and B commits are individually `git revert`-safe.
- C is a single PR so revert is one operation.
- D adds only infra and tests; no production code path is touched in D.

## 4. Phase A — Low-Risk Fixes (11 edits, one commit)

Each item below lists file, line(s), and the exact transformation.

1. **`scripts/deploy-vps.sh:24`** — gate the new `migrate deploy` behind a baseline check:
   ```sh
   if ! psql "$DATABASE_URL" -tAc "SELECT 1 FROM pg_tables WHERE tablename='_prisma_migrations'" | grep -q 1; then
     for m in prisma/migrations/*/; do
       npx prisma migrate resolve --applied "$(basename "$m")"
     done
   fi
   npx prisma migrate deploy
   ```
2. **`scripts/deploy-vps.sh`** — insert immediately after `npx prisma migrate deploy` (current step 3, before the Next.js build) — invalidate in-flight plaintext reset tokens:
   ```sh
   echo "→ Invalidating in-flight password-reset tokens (one-time, post-hash-migration)..."
   psql "$DATABASE_URL" -c "UPDATE \"User\" SET \"resetToken\"=NULL, \"resetTokenExpiry\"=NULL WHERE \"resetToken\" IS NOT NULL;"
   ```
   This step is one-time; flag it with a comment so a future maintainer knows to remove it once the prior plaintext-token window has passed (≥1 hour after first deploy of PR #12).
3. **`app/api/portal/invoices/route.ts:50-57`** — drop the misleading "null agencyId" comment. `Client.agencyId` is non-nullable per schema; the comment describes an unreachable path.
4. **`app/api/admin/reports/[id]/sections/route.ts:87-96`** — collapse `updateMany` + `findUnique` into one call:
   ```ts
   const [updated] = await prisma.reportSection.updateManyAndReturn({
     where: { id: body.sectionId, reportId: id },
     data,
   });
   if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
   return NextResponse.json(updated);
   ```
5. **`app/api/portal/messages/stream/route.ts:24-44`** — replace inline auth with the helper:
   ```ts
   const auth = await requirePortalAuth();
   if (auth.errorResponse) {
     return new Response(auth.errorResponse.statusText || "Unauthorized", { status: auth.errorResponse.status });
   }
   const { session, clientId } = auth;
   ```
6. **`lib/agent-executor.ts:44-47`** — log a known-safe error code, not the full body and not nothing:
   ```ts
   const errorCode = await res.clone().json().then(b => b?.error).catch(() => null);
   console.error("[agent-executor] Token refresh failed:", res.status, errorCode);
   ```
7. **`tests/api-middleware.test.ts:8-10`** — rename the mock export:
   ```ts
   vi.mock("@/lib/rate-limit", () => ({
     rateLimitAsync: async () => ({ allowed: true, remaining: 99, resetIn: 60_000 }),
   }));
   ```
8. **`middleware.ts:17-19`** — Permissions-Policy: add modern Topics-API opt-out, keep FLoC opt-out for legacy:
   ```ts
   "Permissions-Policy": "camera=(), microphone=(), geolocation=(), interest-cohort=(), browsing-topics=()"
   ```
9. **`middleware.ts:29`** — make subdomain regex case-insensitive and canonicalize:
   ```ts
   const m = host.split(":")[0].match(/^([a-z0-9-]+)\.vanguardm\.com$/i);
   const slug = m?.[1]?.toLowerCase() ?? null;
   ```
   If the raw host has uppercase letters and the request is a GET to a non-API path, 301 to the lowercased canonical host. API requests and non-GETs pass through (avoid breaking POST bodies).
10. **`middleware.ts`** — add a one-line comment above the host parser documenting that `X-Forwarded-Host` is intentionally ignored and that the deploy proxy (Apache) must preserve `Host`. No code change.
11. **Reserved-slug list** (`app/api/auth/signup-agency/route.ts:43`) — current set is `["vanguard", "www", "api", "admin", "mail", "app", "portal", "test"]`. Add `vercel`, `staging`, `preview`, `dev`, `staging-api`, `cdn`. (`test` already reserved.)

**Commit message**: `chore(audit): low-risk correctness + middleware fixes from full audit`

## 5. Phase B — Auth-Touching Fixes (4 parallel subagents, 4 commits)

Each subagent owns one fix end-to-end (code + tests + migration if any). All four must pass the per-phase gate together before merge.

### B.1 Super-admin definition tightening

- Locations: `middleware.ts:72-73`, `lib/api-middleware.ts:260-262`.
- Change `(!agencySlug || agencySlug === "vanguard")` → `agencySlug === "vanguard"` exactly.
- Migration `prisma/migrations/<ts>_backfill_super_admin_slug/migration.sql`:
  ```sql
  UPDATE "User"
  SET "agencyId" = (SELECT "id" FROM "Agency" WHERE "slug" = 'vanguard' LIMIT 1)
  WHERE "isAdmin" = true AND "agencyId" IS NULL;
  ```
- Vitest cases: (a) `isAdmin=true, agencySlug=null` → 403; (b) `isAdmin=true, agencySlug='vanguard'` → 200; (c) `isAdmin=true, agencySlug='other'` → 403.

### B.2 `callbackUrl` open-redirect closure

- Location: `app/auth/sign-in/SignInForm.tsx:13, 66-67`.
- New helper `lib/safe-callback-url.ts`:
  ```ts
  export function safeCallbackUrl(raw: string | null, origin: string): string {
    if (!raw) return "/dashboard";
    if (raw.startsWith("//")) return "/dashboard";
    if (raw.startsWith("/")) return raw;
    try {
      const u = new URL(raw);
      const o = new URL(origin);
      if (u.origin === o.origin) return u.pathname + u.search + u.hash;
    } catch {}
    return "/dashboard";
  }
  ```
- Replace `window.location.href = callbackUrl` with `window.location.href = safeCallbackUrl(callbackUrl, window.location.origin)`.
- Vitest cases: `/admin` → `/admin`; `//evil.com/x` → `/dashboard`; `https://evil.com` → `/dashboard`; `https://vanguardm.com/admin` → `/admin`; `javascript:alert(1)` → `/dashboard`; `""` / `null` → `/dashboard`.

### B.3 `/api/auth/login` JWT claims

- Location: `app/api/auth/login/route.ts:89-95`.
- Add `agencyId`, `agencySlug`, `role` to the signed payload. Add header comment that this endpoint exists for the API surface, not for browser auth.
- Subagent must additionally grep the entire repo (and any related companion repos under `C:\Users\james\vanguard-repos\`) for callers of `/api/auth/login` and POSTs to that path. Findings (or absence thereof) are written into the commit message as `Callers found: <list>` or `Callers found: none — candidate for deletion in follow-up PR`.
- Vitest: decode the issued JWT in a test and assert the three new claims are populated for an admin user.

### B.4 Onboarding token hashing + revoke-on-submit

- Locations: `lib/onboarding-auth.ts:7-37`, `app/api/onboarding/[token]/route.ts`.
- Hash token on write (SHA-256 hex); look up by hash. Generate raw token client-side delivery only once (same pattern as the password-reset rewrite in PR #12).
- On status transition to `COMPLETED`, null `token` and `tokenExpiresAt`.
- Migration to hash in-flight plaintext tokens:
  ```sql
  UPDATE "ClientOnboarding"
  SET "token" = encode(digest("token", 'sha256'), 'hex')
  WHERE "token" IS NOT NULL AND length("token") < 64;
  ```
- Vitest cases: lookup by hash works; lookup by plaintext fails; post-COMPLETED GET with the original token returns 410.

**Commit messages**: `fix(auth): tighten super-admin definition` / `fix(auth): close callbackUrl open-redirect` / `fix(auth): add agency claims to /api/auth/login JWT` / `fix(onboarding): hash tokens and revoke on completion`.

## 6. Phase C — SDK Upgrades (3 sequential subagents, 3 commits)

> **Pre-existing `overrides` cover two advisories** — confirmed 2026-05-26 by
> resolving `node_modules/postcss/package.json` in a healthy sibling install:
>
> | Advisory | Vulnerable version | Override floor (current `package.json`) | Resolved version |
> |---|---|---|---|
> | [GHSA-qx2v-qp2m-jg93](https://github.com/advisories/GHSA-qx2v-qp2m-jg93) (postcss `</style>` XSS in `stringify`, bundled by `next` ≤ 16.3.0-canary.5) | postcss ≤ 8.4.31 | `^8.5.13` | postcss `8.5.15` ✅ |
> | [GHSA-92pp-h63x-v22m](https://github.com/advisories/GHSA-92pp-h63x-v22m) (`@hono/node-server` serveStatic bypass, reachable via `prisma@7.x` → `@prisma/dev`) | `@hono/node-server` ≤ 1.19.11 | `^1.19.13` | not bundled — see note ⬇ |
>
> The `@hono/node-server` chain only fires when `prisma dev` is invoked; grep across `package.json`, `scripts/`, `docs/`, `README.md`, `DEPLOY.md` finds zero references. The override is belt + suspenders.
>
> **Keep both overrides in `package.json` until** (a) the upgrade lands `next@16.3.x` (which closes the postcss issue at source) and `prisma@7.9.0+` (which closes the `@hono/node-server` chain). At that point the overrides can be dropped in a follow-up commit; until then the per-phase `npm audit --omit=dev --package-lock-only` gate catches a regression of either override.


### C.1 Stripe SDK 20 → 22
- Bump `stripe` to `^22.x` in `package.json`.
- Set `apiVersion` in the Stripe client constructor to the current stable (verify against v22 release notes).
- Audit every `stripe.*` call (`app/api/billing/checkout/route.ts`, `app/api/webhooks/stripe/route.ts`, `app/api/webhooks/stripe/[agencyId]/route.ts`, `lib/stripe/customer.ts`, `scripts/stripe-setup.mjs`) for signature changes between v20 and v22. Known to watch: `subscriptions.update` second-arg shape, `checkout.sessions.create` payment_intent_data, webhook event type names.
- Re-run existing Stripe tests in WSL stack (Phase D must be up first; otherwise defer this verification gate to D).

### C.2 @stripe/stripe-js 8 → 9
- Bump `@stripe/stripe-js` to `^9.x`.
- Audit `loadStripe` calls and `Elements` provider props for v9 changes.
- Smoke-test the Academy checkout in Playwright (covered by D).

### C.3 TypeScript 5 → 6 and ESLint 9 → 10 (combined commit)
- Bump both devDeps.
- Run `npx tsc --noEmit` and `npm run lint`; fix the resulting errors (expected 0–20 small).
- If `eslint.config.mjs` breaks under v10, update per the v10 migration guide (typically: `defineConfig` import path, deprecated rules).

**Commit messages**: `chore(deps): upgrade stripe SDK to v22` / `chore(deps): upgrade @stripe/stripe-js to v9` / `chore(deps): typescript 6 + eslint 10`.

## 7. Phase D — WSL Infrastructure + 40-Tester Gauntlet

### D.1 WSL setup (subagent 1)
- `wsl --install -d Ubuntu-22.04` if not present.
- In WSL: nvm install Node 22 (matches Next 16 requirement).
- `cd` to a Linux-side checkout of the worktree (`/mnt/c/Users/james/vanguard-repos/vanguardm-fix-and-test` works but is slow over the 9P bridge; preferred: `git clone` into `~/vanguardm` and add the worktree remote).
- `npm ci` (must succeed — this is the gate that proves WSL bypasses the Windows TLS issue).

### D.2 Local Postgres + seed (subagent 2)
- Install Postgres 16 in WSL (`apt install postgresql-16`) or Docker.
- Create database `vanguardm_test`; export `DATABASE_URL`.
- `npx prisma migrate deploy`.
- Seed script (`scripts/seed-test.ts`) creates:
  - 1 super-admin agency `vanguard` + 1 super-admin user.
  - 2 tenant agencies `acme`, `globex` with `slug` populated.
  - 3 clients per tenant agency (status: ACTIVE, PROSPECT, PAUSED).
  - 2 admin users + 1 client user per tenant agency.
  - 5 tasks across statuses (NEW, IN_PROGRESS, COMPLETED).
  - 2 support tickets with 3 messages each.
  - 1 ClientReport draft + 1 published, each with 3 ReportSections.
  - 1 ClientOnboarding in `IN_PROGRESS` with a known plaintext token (for the hash-rejects-plaintext tester).
  - 2 SocialPosts (DRAFT, SCHEDULED).
  - 5 Leads across statuses.
  - 3 Keywords + 1 SerpSnapshot with 10 results.
  - 1 PROCESSED Stripe event row (idempotency tester relies on this).

### D.3 The 40-tester gauntlet

40 subagents dispatched in parallel via `superpowers:dispatching-parallel-agents`. Each gets:
- Surface name
- Scenario ID
- Test-DB credentials (read-only `pg` user for verification; Playwright uses the seed admin/client accounts for action)
- Output schema: `{ id, surface, scenario, status: "green" | "yellow" | "red", evidence: string, db_assertion: string, screenshot?: path }`

Each tester:
1. Spin Playwright headless (Chromium).
2. Run scenario against `http://acme.localtest.me:3000` (or `localhost:3000` with a `Host` header override).
3. Query Postgres directly via `pg` to assert the expected DB side-effect (row exists / column matches / state transition recorded).
4. Return RYG with concrete evidence (DB row, response status, screenshot path).

#### Surface 1: Forms (8 scenarios)
1. Contact form submit → row in `ContactSubmission` with correct fields.
2. Sign-up new user → row in `User` with `role=USER`, `isAdmin=false`, `agencyId=null`.
3. Sign-in valid → `__Secure-next-auth.session-token` cookie set; sign-in invalid → no cookie, 401.
4. Accept-invite (valid token) → User created with role from invite; `TeamInvite.acceptedAt` set.
5. Accept-invite (expired token) → 400; no User created.
6. Forgot-password (existing email) → `User.resetToken` updated; rate-limit headers present. Forgot-password (nonexistent) → 200 with generic message (no info leak); `User` table unchanged.
7. Reset-password happy → password hash updated; `resetToken` cleared. Reset-password token-reuse → 400.
8. Client-onboarding step 1 → 2 → 3 → `ClientOnboarding.status` transitions correctly; file uploads land in `OnboardingFile`.

#### Surface 2: Tasks (8 scenarios)
1. Create task → row in `Task` with correct `agencyId`, `clientId`, `assigneeId`.
2. Edit task title → `updatedAt` advances; new title persisted.
3. Delete task → row removed; subtasks JSON gone.
4. Assign task to user → `Task.assigneeId` updated.
5. Status transition NEW → IN_PROGRESS → COMPLETED → all three transitions reflected.
6. Add subtask (UI) → subtasks JSON column appended.
7. Remove subtask → JSON shortened.
8. Drag-reorder on board → `Task.position` (or equivalent) reordered.

#### Surface 3: AI agent runs (8 scenarios)
1. Ticket-fix happy path → `AgentRun` row created, status COMPLETED, `filesChanged` populated.
2. Task-fix happy path → ditto for task context.
3. Brief-writer → `AgentRun.output` non-empty.
4. SERP-analyst → `AgentRun.output` references at least one keyword.
5. Content-drafter → `AgentRun.output` contains the requested article structure.
6. Agent error path → status FAILED; `output` contains the error message.
7. OAuth token refresh on expiry → expired token triggers refresh; new `expiresAt` persisted.
8. Sub-agent timeout → run marked FAILED after configured timeout.

#### Surface 4: Reports (8 scenarios)
1. Create draft report → `ClientReport` row, status DRAFT.
2. Add TRAFFIC section → `ReportSection` with type TRAFFIC; `data` JSON populated.
3. Publish report → status → PUBLISHED; `publishedAt` set.
4. Schedule weekly recurrence → `ReportSchedule` row created.
5. View as client → portal renders the published report; correct sections rendered.
6. Edit metric in a section → `ReportSection.data` JSON path updated.
7. Delete section → row removed; report still loads.
8. Export PDF → PDF blob returned; file size > 0.

#### Surface 5: Client portals (8 scenarios)
1. Portal dashboard render → all expected widgets present; no 5xx.
2. Messages SSE round-trip → message POST appears in stream within 5s; `TicketMessage` row created.
3. Invoices list → all `ServicePayment` rows for the linked agency present; none from other agency leak.
4. Projects list → only the assigned client's projects appear.
5. Tickets list + new message → message persists; status unchanged.
6. Reports view → only published reports for the client appear.
7. Approvals respond → `ApprovalResponse` row created with correct decision.
8. Settings password change → `User.password` hash updated; old password rejected on subsequent sign-in.

### D.4 Aggregation

Main thread collects all 40 results into `docs/superpowers/verify-logs/gauntlet-2026-05-XX.json` and a human-readable Markdown summary. Counts: green / yellow / red. Per-red, the specific evidence is quoted. The Markdown summary is attached as a PR comment on D.

**Commit messages**: `chore(test): WSL stack + Postgres seed for gauntlet` / `test(gauntlet): 40 parallel frontend↔DB validators across 5 surfaces` / `chore(test): aggregate RYG report`.

## 8. Verification & Rollback

| Phase | Verification | Rollback |
|---|---|---|
| A | `tsc --noEmit && lint && test && npm audit --omit=dev --package-lock-only` | `git revert <commit>` |
| B | Same + new Vitest cases | Revert each B commit individually |
| C | Same + Stripe E2E in D's stack; audit gate especially relevant — see §6 note on overrides | Revert C PR |
| D | Same + Playwright e2e + RYG hard gate (see below) | Revert D PR; infra files only |

### Phase D RYG hard gate

Two conditions must both hold for D to be marked complete:

1. **Soft threshold**: ≥ 36 / 40 testers green (≤ 4 yellow or red combined).
2. **Hard constraints** (ANY violation blocks the phase regardless of the soft count):
   - No individual surface has fewer than 7 / 8 green.
   - No tester in any of these categories goes red: sign-in (Forms 3), accept-invite (Forms 4–5), forgot/reset-password (Forms 6–7), Stripe checkout / webhook flows (covered indirectly via Reports 3 publish + Portals 3 invoices), portal tenant-isolation (Portals 3, 4, 6).

A yellow on auth/billing/tenant-isolation testers is allowed but must be footnoted in the gauntlet summary with reproduction steps. A red on any of those testers stops the phase.

## 9. Resolved Questions (2026-05-25)

1. **`/api/auth/login` (B.3)** — patch with new claims now; subagent also greps for callers and records findings in the commit message. Deletion deferred to follow-up PR once caller status is confirmed.
2. **Super-admin migration (B.1)** — confirmed `vanguard`-slug Agency row exists in prod; backfill UPDATE proceeds.
3. **RYG threshold** — soft gate ≥36/40 green; hard gate per §8 (no surface below 7/8 green, no auth/billing/tenant-isolation tester red).
4. **Manual prod smoke-test** — out of scope here; operator's call at each phase merge.

## 10. Decisions Locked

- Worktree at `C:\Users\james\vanguard-repos\vanguardm-fix-and-test`.
- Branch `chore/full-audit-fixes-2026-05` off `origin/main` @ `4e0ee7c`.
- Four PRs, one per phase.
- All work uses `verify` and `superpowers:verification-before-completion` skills at each gate.
- Subagents dispatched per Phase B (parallel × 4), Phase C (sequential × 3), Phase D (sequential × 2 then parallel × 40).
- No prod touched. No live Stripe touched.
- WSL stack for D, not Docker, not remote staging.
