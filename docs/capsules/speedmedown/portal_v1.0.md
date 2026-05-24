# Capsule: portal v1.0

Client portal at `app/portal/`.

## Surfaces
- `approvals/` — client sign-off flows
- `invoices/` — billing
- `messages/` — SSR + SSE messaging (Phase B2)
- `onboarding/` — new-client intake
- `projects/` — project state
- `reports/` — generated reports
- `settings/` — account + plan
- `tickets/` — support

## Architecture
- Server-rendered by default; SSE used for live message stream.
- Per-client AI chat sidebar (Phase C4) — see `ai-sidebar` capsule.
- Plan-gated routes (Phase D) — see `plan-gating` capsule.

## Conventions
- Each surface owns its `loading.tsx` + `error.tsx`.
- Auth boundary at `middleware.ts` — restricted routes redirect through there, not per-page.
