# Capsule: stack v1.0

Runtime and package conventions for vanguardm.com (a.k.a. speedmedown marketing).

## Runtime
- Next.js (App Router) — build via `next build --webpack`
- React 19 with `@react-three/*` for 3D, GSAP for motion
- Auth: NextAuth + `@auth/prisma-adapter`
- DB: Postgres on VPS, Prisma 7 with `@prisma/adapter-pg` driver-adapter pattern
- Payments: Stripe (`scripts/stripe-setup.mjs`)
- AI: `@anthropic-ai/sdk` v0.82
- Observability: Sentry (`@sentry/nextjs`)
- Tests: Playwright (e2e), Vitest (unit)

## Quirks (non-obvious)
- **Windows NTFS blocks `output: "standalone"`** → conditional in `next.config.ts`. Don't unconditionally enable standalone or local builds break.
- Parent dir `C:\Users\james\Projects` ships its own `package.json` (puppeteer) — turbopack `resolveAlias` is needed for tailwindcss to resolve correctly.
- Build uses webpack, not turbopack, for production.
