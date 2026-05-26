# Deploy runbook

This branch (`main`) holds the changes from local development against
`vanguardm_vanguard_dev` (a clone of prod's `vanguardm_vanguard_app`).
The production app lives on the VPS at:

- Host: `hs.vdm-smtp.net` (`103.120.48.66`, ssh port `37980`)
- Path: `/home/vanguardm/public_html/`
- Process: `pm2-vanguardm.service` → `pm2 process "vanguardm"` (port `3010`)
- Web: nginx → `127.0.0.1:3010`
- DB: `vanguardm_vanguard_app` (Postgres on the same host)
- Env file: `/home/vanguardm/env/production.env` (symlinked into the
  app dir as `.env.production`)

## Order of operations

```
1. push code   (rsync excluding node_modules/.next/.env*)
2. npm install
3. prisma generate
4. prisma migrate deploy
5. next build
6. pm2 reload vanguardm
```

Steps 4 and 5 can fail; they're the dangerous ones. Order matters —
build before reload, never reload over a half-built `.next`.

## 1 — Push code

From the project root locally:

```bash
rsync -avz --delete \
  --exclude='node_modules/' \
  --exclude='.next/' \
  --exclude='.env*' \
  --exclude='.git/' \
  --exclude='test-results/' \
  --exclude='C:/Users/james/Projects/speedmedown/Marketing/' \
  -e 'ssh -p 37980' \
  ./ root@103.120.48.66:/home/vanguardm/public_html/
```

`--delete` is correct here — files we removed (the legacy cPanel
addon-domain folders) should leave the server too. Confirm the
addon-domain directories are intentionally absent on the remote
before running with `--delete` if you're paranoid.

If `rsync` is unavailable on Windows, the same shape works via tar+ssh:

```bash
ssh -p 37980 root@103.120.48.66 'cd /home/vanguardm/public_html && \
    tar --exclude=node_modules --exclude=.next --exclude=.git --exclude=.env\* -cf - .' \
  | tar -tf -   # dry-run to inspect
```

(Outbound from the VPS to local is the wrong direction — use rsync from
local up.)

## 2 — Install + generate

```bash
ssh -p 37980 root@103.120.48.66
cd /home/vanguardm/public_html
sudo -u vanguardm npm install --legacy-peer-deps --no-audit --no-fund
sudo -u vanguardm npx prisma generate
```

`--legacy-peer-deps` is required because `next-auth@5.0.0-beta.30` peer-
ranges `nodemailer ^7` while `package.json` pins `nodemailer ^8`.
A pinned `.npmrc` (`legacy-peer-deps=true`) is in the repo.

## 3 — Apply migrations

Two migrations were added in this branch:

```
prisma/migrations/20260429_agentrun_agency_scope/         (Phase C)
prisma/migrations/20260429_conversation_client_link/      (C4)
```

Apply both with:

```bash
DATABASE_URL=postgresql://vanguard_app:…@localhost:5432/vanguardm_vanguard_app \
  sudo -u vanguardm npx prisma migrate deploy
```

`migrate deploy` reads `prisma/migrations/*/migration.sql` and only runs
the ones not yet recorded in `_prisma_migrations`. It will not need a
shadow database (that's only for `migrate dev`).

If you need to re-establish state manually (e.g. you applied SQL by
hand and want Prisma to forget), use:

```sql
SELECT migration_name, started_at, applied_steps_count
  FROM _prisma_migrations
 ORDER BY started_at DESC
 LIMIT 10;
```

## 4 — Build + copy static into standalone + reload

```bash
sudo -u vanguardm npm run build      # writes to .next/

# CRITICAL: next.config.ts uses output: "standalone" on Linux (Windows
# skips it per the NTFS note in CLAUDE.md). Standalone mode does NOT
# copy .next/static or public/ into the standalone bundle — you have
# to do it manually every deploy. pm2 runs the app from
# .next/standalone/server.js, so without this the HTML loads but every
# JS/CSS chunk and every public asset 404s (white-screen / no styles).
sudo -u vanguardm cp -r /home/vanguardm/public_html/.next/static \
                        /home/vanguardm/public_html/.next/standalone/.next/static
sudo -u vanguardm cp -r /home/vanguardm/public_html/public \
                        /home/vanguardm/public_html/.next/standalone/public

sudo -u vanguardm pm2 reload vanguardm
sudo -u vanguardm pm2 logs vanguardm --lines 50 --nostream
```

`pm2 reload` is graceful — it spins up new workers before killing old
ones. If anything goes wrong, `pm2 restart vanguardm` is the kick.

Verify chunks are serving:

```bash
SAMPLE=$(ls /home/vanguardm/public_html/.next/standalone/.next/static/chunks/ | head -1)
curl -I https://vanguardm.com/_next/static/chunks/$SAMPLE
# expect HTTP/2 200
```

## Env vars to add for new features

The two new code paths added in this branch require new env vars in
production. They are NOT in `production.env` yet:

| Var | Used by | Default if missing |
|---|---|---|
| `ANTHROPIC_API_KEY` | content templates + per-client AI chat | already set |
| `NEXT_PUBLIC_DISABLE_TURNSTILE` | Turnstile bypass for local dev | **DO NOT SET in prod** |

Verify the bypass is off:

```bash
grep NEXT_PUBLIC_DISABLE_TURNSTILE /home/vanguardm/env/production.env
# (no output = correct; the bypass only fires when explicitly =true)
```

The bypass is implemented via `process.env.NEXT_PUBLIC_DISABLE_TURNSTILE === "true"`,
so any other value (including absent) keeps Turnstile fully active.

## Stripe webhook check

`POST /stripe/webhook` is signed with `STRIPE_WEBHOOK_SECRET`. If you
rotate the live secret, update `production.env` and reload pm2; no
code change needed.

The webhook maps Stripe subscription events to
`Agency.{planTier, subscriptionStatus, maxClients}`, so plan gating
turns on automatically when a customer upgrades through the portal.

## PM2 process management (as the `vanguardm` user)

All pm2 work for the app should happen inside a real login shell for the
`vanguardm` user — not via `sudo -u vanguardm pm2 ...` from a root shell.

```bash
ssh -p 37980 root@103.120.48.66
su - vanguardm     # full login shell: loads ~/.profile, PATH, NODE_HOME, PM2_HOME
cd /home/vanguardm/public_html
```

### Why `su -` and not `sudo -u`

- `su -` (with the dash) starts a **login shell**. It sources
  `~/.profile`, sets `HOME=/home/vanguardm`, `USER=vanguardm`, and the
  vanguardm user's PATH — which is where the nvm-installed `node` and
  the user-local `pm2` live.
- `sudo -u vanguardm pm2 ...` runs the command with vanguardm's UID but
  in **root's environment** unless you also pass `-i` or `-H`. With the
  wrong `HOME` or missing `PM2_HOME`, pm2 will sometimes fork a
  **second daemon** under root's home (`/root/.pm2`) instead of talking
  to the vanguardm daemon (`/home/vanguardm/.pm2`). Symptoms: `pm2 list`
  shows the process under one shell but `pm2 reload vanguardm` from
  another shell reports "process not found."
- The deploy commands above (`sudo -u vanguardm npm install`,
  `sudo -u vanguardm npx prisma ...`) are safe because they don't talk
  to a long-lived daemon. pm2 does, so it's special.

### First-time pm2 setup (one-off)

Run once, when the VPS is fresh or after a node/nvm upgrade:

```bash
su - vanguardm
cd /home/vanguardm/public_html/.next/standalone
PORT=3010 pm2 start server.js --name vanguardm --env production
pm2 save                       # persists the current process list
exit                           # back to root
pm2 startup systemd -u vanguardm --hp /home/vanguardm
# pm2 prints a `sudo env PATH=... pm2 startup ...` command — run it as root.
# That registers /etc/systemd/system/pm2-vanguardm.service.
systemctl enable pm2-vanguardm
systemctl status pm2-vanguardm   # should be "active (running)"
```

After this, the systemd unit boots pm2 on host reboot and pm2 boots the
saved process list. `pm2 save` is what makes the boot-time restore work
— if you change the process configuration without running `pm2 save`,
the next reboot will revert to the previously-saved state.

### Day-to-day pm2 commands (inside `su - vanguardm`)

```bash
pm2 list                       # see all processes; expect "vanguardm" online
pm2 logs vanguardm              # tail logs (Ctrl+C to exit, no kill)
pm2 logs vanguardm --lines 200 --nostream    # last 200 lines, no follow
pm2 reload vanguardm            # graceful restart (zero-downtime)
pm2 restart vanguardm           # hard restart (brief outage)
pm2 describe vanguardm          # config + last restart reason + uptime
pm2 monit                       # live CPU/memory/log dashboard
pm2 flush vanguardm             # truncate the log file (rare)
```

If the daemon itself looks wedged:

```bash
pm2 kill                        # stops the user's pm2 daemon
pm2 resurrect                   # re-reads the saved process list
```

### Verifying the right daemon is being talked to

```bash
pm2 status                      # should show PM2_HOME=/home/vanguardm/.pm2
ls -la /home/vanguardm/.pm2/    # expect dump.pm2 + pids + logs
ps -ef | grep PM2               # exactly one PM2 v… God Daemon per user
```

If you see two daemons (one with PM2_HOME under `/root/.pm2`, one under
`/home/vanguardm/.pm2`), kill the wrong one (`PM2_HOME=/root/.pm2 pm2 kill`
as root) and re-run `pm2 resurrect` as vanguardm.

### Deploy ordering inside `su - vanguardm`

The Step 4 build + reload commands above can be re-run end-to-end from
within a single `su - vanguardm` session:

```bash
su - vanguardm
cd /home/vanguardm/public_html
npm install --legacy-peer-deps --no-audit --no-fund
npx prisma generate
npx prisma migrate deploy
npm run build
cp -r .next/static .next/standalone/.next/static
cp -r public      .next/standalone/public
pm2 reload vanguardm
pm2 logs vanguardm --lines 50 --nostream
exit
```

This is the preferred shape for any pm2-touching deploy — keeps
everything inside one user's environment and avoids the dual-daemon
trap above.

## Rollback

The repo is git-based locally but production isn't a git working tree —
files are rsync'd. To roll back:

1. `git checkout <prev-commit>` locally
2. Run the rsync again (Step 1) — `--delete` will reverse new files
3. `prisma migrate resolve --rolled-back 20260429_…` for any migration
   you want Prisma to forget (it does NOT undo SQL — write a manual
   reverse-SQL if needed)
4. `pm2 reload vanguardm`

## Smoke list after deploy

Sign in as the platform super-admin (`james@vanguardm.com`) at
`https://vanguardm.com/auth/sign-in`, then:

- [ ] `/admin` — KPI tiles render with non-zero values
- [ ] ⌘K palette opens, finds clients/leads
- [ ] `/admin/leads` — kanban + create + detail page
- [ ] `/admin/forms` — list, can create
- [ ] `/admin/exit-popups` — list, can edit
- [ ] `/admin/agents` — list of past runs
- [ ] `/admin/agents` "Run agent" → brief writer template completes
- [ ] `/admin/clients/<id>` — "AI chat" button, sidebar opens, sends
- [ ] `/admin/settings` hub — 4 cards link to their sub-pages
- [ ] `/portal/settings` (as a client) — services + SLA panels render
- [ ] `/portal/messages` — "Live" indicator goes green within 1s

If anything 500s, `pm2 logs vanguardm --lines 200`.

## Outstanding work (not in this branch)

For the next person picking it up:

- Wire `ContentEntry` → `SocialPost` → `Approval` workflow
  (models exist, admin UIs exist, the connector doesn't)
- Convert the SEO explorers from client-side polling to server
  components with pagination (~1,800 lines of working code that just
  doesn't scale past ~10k rows)
- Extend `lib/agent-executor.ts` sudoers wrappers for new tenants —
  current sandboxing only knows about sites already mapped in
  `lib/client-sites.ts`
