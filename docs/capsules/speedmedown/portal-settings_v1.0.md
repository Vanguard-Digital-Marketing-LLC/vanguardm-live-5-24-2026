# Capsule: portal-settings v1.0

Read-only account view + password reset.

## Surface
- Page: `app/portal/settings/page.tsx`
- Password form: `components/portal/settings/PortalPasswordForm.tsx`

## Shown
Name, email, domain, contract dates, active services (with monthly budget), SLA response hours.

## Service badge colors
- SMA: purple
- PPC: blue
- WEB: emerald
- SEO: (defined inline — keep matched if duplicating)

## Conventions
- Read-only by design — clients can't edit company info from the portal. Edits route through the agency.
- Password form is the only mutating control on this page.
- Gated on a clientId presence check.

## Anti-patterns
- Don't add inline edit fields without a product decision; clients editing their own contract dates would be a real problem.
