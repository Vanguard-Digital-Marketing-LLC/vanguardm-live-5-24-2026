# Capsule: portal-tickets v1.0

Support tickets — full lifecycle.

## Surface
- List: `app/portal/tickets/page.tsx` — paginated 20/page.
- Detail: `app/portal/tickets/[id]/page.tsx` — reuses admin's `TicketThread`.
- New: `app/portal/tickets/new/page.tsx`.

## Statuses
OPEN → IN_PROGRESS → WAITING → RESOLVED → CLOSED.

## Priorities
LOW, NORMAL, HIGH, URGENT.

## Conventions
- **Reuse admin `TicketThread`** for comments — don't fork a portal-specific thread component.
- Resolved date tracked separately from CLOSED transition.
- Assignee surfaced to client (no anonymity).

## Anti-patterns
- Don't fork the thread component — divergence will leak (e.g., file-attachment behavior).
- Don't expose internal staff comments — use the same `isInternal: false` filter as messages.
