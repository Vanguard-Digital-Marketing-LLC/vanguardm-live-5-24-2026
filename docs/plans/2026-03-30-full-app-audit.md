# VanguardM.com — Full Application Audit Report

**Date:** 2026-03-30
**Audited by:** 4 specialist critic agents (Security, Data Model, UI/UX, Architecture)
**App:** `/home/vanguardm/public_html` — Next.js 16, Prisma 7, PostgreSQL 16, NextAuth v5

---

## Executive Summary

| Domain | Critical | High | Medium | Low | Total |
|--------|----------|------|--------|-----|-------|
| Security & Auth | 3 | 6 | 7 | 8 | 24 |
| Data Model & Queries | 3 | 5 | 13 | 6 | 27 |
| UI/UX & Frontend | 3 | 7 | 8 | 6 | 24 |
| Architecture & Patterns | 2 | 5 | 5 | 4 | 16 |
| **TOTAL** | **11** | **23** | **33** | **24** | **91** |

---

## CRITICAL FINDINGS (11) — Must Fix Immediately

### Security

| # | Issue | File | Fix |
|---|-------|------|-----|
| S-C1 | **Turnstile CAPTCHA bypass** — login skips verification if no token sent | `auth.ts:38-42` | Make Turnstile mandatory for credential login |
| S-C2 | **Payment HMAC truncated to 8 bytes** + timing-unsafe comparison | `lib/payment-links.ts:8-9` | Use full HMAC + `crypto.timingSafeEqual()` |
| S-C3 | **Notifications API missing role check** — any authenticated user can hit `/api/admin/notifications` | `app/api/admin/notifications/route.ts:6-19` | Add `requireAuth("ADMIN", "TEAM")` |

### Data Model

| # | Issue | File | Fix |
|---|-------|------|-----|
| D-C1 | **Missing `onDelete` on Task FKs** — deleting a Client with tasks crashes | `prisma/schema.prisma:290-298` | Add `onDelete: SetNull` on Task.client, Task.project, Task.assignee |
| D-C2 | **Missing `onDelete` on 10+ User-referencing relations** — deleting a User with any activity crashes | `prisma/schema.prisma` (multiple) | Add appropriate `onDelete` rules to TaskComment, Notification, Conversation, ClientNote, BlogPost, etc. |
| D-C3 | **Missing `onDelete` on Lead children** — deleting a Lead with form responses crashes | `prisma/schema.prisma:783,825` | Add `onDelete: SetNull` to MultiStepFormResponse.lead, ChatSession.lead |

### UI/UX

| # | Issue | File | Fix |
|---|-------|------|-----|
| U-C1 | **Missing portal ticket detail page** — clicking a ticket 404s | `app/portal/tickets/[id]/` doesn't exist | Create ticket detail page |
| U-C2 | **No sign-out button in admin** — admins can't log out | `components/admin/layout/AdminHeader.tsx` | Add sign-out button/dropdown |

### Architecture

| # | Issue | File | Fix |
|---|-------|------|-----|
| A-C1 | **No try/catch in 49 of 62 API routes** — unhandled errors leak stack traces or return opaque 500s | All API routes | Create `withErrorHandler` wrapper |
| A-C2 | **No env var validation** + hardcoded `"fallback-secret"` for payment HMAC | `lib/payment-links.ts:3` | Create `lib/env.ts` with validation; remove fallback |
| A-C3 | **No `error.tsx` boundaries** | Entire app (added in previous session but agent may not have seen) | Verify error boundaries exist; add if missing |

---

## HIGH FINDINGS (23) — Fix This Week

### Security (6)

| # | Issue | File |
|---|-------|------|
| S-H1 | **Email HTML injection** — user input interpolated unescaped into HTML email templates | `lib/email.ts:42-81` |
| S-H2 | **Email HTML injection in task notifications** — task title/description unescaped | `app/api/admin/tasks/[id]/route.ts` |
| S-H3 | **TEAM users can delete any blog post** — no ownership check | `app/api/admin/blog/[id]/route.ts:146` |
| S-H4 | **TEAM users can modify any ticket** — no assignee scoping | `app/api/admin/tickets/[id]/route.ts` |
| S-H5 | **Report section PATCH/DELETE not scoped to report** — IDOR via sectionId | `app/api/admin/reports/[id]/sections/route.ts` |
| S-H6 | **Registration reveals existing accounts** — 409 on duplicate email | `app/api/auth/register/route.ts:61-65` |

### Data Model (5)

| # | Issue | File |
|---|-------|------|
| D-H1 | **Unbounded `findMany` on clients API** — no `take` limit | `app/api/admin/clients/route.ts:33` |
| D-H2 | **Unbounded `findMany` on tasks API** | `app/api/admin/tasks/route.ts:37` |
| D-H3 | **Unbounded `findMany` on tickets API** | `app/api/admin/tickets/route.ts:26` |
| D-H4 | **Unbounded `findMany` on leads pipeline** | `app/api/admin/leads/pipeline/route.ts:21` |
| D-H5 | **N+1 query in portal projects** — per-project task groupBy in a loop | `app/api/portal/projects/route.ts:33-54` |

### UI/UX (7)

| # | Issue | File |
|---|-------|------|
| U-H1 | **No `loading.tsx` files** — no loading states on navigation | Entire app |
| U-H2 | **No `not-found.tsx` files** — generic 404 doesn't match theme | Entire app |
| U-H3 | **Mobile sidebar breaks** — no hamburger menu, sidebar permanently visible | AdminSidebar.tsx, PortalSidebar.tsx |
| U-H4 | **Reports page no pagination** | `app/admin/reports/page.tsx` |
| U-H5 | **Projects page no pagination** | `app/admin/projects/page.tsx` |
| U-H6 | **Users page missing empty state** | `app/admin/users/page.tsx` |
| U-H7 | **Academy page missing empty state** | `app/admin/academy/page.tsx` |

### Architecture (5)

| # | Issue | File |
|---|-------|------|
| A-H1 | **Pervasive `any` types** with eslint-disable | Portal page, admin pages, lead-scoring |
| A-H2 | **Unused dependency `@tanstack/react-query`** — 0 imports | `package.json` |
| A-H3 | **Missing sub-route error boundaries** | Admin/portal sub-pages |
| A-H4 | **Duplicated auth logic across 40+ API routes** | All admin API routes |
| A-H5 | **Raw `fetch()` without error/retry** in client components | TaskBoard, TicketBoard, LeadPipeline |

---

## MEDIUM FINDINGS (33) — Fix This Sprint

### Security (7)
- XSS risk in exported HTML reports (no CSP on static `/reports/` path)
- Middleware doesn't protect API routes (only pages)
- In-memory rate limiting won't work multi-instance
- CSP allows `unsafe-inline` and `unsafe-eval`
- No CSRF token validation on state-changing routes
- Fallback secret in payment-links.ts
- User PATCH allows role change to USER (breaking CLIENT portal access)

### Data Model (13)
- Missing indexes: `Task.projectId`, `User.clientId`, `TeamInvite.invitedById`
- Redundant indexes: `RefreshToken.tokenHash`, `BlogPost.slug`, `Certificate.certificateNumber`
- `isAdmin` field redundant with `role` enum (dual source of truth)
- Unbounded queries: portal messages, portal tickets, admin messages
- Race conditions: lead score updates without transactions (2 locations)
- Lead lookup by email uses `findFirst` on non-unique field
- User delete returns password hash in response
- No transactions on multi-step operations (lead status + activity, blog slug check + create)
- `ClientService.status` reuses `ClientStatus` enum (semantic mismatch)
- No soft-delete on any model
- No audit trail for client/task changes

### UI/UX (8)
- Inconsistent button styling (text-slate-950 vs text-white, bg-emerald vs bg-emerald-500)
- Missing `aria-label` / `htmlFor` on form inputs
- Portal project progress bars hardcoded (always 50%)
- Dashboard links to `/dashboard/admin` instead of `/admin`
- Duplicate `OnboardingDetailClient` component rendered twice
- Active sidebar item causes 2px visual shift
- Tables missing `role="table"` ARIA
- `<select>` options unreadable in dark mode

### Architecture (5)
- Dual rate-limit systems (`rate-limit.ts` + `api-rate-limit.ts`)
- `.bak` files in source tree and standalone build
- No structured logging (28+ raw console.error calls)
- Root layout loads Header/Footer/ChatBot on admin/portal routes
- Triple auth check (middleware + layout + page)

---

## LOW FINDINGS (24)

### Security (8)
- Login lockout threshold inconsistency (5 vs 10 attempts)
- Password complexity not enforced on reset, invite acceptance, admin password change (3 locations)
- Error messages leak internal API details from third-party integrations
- TEAM users can delete blog posts they didn't author
- TEAM users can manipulate report sections
- No input length limits on text fields

### Data Model (6)
- Redundant indexes (3 locations)
- Missing index on `TeamInvite.invitedById`
- Expired RefreshTokens/TeamInvites never cleaned up
- `Lead.email` should likely be unique

### UI/UX (6)
- Root layout renders Header/Footer on admin/portal (hidden but mounted)
- ChatBot/RocketChaser/LeadCapture load on admin pages
- Inconsistent border opacity values
- Missing focus styles on table rows
- Date formatting not timezone-aware
- Duplicate `/dashboard/admin` page

### Architecture (4)
- No Tailwind config file (expected for v4)
- Empty E2E test directory
- Incomplete `.env.example`
- `googleapis` package is ~40MB (only 4 files use it)

---

## Recommended Fix Order

### Phase 0: Immediate (security + crashes)
1. Fix Turnstile bypass on login (S-C1)
2. Fix payment HMAC — full hash + timing-safe compare (S-C2)
3. Add role check to notifications API (S-C3)
4. Add `onDelete` rules to all orphan-causing relations (D-C1, D-C2, D-C3)
5. Remove `"fallback-secret"` from payment-links.ts (A-C2)
6. Create portal ticket detail page (U-C1)
7. Add sign-out button to admin header (U-C2)

### Phase 1: High priority (this week)
8. HTML-escape all email templates (S-H1, S-H2)
9. Add TEAM ownership checks on tickets/blog (S-H3, S-H4)
10. Fix report section IDOR (S-H5)
11. Add `take` limits to all unbounded queries (D-H1-H4)
12. Fix N+1 in portal projects (D-H5)
13. Add `loading.tsx` to admin and portal (U-H1)
14. Create `withErrorHandler` wrapper for all API routes (A-C1)
15. Create `lib/env.ts` for env var validation (A-C2)

### Phase 2: This sprint
16. Add pagination to reports + projects pages (U-H4, U-H5)
17. Add empty states to users + academy (U-H6, U-H7)
18. Implement mobile sidebar (U-H3)
19. Add `not-found.tsx` pages (U-H2)
20. Consolidate auth logic into `withAuth` wrapper (A-H4)
21. Add transactions to multi-step operations
22. Remove `isAdmin` field, use only `role`
23. Clean up `.bak` files
24. Remove unused `@tanstack/react-query`

### Phase 3: Polish (next sprint)
25. Fix `any` types with Prisma generated types
26. Add structured logging
27. Standardize button/border styling
28. Fix accessibility (aria, focus, select options)
29. Add soft-delete to Client and Lead models
30. Route group refactor (separate public/admin/portal layouts)
