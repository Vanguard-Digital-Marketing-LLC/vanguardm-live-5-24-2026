# Capsule: portal-onboarding v1.0

Redirect-only stub inside the portal.

## Surface
- `app/portal/onboarding/page.tsx` — single line: redirects to `/client-onboarding`.

## Why redirect (not in-portal)
The actual onboarding flow lives outside `/portal/*` to avoid an infinite redirect loop: the portal layout itself checks the onboarded flag and bounces un-onboarded users to `/client-onboarding`. If onboarding lived inside `/portal`, that guard would catch its own pages.

## Files
Onboarding upload storage: `/home/vanguardm/storage/onboarding-files/{onboardingId}/{category}/` on the VPS — **not** in `public_html`. (See server gotchas in canonical memory.)

## Anti-patterns
- Don't move onboarding back under `/portal/*` without removing the layout-level guard.
- Don't store uploads in `public_html` — they'd be web-accessible.
