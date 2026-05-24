# Client Portal — Approvals, Bulk Invites & Invite Management

**Date:** 2026-03-30
**Status:** Design (v3 — revised after skills-based critic review)

---

## Feature 1: Approvals Workflow

### Data Models

```prisma
// ── New models ──────────────────────────────────────────────

model Approval {
  id          String           @id @default(cuid())
  clientId    String
  projectId   String?
  title       String
  description String           @db.Text
  category    String?          // free-text (e.g. "Proposal", "Report", "Strategy")
  status      ApprovalStatus   @default(PENDING)
  fileUrls    String[]         // paths relative to /home/vanguardm/storage/approvals/{clientId}/
  dueDate     DateTime?
  createdById String
  deletedAt   DateTime?        // soft-delete for admin mistakes
  createdAt   DateTime         @default(now())
  updatedAt   DateTime         @updatedAt

  client    Client             @relation(fields: [clientId], references: [id], onDelete: Cascade)
  project   Project?           @relation(fields: [projectId], references: [id])
  createdBy User               @relation("UserApprovals", fields: [createdById], references: [id])
  responses ApprovalResponse[]

  @@index([clientId, status])
  @@index([createdById])
}

model ApprovalResponse {
  id         String              @id @default(cuid())
  approvalId String
  userId     String
  action     ApprovalAction
  reason     ApprovalReason?
  comment    String?             @db.Text
  fileUrls   String[]            // admin can attach revised files when resubmitting
  createdAt  DateTime            @default(now())

  approval Approval @relation(fields: [approvalId], references: [id], onDelete: Cascade)
  user     User     @relation("UserApprovalResponses", fields: [userId], references: [id])

  @@index([approvalId])
}

enum ApprovalStatus {
  PENDING
  APPROVED
  REVISION_REQUESTED
  EXPIRED
}

enum ApprovalAction {
  APPROVED
  REVISION_REQUESTED
  RESUBMITTED        // admin resubmits after revision — resets status to PENDING
}

enum ApprovalReason {
  NEEDS_CHANGES
  WRONG_DIRECTION
  MISSING_INFO
  OTHER              // comment REQUIRED when reason is OTHER
}

// ── Reverse relations to add to existing models ─────────────

// User model — add:
//   approvals          Approval[]         @relation("UserApprovals")
//   approvalResponses  ApprovalResponse[] @relation("UserApprovalResponses")

// Client model — add:
//   approvals  Approval[]

// Project model — add:
//   approvals  Approval[]
```

### Versioning Strategy (simplified — no self-referencing)

Instead of `parentId` + `version` with recursive queries:
- One `Approval` row per item. Status resets to `PENDING` on resubmission.
- `ApprovalResponse` records are the revision history (each response captures what happened and when).
- Admin resubmission = new `ApprovalResponse` with `action: RESUBMITTED` + updated `fileUrls` on the Approval row.
- Query history: `findMany({ where: { approvalId }, orderBy: { createdAt: 'asc' } })` — flat, no recursion.

### Multi-User Approval Rules

When a client has multiple portal users:
- **All portal users** for that client can view all approvals.
- **First response wins** — once any user approves or requests revision, the status changes.
- Email notification sent to all portal users when approval is created.
- After response, other portal users see the result but cannot change it.

### Approval Expiration

Check-on-read approach (no cron needed):
- When fetching approvals, run a **single** `updateMany` before the list query (not per-row):
  ```ts
  await prisma.approval.updateMany({
    where: { clientId, status: "PENDING", dueDate: { lt: new Date() } },
    data: { status: "EXPIRED" }
  });
  ```
- Expired approvals can be resubmitted by admin (creates RESUBMITTED response, resets to PENDING).

### File Upload & Storage

**Storage path:** `/home/vanguardm/storage/approvals/{clientId}/{approvalId}/`
- Follows existing pattern from `lib/storage.ts` (onboarding files)
- Max file size: 10MB per file, 5 files per approval
- Allowed MIME types: `application/pdf`, `image/png`, `image/jpeg`, `image/webp`, `application/msword`, `application/vnd.openxmlformats-officedocument.wordprocessingml.document`

**v3 — Magic-byte validation:**
- Do NOT trust `Content-Type` header alone
- Read first 8 bytes of uploaded file and verify magic bytes match claimed MIME type:
  - PDF: `%PDF` (hex: `25 50 44 46`)
  - PNG: `89 50 4E 47`
  - JPEG: `FF D8 FF`
  - WebP: `52 49 46 46` + offset 8 `57 45 42 50`
- Reject mismatched files (e.g., `.exe` renamed to `.pdf`)

**v3 — Download security headers:**
All file download routes MUST set:
```ts
headers.set("Content-Disposition", `attachment; filename="${sanitizedFilename}"`);
headers.set("X-Content-Type-Options", "nosniff");
headers.set("Cache-Control", "private, no-cache");
```

**v3 — Inline preview for portal:**
- PDF: Render in `<iframe>` with `Content-Disposition: inline` on portal detail page
- Images (PNG/JPEG/WebP): Render in `<img>` tag with `Content-Disposition: inline`
- DOCX: Download only (no inline preview)

**New API routes for files:**

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | `/api/admin/clients/[id]/approvals/upload` | ADMIN | Upload files, returns file paths |
| GET | `/api/admin/approvals/[approvalId]/files/[filename]` | ADMIN | Serve file to admin |
| GET | `/api/portal/approvals/[approvalId]/files/[filename]` | CLIENT | Serve file to client (with IDOR check) |

**Upload endpoint validates:**
- Magic-byte verification (not just Content-Type header)
- File size (reject > 10MB)
- Client directory isolation (never write outside client's folder)
- Sanitize filename (strip path traversal, allow only `[a-zA-Z0-9._-]`)

### API Routes

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| GET | `/api/admin/clients/[id]/approvals` | ADMIN | List approvals for client (paginated: `?page=1&limit=20`) |
| POST | `/api/admin/clients/[id]/approvals` | ADMIN | Create approval |
| PATCH | `/api/admin/approvals/[id]` | ADMIN | Resubmit (reset to PENDING, add RESUBMITTED response) |
| DELETE | `/api/admin/approvals/[id]` | ADMIN | Soft-delete (set deletedAt) |
| POST | `/api/admin/clients/[id]/approvals/upload` | ADMIN | Upload approval files |
| GET | `/api/admin/approvals/[id]/files/[filename]` | ADMIN | Download file |
| GET | `/api/portal/approvals` | CLIENT | List my approvals (paginated: `?page=1&limit=20&status=PENDING`) |
| GET | `/api/portal/approvals/[id]` | CLIENT | Approval detail |
| POST | `/api/portal/approvals/[id]/respond` | CLIENT | Approve or request revision |
| GET | `/api/portal/approvals/[id]/files/[filename]` | CLIENT | Download/preview file |

**v3 — Zod validation on all routes:**
```ts
// lib/validations/approvals.ts
const createApprovalSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(5000),
  category: z.string().max(50).optional(),
  projectId: z.string().cuid().optional(),
  dueDate: z.string().datetime().optional(),
  fileUrls: z.array(z.string()).max(5).optional(),
});

const respondSchema = z.object({
  action: z.enum(["APPROVED", "REVISION_REQUESTED"]),
  reason: z.enum(["NEEDS_CHANGES", "WRONG_DIRECTION", "MISSING_INFO", "OTHER"]).optional(),
  comment: z.string().max(2000).optional(),
}).refine(
  (d) => d.action !== "REVISION_REQUESTED" || d.reason,
  { message: "Reason required when requesting revision" }
).refine(
  (d) => d.reason !== "OTHER" || (d.comment && d.comment.length > 0),
  { message: "Comment required when reason is OTHER" }
);
```

**Security notes:**
- TEAM role excluded from approval routes (ADMIN only — avoids middleware inconsistency)
- All portal routes MUST verify `approval.clientId === session.user.clientId` (IDOR protection)
- Rate limit: `admin` tier for admin routes, `portal` tier for portal routes
- v3: Use `requirePortalAuth()` helper that checks `role === "CLIENT"` + extracts `clientId` (since `requireAuth` only supports ADMIN|TEAM)

### Flow

1. Admin creates approval from client detail page (title, description, optional category, file uploads, optional deadline)
2. Email sent to all portal users for that client (respects `emailOnApprovalRequest` preference)
3. Client sees approval in `/portal/approvals` with pending badge in sidebar
4. Client clicks **Approve** (optional comment) or **Request Revision** (picks reason + comment — comment required if reason is OTHER)
5. Email sent to admin (createdBy) on response
6. If revision requested, admin updates files/description and resubmits → status resets to PENDING, RESUBMITTED response logged
7. Response history visible to both sides on the detail page as a timeline

### UI

**Admin — Client Detail Page:**
- New "Approvals" tab in ClientDetailTabs
- Table: title, category, status badge, due date, last response date
- "New Approval" button opens form modal with file upload
- Row actions: View, Resubmit (if REVISION_REQUESTED), Delete
- v3: Paginated (20 per page)

**Portal — `/portal/approvals`:**
- List page with status filter tabs (Pending | Approved | Revision Requested | All)
- Detail page shows: title, description, attached files (inline preview for PDF/images), response history timeline
- Action buttons: Approve / Request Revision (only visible when status is PENDING)
- Request Revision opens modal with reason dropdown + comment textarea
- v3: Empty state — "No approvals yet. Your team will send items for review here."
- v3: Paginated (20 per page)

**Sidebar badge:**
- Pending approval count fetched via RSC in portal layout, passed as prop to PortalSidebar

---

## Feature 2: Bulk Invite + Onboarding

### Bulk Invite (Admin Side)

Modify existing `InviteToPortal.tsx` component:
- Fetch all `ClientContact` records for the client
- Show as checkboxes (primary contact pre-checked)
- "Add custom email" input for non-listed contacts
- "Send All Invites" button
- API: `POST /api/admin/clients/[id]/invite` updated to accept `{ emails: string[] }`
- **Cap: max 10 emails per request** (prevents abuse)
- Creates `ClientInvite` per email, sends emails sequentially (not parallel — respect SMTP rate limits)
- Skips emails that already have active invites or existing portal accounts
- Returns summary: `{ sent: [...], skipped: [...], failed: [...] }`
- v3: Zod validation on email array

### Client Onboarding (Portal Side)

**New fields on User model (no separate PortalPreferences table):**
```prisma
// Add to User model:
portalOnboarded         Boolean @default(false)
emailOnNewReport        Boolean @default(true)
emailOnApprovalRequest  Boolean @default(true)
emailOnTicketUpdate     Boolean @default(true)
emailOnNewMessage       Boolean @default(true)   // v3: added per UX critic
```

**Single welcome page (not a multi-step wizard):**
- `/app/portal/onboarding/page.tsx`
- Shows: "Welcome to the Vanguard Client Portal" with client company name
- 4 notification preference toggles
- "Get Started" button → sets `portalOnboarded: true`, redirects to `/portal`

**v3 — Migration for existing CLIENT users:**
- Data migration sets `portalOnboarded = true` for all existing CLIENT users (they've already been using the portal)

**Middleware implementation:**
- Add `portalOnboarded` to JWT token in `auth.ts` `jwt` callback
- In `middleware.ts`: if role is CLIENT and `portalOnboarded === false`, redirect to `/portal/onboarding`
- Explicitly exclude `/portal/onboarding` and `/api/portal/preferences` from the redirect check
- After onboarding completion, call `update()` from next-auth to refresh the JWT with `portalOnboarded: true`

### API Route

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| GET/PUT | `/api/portal/preferences` | CLIENT | Get/update notification prefs + portalOnboarded |

Rate limit: `portal` tier.

---

## Feature 3: Invite Management Dashboard

### Page: `/admin/invites`

**Add to admin sidebar** under existing navigation (ADMIN only, not TEAM).

### ClientInvite Model Changes

```prisma
model ClientInvite {
  id         String    @id @default(cuid())
  clientId   String
  email      String
  token      String?   @unique  // v3: generated via crypto.randomBytes(32).toString("hex"), NOT cuid()
  expiresAt  DateTime
  acceptedAt DateTime?          // soft delete instead of hard delete
  revokedAt  DateTime?          // admin can revoke
  createdAt  DateTime  @default(now())

  client Client @relation(fields: [clientId], references: [id], onDelete: Cascade)

  @@index([clientId])
  @@index([email])
}
```

**v3 — Token generation:**
```ts
import crypto from "crypto";
const token = crypto.randomBytes(32).toString("hex"); // 64-char hex string
```
Do NOT use `@default(cuid())` — CUIDs are guessable. Generate token in application code.

**Accept-invite flow change:** Instead of deleting the invite, set `acceptedAt = now()` and set `token = null` (PostgreSQL allows multiple nulls in unique columns — no constraint violation).

**v3 — Accept-invite must also check `revokedAt`:**
```ts
const invite = await prisma.clientInvite.findFirst({
  where: { token, revokedAt: null, acceptedAt: null }
});
if (!invite) return NextResponse.json({ error: "Invalid or expired invite" }, { status: 400 });
```

**v3 — Token validation on page load:**
- Accept-invite page calls a GET endpoint to validate token BEFORE showing the registration form
- If token is invalid/expired/revoked, show error message immediately (don't let user fill out form first)

**Resend flow:** Generate new `crypto.randomBytes(32)` token, reset expiresAt. Old link is invalidated.

### UI Layout

- **Tabs with count badge:** All | Pending | Accepted | Expired | Revoked
- **Table:** Client name, Email, Status badge, Sent date, Accepted/Expired date, Actions
- **Actions:**
  - Pending → Resend (regenerates token + resets expiry), Revoke
  - Expired → Re-invite (new token, new expiry)
  - Accepted → View user link
- **Search:** By email or client name
- **Pagination:** 20 per page
- v3: **Batch actions** — Select multiple invites → Bulk Revoke, Bulk Resend (pending only)
- v3: **Empty state** — "No invites sent yet. Invite clients from their detail page."

### API Routes

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| GET | `/api/admin/invites` | ADMIN | List all invites with filters (?status, ?q, ?page) |
| PATCH | `/api/admin/invites/[id]` | ADMIN | Actions: resend or revoke (body: `{ action: "resend" \| "revoke" }`) |
| POST | `/api/admin/invites/batch` | ADMIN | v3: Batch actions (body: `{ ids: string[], action: "resend" \| "revoke" }`, max 20) |

---

## Email Notifications

**v3 — Shared email template:**
All emails use a consistent base template via `lib/email.ts`:
```ts
function buildEmailHtml({ subject, bodyHtml, ctaText, ctaUrl }: EmailOptions): string {
  // Consistent header (Vanguard logo), body, CTA button, footer
  // Footer includes: company address, unsubscribe note
  // All user-provided text passed through escapeHtml()
}
```

**v3 — HTML escaping:**
All user-provided content (titles, descriptions, names) MUST be escaped before interpolation into email HTML:
```ts
function escapeHtml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
```

| Event | Recipient | Subject |
|-------|-----------|---------|
| New approval created | Client portal users (respects `emailOnApprovalRequest` pref) | "New approval request: {title}" |
| Approval responded | Admin (createdBy) | "Approval {approved/revision requested}: {title}" |
| Approval resubmitted | Client portal users (respects pref) | "Revised approval: {title}" |
| Portal invite sent | Invited email | Existing template (no change) |
| Invite resent | Invited email | Same template, fresh link |

**Note:** Do NOT return the invite token in API response bodies. Return only the invite ID and status.

---

## Security Checklist

- [ ] All portal approval routes verify `approval.clientId === session.user.clientId`
- [ ] File upload validates magic bytes (not just Content-Type header)
- [ ] File upload validates size (10MB) and sanitizes filename (`[a-zA-Z0-9._-]` only)
- [ ] File storage is isolated per client (`/storage/approvals/{clientId}/`)
- [ ] File download routes set `Content-Disposition`, `X-Content-Type-Options: nosniff`, `Cache-Control: private`
- [ ] File download routes verify auth + client ownership before serving
- [ ] Bulk invite capped at 10 per request
- [ ] Invite token generated via `crypto.randomBytes(32)` (not cuid)
- [ ] Invite token set to `null` (not empty string) on acceptance
- [ ] Accept-invite checks `revokedAt === null` before accepting
- [ ] Accept-invite uses Prisma transaction (find + update atomic)
- [ ] Resend always regenerates token (old link dies)
- [ ] Invite token never returned in API response body
- [ ] All new routes wrapped in `withRateLimit` (admin or portal tier)
- [ ] TEAM role excluded from approval and invite management routes
- [ ] All user input in emails escaped via `escapeHtml()`
- [ ] Portal auth uses `requirePortalAuth()` that validates `role === CLIENT` + extracts `clientId`
- [ ] Zod validation on all request bodies
- [ ] Comment required when `ApprovalReason` is `OTHER`

---

## Migrations

**v3 — Split into 2 migrations (not 1):**

### Migration 1: `invite_management_and_user_fields`
- Add `acceptedAt`, `revokedAt` to `ClientInvite`
- Make `ClientInvite.token` nullable
- Remove `@default(cuid())` from `ClientInvite.token`
- Add `portalOnboarded`, `emailOnNewReport`, `emailOnApprovalRequest`, `emailOnTicketUpdate`, `emailOnNewMessage` to `User`
- Data migration: `UPDATE "User" SET "portalOnboarded" = true WHERE role = 'CLIENT'`
- Add `@@index([email])` on `ClientInvite`

### Migration 2: `approval_tables`
- Create `Approval` table with all fields and indexes
- Create `ApprovalResponse` table with all fields and indexes
- Create enums: `ApprovalStatus`, `ApprovalAction`, `ApprovalReason`
- Add reverse relations to `Client`, `Project`, `User`

---

## File Summary

### New Files (17)
- `app/portal/approvals/page.tsx` — Approvals list
- `app/portal/approvals/[id]/page.tsx` — Approval detail + respond
- `app/portal/onboarding/page.tsx` — Single-page welcome + preferences
- `app/api/admin/clients/[id]/approvals/route.ts` — List + create approvals
- `app/api/admin/clients/[id]/approvals/upload/route.ts` — File upload
- `app/api/admin/approvals/[id]/route.ts` — Resubmit (PATCH) + delete (DELETE)
- `app/api/admin/approvals/[id]/files/[filename]/route.ts` — Serve file to admin
- `app/api/portal/approvals/route.ts` — List client approvals
- `app/api/portal/approvals/[id]/route.ts` — Approval detail
- `app/api/portal/approvals/[id]/respond/route.ts` — Submit response
- `app/api/portal/approvals/[id]/files/[filename]/route.ts` — Serve file to client
- `app/admin/invites/page.tsx` — Invite management dashboard
- `app/api/admin/invites/route.ts` — List invites
- `app/api/admin/invites/[id]/route.ts` — PATCH (resend/revoke)
- `app/api/admin/invites/batch/route.ts` — v3: Batch actions
- `app/api/portal/preferences/route.ts` — Get/update notification prefs
- `lib/validations/approvals.ts` — v3: Zod schemas for all approval/invite routes
- `components/admin/clients/ApprovalForm.tsx` — Create/resubmit approval modal

### Modified Files (9)
- `prisma/schema.prisma` — Add Approval, ApprovalResponse models + enums; add fields to User; modify ClientInvite (nullable token, acceptedAt, revokedAt); add reverse relations to Client, Project
- `lib/email.ts` — v3: Add `escapeHtml()`, shared email template builder
- `components/admin/clients/InviteToPortal.tsx` — Bulk invite UI (checkboxes + custom email)
- `components/admin/clients/ClientDetailTabs.tsx` — Add Approvals tab
- `components/admin/layout/AdminSidebar.tsx` — Add Invites nav item (ADMIN only)
- `components/portal/layout/PortalSidebar.tsx` — Add Approvals nav item with badge
- `app/api/admin/clients/[id]/invite/route.ts` — Accept array of emails, cap at 10, use crypto.randomBytes for token
- `app/api/auth/accept-invite/route.ts` — Soft-delete (set acceptedAt, null token) instead of hard-delete; check revokedAt; use transaction
- `middleware.ts` — Redirect un-onboarded clients to `/portal/onboarding` (exclude onboarding + prefs routes)
- `auth.ts` — Add `portalOnboarded` to JWT callback

---

## Build Order (v3 — revised per architecture critic)

### Phase 0: Fix existing app criticals (from full audit)
Fix before building any new features:
1. Turnstile CAPTCHA bypass (S-C1)
2. Payment HMAC — full hash + timing-safe compare (S-C2)
3. Notifications API role check (S-C3)
4. Missing `onDelete` rules (D-C1, D-C2, D-C3)
5. Remove `"fallback-secret"` (A-C2)
6. HTML-escape email templates (S-H1, S-H2)

### Phase 1: Invite management + Migration 1
7. Run Migration 1 (ClientInvite changes + User fields)
8. Update `accept-invite` route (soft-delete, check revokedAt, transaction, crypto token)
9. Update `invite` route (bulk emails, crypto token)
10. Build invite management dashboard (`/admin/invites`)
11. Add Invites to admin sidebar

### Phase 2: Bulk invites + Onboarding
12. Update `InviteToPortal.tsx` for bulk invites
13. Build onboarding page (`/portal/onboarding`)
14. Build preferences API (`/api/portal/preferences`)
15. Update middleware (onboarding redirect)
16. Update auth.ts (JWT callback)

### Phase 3: Approvals workflow + Migration 2
17. Run Migration 2 (Approval tables)
18. Build file upload/download routes with magic-byte validation
19. Build admin approval API routes
20. Build portal approval API routes
21. Build admin approval UI (ClientDetailTabs)
22. Build portal approval pages (list + detail)
23. Update sidebar badges
24. Add email notifications

---

## Changes from v2 (v3 critic fixes applied)

| Issue | v2 | v3 |
|-------|----|----|
| Token generation | `@default(cuid())` — guessable | `crypto.randomBytes(32).toString("hex")` |
| Accept-invite revokedAt | Not checked | Must check `revokedAt === null` |
| Accept-invite race condition | Sequential find + delete | Prisma transaction (atomic) |
| Token validation UX | Form shown, error on submit | Validate token on page load, show error immediately |
| File upload MIME validation | Content-Type header only | Magic-byte verification (first 8 bytes) |
| File download headers | Not specified | `Content-Disposition`, `X-Content-Type-Options`, `Cache-Control` |
| Inline file preview | Download only | PDF in iframe, images inline, DOCX download |
| Email HTML injection | Unescaped user input | `escapeHtml()` on all interpolated values |
| Email template | Inconsistent per-email | Shared `buildEmailHtml()` base template |
| Expiration N+1 | Per-row check-on-read | Single `updateMany` before list query |
| Pagination | Not on approval routes | `?page=1&limit=20` on all list routes |
| Zod validation | Not specified | Full schemas for all request bodies |
| Comment on OTHER | Not enforced | Required via Zod refinement |
| emailOnNewMessage | Missing preference | Added 4th toggle |
| Existing user migration | Not handled | `SET portalOnboarded = true WHERE role = CLIENT` |
| Migration strategy | Single migration | Split into 2 (invite first, approvals second) |
| Build order | Features first | Audit criticals → invites → onboarding → approvals |
| Portal auth helper | Uses `requireAuth` (no CLIENT) | New `requirePortalAuth()` |
| Batch invite actions | Not available | Bulk revoke/resend (max 20) |
| Empty states | Not specified | Specified for approvals list + invite dashboard |
