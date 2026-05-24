# Capsule: portal-approvals v1.0

Client sign-off workflow for deliverables (contracts, design docs, copy, files).

## Surface
- List: `app/portal/approvals/page.tsx` — status-filtered, paginated (default 20).
- Detail: `app/portal/approvals/[id]/page.tsx` — file preview + response form.
- Respond API: `app/api/portal/approvals/[id]/respond/route.ts` (POST).

## Statuses
PENDING → APPROVED | REVISION_REQUESTED | EXPIRED.

## Conventions
- **Auto-expire on read.** Items past their due date flip to EXPIRED when the list query runs. No background job — relies on the read path.
- **Soft-delete** via `deletedAt`. Always filter `deletedAt: null`.
- **Per-user scoping by email.** Documented but not strictly enforced — be careful adding queries that span clients.

## Anti-patterns
- Don't background-process EXPIRED transitions; the read-path expiry is intentional.
- Don't surface DELETED rows to clients.
