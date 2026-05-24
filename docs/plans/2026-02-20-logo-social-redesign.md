# Logo Redesign + Social Icons — Design Doc

**Date**: 2026-02-20
**Domain**: vanguardm.com

## Summary

Restyle the original chevron/star military emblem logo to match the site's emerald/amber/dark theme. Add social media icon links (Facebook, LinkedIn, YouTube) to both header and footer. Replace the text-only og-image with a PNG featuring the actual logo.

## Brand Reference

- **Display font**: Chakra Petch (bold, uppercase)
- **Body font**: Outfit
- **Emerald**: #10b981 (primary accent)
- **Amber**: #f59e0b (secondary accent)
- **Dark bg**: #0a0f1a
- **Slate-400**: #94a3b8 (secondary text / icon default)

## 1. VanguardLogo Component

**File**: `components/ui/VanguardLogo.tsx`

Inline SVG component rendering the chevron/star emblem restyled:
- Chevron stripes in emerald (#10b981)
- Star accent in amber (#f59e0b)
- Props: `size` (default 28), `showText` (default true)
- When `showText=true`: "VANGUARD" white Chakra Petch bold + "DIGITAL" emerald
- When `showText=false`: icon only (for tight spaces)

## 2. SocialIcons Component

**File**: `components/ui/SocialIcons.tsx`

Three inline SVG icons: Facebook, LinkedIn, YouTube.
- Props: `size` (default 20), `className`
- Default color: slate-400, hover: emerald with transition
- Each wrapped in `<a>` with target="_blank" rel="noopener noreferrer"
- URLs:
  - Facebook: https://www.facebook.com/VDMLLC
  - LinkedIn: https://www.linkedin.com/in/vanguard-digital-marketing/
  - YouTube: https://www.youtube.com/@Vanguard-digital-marketing

## 3. Header Changes

**File**: `components/ui/Header.tsx`

- Replace text logo span with `<VanguardLogo size={28} />`
- Add `<SocialIcons size={16} />` after the phone number link, before UserMenu
- Mobile nav: logo stays compact, social icons appear at bottom of mobile menu

## 4. Footer Changes

**File**: `components/ui/Footer.tsx`

- Replace text logo span with `<VanguardLogo size={32} />`
- In Connect section: replace text links "Facebook", "LinkedIn", "YouTube" with `<SocialIcons size={24} />` row
- Keep phone, email, consultation, Google Business as text links

## 5. OG Image

**File**: `public/og-image.png` (replaces og-image.svg)

- 1200x630 PNG
- Dark bg (#0a0f1a), emerald top stripe, amber bottom stripe
- Centered: white chevron emblem at ~120px + "VANGUARD DIGITAL MARKETING" in white
- Tagline: "Full-Service Digital Marketing Agency" in slate
- "Based in Texas - Trusted Nationwide" in amber

**Also update**: `app/layout.tsx` — change og:image URL from `/og-image.svg` to `/og-image.png`

## 6. Files Changed

| File | Action |
|------|--------|
| `components/ui/VanguardLogo.tsx` | Create |
| `components/ui/SocialIcons.tsx` | Create |
| `components/ui/Header.tsx` | Edit |
| `components/ui/Footer.tsx` | Edit |
| `public/og-image.png` | Create (ImageMagick) |
| `app/layout.tsx` | Edit (og:image ref) |
| Deploy: rebuild + copy static + pm2 restart | |
