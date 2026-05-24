# vanguardm.com

Full-stack SaaS platform for Vanguard Digital Marketing — client management, onboarding, billing, SEO tools, and multi-tenant agency portal.

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, standalone) |
| Language | TypeScript (strict) |
| ORM | Prisma 7 + PostgreSQL 16 |
| Auth | NextAuth.js v5 (credentials + Google OAuth) |
| Payments | Stripe (subscriptions, checkout, portal) |
| Styling | Tailwind CSS 4 |
| Animations | GSAP + @gsap/react |
| Validation | Zod 4 |
| Testing | Vitest + Playwright |
| Process Mgr | PM2 (standalone mode) |
| Proxy | ea-nginx + Cloudflare |
| Monitoring | Sentry |

## Features

- **Multi-Tenant SaaS** — subdomain routing (`*.vanguardm.com`), agency branding, plan limits
- **Stripe Billing** — STARTER / PRO / ENTERPRISE tiers, checkout, customer portal, webhooks
- **Client Onboarding** — token-based intake forms, file uploads, step tracking
- **Client Portal** — dashboard, messages, reports, settings (CLIENT role)
- **Admin CMS** — clients, blog, reports, agents, academy, settings
- **SEO Tools** — Keywords Explorer, Content Explorer, Social Media Manager (Ahrefs-style)
- **Blog** — markdown rendering, categories, tags, SEO metadata
- **Lead Capture** — scoring, multi-step forms, exit popups, chat
- **Academy** — courses with Stripe-gated access
- **Rate Limiting** — Redis sliding window with in-memory fallback

## Setup

```bash
cp .env.example .env.local
# Fill in values, then:
npm install
npx prisma db push
npx prisma generate
npm run dev
```

## Deploy

See [DEPLOY.md](DEPLOY.md) for production deployment steps.

## Security

- All env vars stored outside web root (`/home/vanguardm/env/production.env`)
- Cloudflare WAF + Turnstile on public forms
- Role-based middleware (ADMIN / CLIENT / SUPER_ADMIN)
- Zod validation on all API inputs
- Rate limiting on auth, contact, and public endpoints
- DOMPurify on user-generated HTML
