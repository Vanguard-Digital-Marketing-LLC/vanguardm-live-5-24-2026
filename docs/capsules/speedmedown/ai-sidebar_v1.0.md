# Capsule: ai-sidebar v1.0

Per-client AI chat — **lives in the admin area, not the client portal**. Used by agency staff to reason about a single client.

## Surface
- UI: `components/admin/clients/ClientAIChat.tsx`
- Route: `app/api/admin/clients/[id]/chat/route.ts`
- System prompt assembly: `lib/ai/system-prompt.ts` + capsule loader at `lib/ai/capsules.ts` (Phase 2).

## Identity
- `[id]` URL param scoped to the admin's `agencyId` via `requireAdminAuth("ADMIN")`.
- Chat session keyed on `(clientId, userId, agencyId)` in DB.

## Model + caching
- Model: `claude-haiku-4-5-20251001`.
- `max_tokens: 1500`.
- System prompt is an **array** with `cache_control: { type: "ephemeral" }` on:
  1. Static instructions + capsule bundle
  2. Per-client static facts (name, domain, retainer, SLA, status, services, projects)
- Recent activity (tasks/tickets/notes) is the uncached tail.

## Plan gating
Enterprise tier required — `hasFeature(agency.planTier, "agent")`. Returns 402 if not qualified.

## Heuristics
- Treat the chat as agency-staff-facing; copy can be terse and assume domain knowledge.
- Don't restate context unprompted.
- Keep the capsule bundle the same across all clients — only per-client facts vary.

## Anti-patterns
- Don't pass the system prompt as a plain string — kills cache hits.
- Don't put per-client facts in the same cached block as static instructions — invalidates the cache every client switch.
