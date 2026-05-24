# Capsule: portal-reports v1.0

Published performance reports — weekly/monthly/quarterly.

## Surface
- List: `app/portal/reports/page.tsx`
- Detail: `app/portal/reports/[id]/page.tsx` — section content.

## Section types
TRAFFIC, ADS, SEO, SOCIAL, CUSTOM. Ordered by `sortOrder`.

## Conventions
- **PUBLISHED only.** Drafts never reach the portal — filter at the query.
- Period (WEEKLY/MONTHLY/QUARTERLY) maps to display strings.
- GA4 Property ID format: `properties/XXXXXXXX` (numeric). `G-XXXXX` is a Measurement ID — wrong format. Validation in `lib/integrations/ga4.ts` + `lib/validations/client.ts`.

## Anti-patterns
- Don't render DRAFT reports to the portal.
- Don't accept `G-XXXXX` as a Property ID — fail validation.
