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

# 3. Push schema to database (creates tables if missing)
echo "→ Syncing database schema..."
npx prisma db push --skip-generate

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
