# Capsule: portal-invoices v1.0

Read-only payment history scoped to the logged-in client user's email.

## Surface
- List: `app/portal/invoices/page.tsx`
- API: `app/api/portal/invoices/route.ts` (GET only)

## Data
Backed by `ServicePayment` records — amount, status (completed/pending/failed/refunded), date paid.

## Conventions
- **Email-based scoping is critical.** Filter by `customerEmail` with case-insensitive match. Anything looser leaks across clients sharing an account.
- No portal-side creation; invoices originate elsewhere (Stripe + admin).
- Aggregation for total paid is computed in the route, not a DB view.

## Anti-patterns
- Don't add cross-client aggregations to this surface.
- Don't expose Stripe IDs or raw webhook payloads to the client.
