# Vanguard Digital Marketing — 3D Website Redesign

**Date**: 2026-02-15
**Status**: Approved

## Goal

Rebuild vanguardm.com as an immersive 3D "wow factor" showcase using Next.js and React Three Fiber. Position Vanguard as a cutting-edge, premium digital marketing agency that practices what it preaches.

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 14 (App Router) | Framework, SSR, routing, API routes |
| React Three Fiber + Drei | 3D rendering, helpers, controls |
| Three.js | Underlying 3D engine |
| GSAP + ScrollTrigger | Scroll-driven animations |
| Tailwind CSS | Styling, glassmorphism utilities |
| Postprocessing (pmndrs) | Bloom, vignette effects |

## Architecture

```
Next.js App Router
├── app/
│   ├── layout.tsx          — Root layout with persistent 3D canvas
│   ├── page.tsx            — Homepage
│   ├── about/page.tsx
│   ├── services/page.tsx
│   ├── portfolio/page.tsx
│   └── contact/page.tsx
├── components/
│   ├── three/              — All 3D components
│   │   ├── Globe.tsx       — Wireframe globe + dotted continents
│   │   ├── NetworkArcs.tsx — Bezier arc connections from Texas
│   │   ├── ParticleField.tsx — Ambient floating particles
│   │   ├── Scene.tsx       — Main scene composition
│   │   └── GlobeCanvas.tsx — Canvas wrapper with Suspense
│   ├── ui/                 — Glassmorphism UI components
│   │   ├── GlassCard.tsx
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── ...
│   └── sections/           — Page sections
│       ├── Hero.tsx
│       ├── TrustBar.tsx
│       ├── StatsSection.tsx
│       ├── ServicesGrid.tsx
│       ├── WhyChooseUs.tsx
│       └── CTASection.tsx
├── hooks/
│   ├── useScrollProgress.ts
│   └── useReducedMotion.ts
└── lib/
    ├── globe-data.ts       — City coordinates, arc definitions
    └── animations.ts       — GSAP timeline configs
```

## 3D Scene: Hybrid Globe + Particle Field

### Globe Construction
- **Wireframe sphere**: `IcosahedronGeometry` with wireframe material, emerald green (#10b981), opacity ~0.15
- **Dotted continents**: Point cloud mapped to real continent lat/lng, brighter dots
- **Texas marker**: Glowing pulsing node at Texas coordinates — the origin point
- **Network arcs**: Quadratic bezier curves from Texas to 8 US cities (NYC, LA, Chicago, Miami, Seattle, Denver, Atlanta, Dallas), amber/gold (#f59e0b) with bloom
- **Particle field**: 500-800 small particles in sphere around globe, slowly drifting

### Mouse Interaction
- Globe tilts subtly toward cursor (max ~5 degrees)
- Particles slightly repel from cursor position
- Mobile: gyroscope tilt or gentle auto-rotation fallback

### Scroll-Driven Globe States

| Scroll Position | Globe State |
|---|---|
| Hero (0-100vh) | Full size, centered, bright, arcs pulsing |
| Trust Bar (100-130vh) | Slight zoom out, dims 20% |
| Stats (130-200vh) | Rotates to show Americas, steady glow |
| Services (200-350vh) | Shifts left, dimmed 40%, slow rotation |
| Why Choose Us (350-450vh) | Centers again, subtle pulse |
| CTA (450-530vh) | Zooms in slightly, full brightness |
| Footer | Dims to 20%, ambient |

## Color Palette

- **Background**: #0a0f1a (deep dark slate)
- **Primary accent**: #10b981 (emerald green)
- **Secondary accent**: #f59e0b (amber/gold)
- **Glass surfaces**: rgba(255,255,255,0.05) + backdrop-filter: blur(12px)
- **Globe wireframe**: emerald green, low opacity
- **Network arcs**: amber/gold, bloom glow
- **Particles**: white/faint emerald

## Content Layer (Glassmorphism)

The R3F Canvas is fixed-position at z-index: 0. All page content scrolls on top at z-index: 1 with semi-transparent glassmorphism backgrounds. The globe dims during dense content sections and brightens during spacious sections.

## Pages

### Homepage (/)
1. **Header** — Sticky glassmorphism nav with logo + links + CTA
2. **Hero** — Large headline "We Build Brands That Dominate Digital" + subtitle + amber CTA button, globe fully visible behind
3. **Trust Bar** — Client logos on frosted glass strip
4. **Stats** — 4 animated counters (148+ clients, 495+ projects, 97% retention, 7+ years) in glass cards
5. **Services Grid** — 6 service cards (SEO, Web Design, Social Media, PPC, Branding, Content) with icons
6. **Why Choose Us** — Mission statement + 4 differentiators (Strategy First, Full Transparency, Scalable Systems, Real Results)
7. **CTA Section** — "Ready to Grow Your Business?" + consultation button
8. **Footer** — Links, company info, support

### About (/about)
- Globe zooms to center on Texas
- Company story, team values, "Based in Texas, serving nationwide"
- Glassmorphism timeline of milestones
- Stats bar

### Services (/services)
- Globe shifts left, dimmed
- 6 service cards in 2x3 grid, each expandable with details
- "Our Process" section: 4-step horizontal flow (Audit → Strategy → Execute → Optimize)

### Portfolio (/portfolio)
- Globe ambient background
- Filterable project grid with glassmorphism cards
- Hover: card lifts with 3D CSS transform + glow border
- Click: modal or detail view with screenshots + results

### Contact (/contact)
- Globe zooms to Texas marker
- Centered glassmorphism form (Name, Email, Phone, Company, Message, Service dropdown)
- Form submission via Next.js API route

## Page Transitions
- Content: fade out (300ms) → route → fade in (300ms)
- Globe: smooth camera lerp to new position (600ms, eased)
- No full reload — 3D scene persists via React context

## Performance

- LOD: Reduce particle count on mobile/low-end devices
- Target: 60fps desktop, 30fps mobile
- `<Suspense>` fallback: gradient background while 3D loads
- Respect `prefers-reduced-motion`: disable animations, show static globe
- Lazy load inner page content
- Image optimization via Next.js `<Image>`
