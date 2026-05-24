# Capsule: deploy v1.0

Compressed pointer to `/DEPLOY.md` (the runbook). This capsule names the load-bearing facts; consult DEPLOY.md for exact commands.

## Target
- VPS: `vps66822.nodevm.com` (`103.120.48.66`, ssh `:37980`)
- Path: `/home/vanguardm/public_html/`
- Process: `pm2-vanguardm.service` → pm2 process `vanguardm` on `:3010`
- Web: nginx → `127.0.0.1:3010`
- DB: `vanguardm_vanguard_app` (Postgres on same host)
- Env: `/home/vanguardm/env/production.env` symlinked as `.env.production`

## Order (non-negotiable)
1. rsync push (excluding `node_modules/`, `.next/`, `.env*`, `.git/`, `test-results/`)
2. `npm install`
3. `prisma generate`
4. `prisma migrate deploy`  ← dangerous
5. `next build`             ← dangerous
6. `pm2 reload vanguardm`

**Build before reload.** Never reload over a half-built `.next`.

## Standalone-mode gotcha
Don't enable `output: "standalone"` for local Windows builds — NTFS blocks the symlink/copy step. Keep the conditional in `next.config.ts`.
