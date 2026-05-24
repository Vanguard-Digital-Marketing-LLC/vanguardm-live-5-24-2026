# Capsules

AnchorOS-style modular knowledge units. Two sets:

- **`anchoros/`** — literal port of the AnchorOS framework (Spec, Protocol, Index, Bootstrap, ModuleRegistry, Taxonomy, Lexicon, Guide + sample domain capsules). Reference for the framework itself.
- **`speedmedown/`** — capsules adapted to this project (brand voice, portal conventions, deploy runbook, AI sidebar patterns, plan gating, etc.). What you actually load to bootstrap a session about this codebase.

## Bootstrap

There's no runtime — these are markdown artifacts. To "bootstrap" a Claude Code session against this project, paste or reference the capsules in `speedmedown/INDEX.md`. To bootstrap a ChatGPT session with the AnchorOS framework, follow `anchoros/Bootstrap_v0.4.md`.

## Lifecycle

1. Heavy research / exploration session.
2. Mint findings → new capsule in the appropriate dir.
3. Bump `INDEX.md`.
4. Future sessions load only the index + needed capsules → lean context.
