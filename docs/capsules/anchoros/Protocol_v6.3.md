# ANCHOR_Protocol v6.3

Rules for capsule operations.

## Mint
1. Draft capsule body in active session.
2. Assign canonical alias + version.
3. Write file `ANCHOR_<Name>_v<M>.<m>.md`.
4. **Always update Index** (synchronization rule — non-negotiable).
5. Announce: `Capsule <alias> v<version> minted.`

## Install
1. User issues `anchor capsule install <alias>`.
2. Resolve alias via Index → canonical URL.
3. Return URL to user; **do not auto-fetch**.
4. User pastes URL back to confirm.
5. Load capsule into session, register in installed list with timestamp.

## Upgrade
- New version supersedes old in Index.
- Old version retained in backups.
- If upgrade fails validation → **rollback** to prior Index entry.

## Skip
- A capsule may declare `skip-if:` conditions (e.g. domain mismatch). Bootstrap honors these.

## Backup
- Re-render every capsule individually with fresh timestamp.
- Archive as `ANCHOR_ProjectBackup_<ISO8601>.zip`.
- Always update Index.

## Rollback
- Restore Index + capsules from last known-good backup.
- Announce: `Rollback to <backup-id> complete.`
