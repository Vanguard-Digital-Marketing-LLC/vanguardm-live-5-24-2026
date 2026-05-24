# ANCHOR_Guide v0.2

User-facing help. Surfaced by `anchor help`.

## Commands
```
anchor help
anchor capsule list installed
anchor capsule list available
anchor capsule install <alias>
anchor backup
```

## Workflow
1. Bootstrap a fresh session: paste/upload bootstrap capsule, run `anchor install capsule:bootstrap`.
2. Work — use installed capsules' heuristics.
3. When new patterns emerge → mint a capsule.
4. Periodically → `anchor backup`.
5. Archive heavy research session; bootstrap a fresh lean one.

## Tips
- Keep capsules small and single-purpose.
- Bump version on any change; never edit in place.
- Domain capsules are opt-in — don't load what you won't use this session.
