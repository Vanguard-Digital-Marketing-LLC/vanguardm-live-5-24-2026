# ANCHOR_Bootstrap v0.4

Loads required capsules at session start.

## Sequence
1. Load Spec → establish capsule contract.
2. Load Protocol → establish operations.
3. Load Index → resolve aliases.
4. Load ModuleRegistry → know module types.
5. Load Lexicon + GlobalTaxonomy → shared vocabulary.
6. Load Guide → user-facing help.
7. Load domain capsules per session intent (e.g. `teaching`, `parenting`, `psychology`).

## Confirmation
Emit: `Successful initiation of AnchorOS`

## Skip / upgrade logic
- If a capsule version in Index > installed version → upgrade.
- If a capsule declares `skip-if:` matching session context → skip.
- If load fails → rollback per Protocol.

## Target weight
~25–30k tokens for full bootstrap. Domain capsules are opt-in beyond core.
