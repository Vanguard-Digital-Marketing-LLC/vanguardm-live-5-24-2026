#!/bin/bash
# ─── Vanguard Digital Marketing — VPS Deploy Script ───
# Run this ON the VPS after uploading the project files.
# Usage: bash scripts/deploy-vps.sh

set -e

APP_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$APP_DIR"

echo "═══ Vanguard VPS Deploy ═══"
echo "Directory: $APP_DIR"

# 1. Install dependencies
echo "→ Installing dependencies..."
npm install --production=false

# 2. Generate Prisma client
echo "→ Generating Prisma client..."
npx prisma generate

# 3. Apply pending migrations (tracked history; no destructive drift)
# Baseline guard: if this is a DB that was previously managed by `prisma db push`
# (no _prisma_migrations table), mark all existing migrations as applied before
# `migrate deploy` so it doesn't try to re-CREATE tables that already exist.
if ! psql "$DATABASE_URL" -tAc "SELECT 1 FROM pg_tables WHERE tablename='_prisma_migrations'" 2>/dev/null | grep -q 1; then
  echo "→ Baselining migrations (no _prisma_migrations table found)..."
  for m in prisma/migrations/*/; do
    npx prisma migrate resolve --applied "$(basename "$m")"
  done
fi
echo "→ Applying database migrations..."
npx prisma migrate deploy

# 3b. Invalidate any in-flight plaintext password-reset tokens (one-time,
# post hash-migration in PR #12). Remove this block once it has been >1 hour
# since the first deploy that shipped the SHA-256-on-write change.
echo "→ Invalidating in-flight password-reset tokens (one-time, post-hash-migration)..."
psql "$DATABASE_URL" -c "UPDATE \"User\" SET \"resetToken\"=NULL, \"resetTokenExpiry\"=NULL WHERE \"resetToken\" IS NOT NULL;" 2>/dev/null || true

# 4. Build Next.js (standalone mode works on Linux)
echo "→ Building Next.js..."
npm run build

# 5. Set up PM2 process manager (install if needed)
if ! command -v pm2 &> /dev/null; then
  echo "→ Installing PM2..."
  npm install -g pm2
fi

# 6. Copy static + public files into standalone (required for standalone mode)
cp -r .next/static .next/standalone/.next/static
cp -r public .next/standalone/public 2>/dev/null || true

# 7. Start/restart the app with PM2
echo "→ Starting application..."
pm2 delete vanguardm 2>/dev/null || true
cd .next/standalone
PORT=3000 pm2 start server.js --name vanguardm --env production
pm2 save

echo ""
echo "═══ Deploy complete! ═══"
echo "App running on http://127.0.0.1:3000"
echo "Apache .htaccess will proxy https://vanguardm.com → port 3000"
echo ""
echo "Useful commands:"
echo "  pm2 logs vanguardm    — view logs"
echo "  pm2 restart vanguardm — restart app"
echo "  pm2 status            — check status"
