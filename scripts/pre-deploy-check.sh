#!/bin/bash
# Pre-deploy validation — run before deploying to production.
# Exits non-zero on any failure.

set -euo pipefail

cd "$(dirname "$0")/.."

echo "=== Pre-Deploy Check ==="

# 1. TypeScript check
echo ""
echo "[1/2] TypeScript type check..."
npx tsc --noEmit
echo "  TypeScript: OK"

# 2. Production build
echo ""
echo "[2/2] Next.js production build..."
npx next build
echo "  Build: OK"

echo ""
echo "=== All checks passed ==="
