# ANCHOR_ModuleRegistry v0.2

Tracks module *types* and their handlers. Distinct from Index (which tracks instances).

| Type | Handler | Notes |
|---|---|---|
| capsule | core | text artifact, immutable per version |
| workflow | core (planned) | multi-step procedure |
| adapter | core (planned) | external system bridge |
| theme | core (planned) | voice/presentation overlay |

Adding a new type requires a registry bump and a Spec amendment.
