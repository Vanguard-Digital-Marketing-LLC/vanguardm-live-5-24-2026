# ANCHOR_Spec v0.8

Defines what AnchorOS *is* and the contract every capsule must honor.

## Capsule
A portable, versioned text artifact that encapsulates rules, heuristics, or workflows. Filename pattern: `ANCHOR_<Name>_v<Major>.<Minor>.<ext>`.

## Module
The general plug-in unit. Capsules are one type of module. Other planned types:
- `workflow:` — multi-step procedures
- `adapter:` — bridges to external systems
- `theme:` — presentation/voice overlays

## Required fields per capsule
- `name` — canonical alias (lowercase, kebab)
- `version` — semver-ish `<Major>.<Minor>`
- `type` — `capsule` | `workflow` | `adapter` | `theme`
- `summary` — one line
- `body` — the content

## Invariants
- Capsules are immutable per version. Edits → bump version → re-mint.
- Index is the single source of truth for alias → filename resolution.
- Bootstrap payload should stay under ~30k tokens.
