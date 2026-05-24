# Capsule: plan-gating v1.0

Subscription plan feature gates (Phase D — commit 7e5cb71).

## Shape
- Plan stored on the client/account record.
- Sidebar nav items + restricted routes both read the same gate.
- Gate logic centralized — do not branch on plan inline in components.

## Heuristics
- Add a new gated feature → register it in the gate table, then reference by key.
- A user with insufficient plan should see the feature *exists* (upsell) unless explicitly hidden.
- Server-side enforcement is the source of truth; client-side hiding is UX only.
