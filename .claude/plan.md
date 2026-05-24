# Super Admin + Agency Pathing Plan

## Overview
Make james@vanguardm.com a platform super admin who can view/manage all agencies and "enter" any agency's admin panel via subdomain navigation.

## Changes

### 1. Schema — Add `isSuperAdmin` to User
- Add `isSuperAdmin Boolean @default(false)` to User model
- Migration: add column + set james@vanguardm.com as super admin

### 2. Auth (auth.ts + types/next-auth.d.ts)
- Include `isSuperAdmin` in JWT token and session
- Fetch from DB during authorize(), pass through jwt→session callbacks

### 3. Middleware (middleware.ts)
- Skip agency slug mismatch check when `token.isSuperAdmin === true`
- Super admins can visit any subdomain freely

### 4. API Middleware (lib/api-middleware.ts)
- Update `requireAdminAuth()`: if super admin, resolve agencyId from `x-agency-slug` header (set by middleware) instead of session
- This lets super admins operate on any agency's data when visiting their subdomain

### 5. Sidebar — Add "Agencies" nav item
- New nav group "Platform" with "Agencies" link at `/admin/agencies`
- Only visible when `isSuperAdmin` (pass flag as prop from layout)

### 6. Admin Layout — Pass isSuperAdmin
- Read `isSuperAdmin` from session, pass to AdminSidebar

### 7. API Route — `GET /api/admin/agencies`
- Super-admin-only endpoint
- Returns all agencies with owner info, client counts, plan tier

### 8. API Route — `PATCH /api/admin/agencies/[id]`
- Super-admin-only endpoint
- Update agency plan, maxClients, status

### 9. Page — `/admin/agencies/page.tsx`
- Table listing all agencies: name, slug, plan, status, clients, owner
- "Enter" button per row → redirects to `https://{slug}.vanguardm.com/admin`
- Only accessible to super admins

### 10. Roles helper (lib/roles.ts)
- Add `AUTH_SUPER_ADMIN_EMAIL` env var check
- Return `isSuperAdmin: true` for matching emails

## Files Modified
- `prisma/schema.prisma`
- `prisma/migrations/*/migration.sql` (new)
- `auth.ts`
- `types/next-auth.d.ts`
- `middleware.ts`
- `lib/api-middleware.ts`
- `lib/roles.ts`
- `components/admin/layout/AdminSidebar.tsx`
- `app/admin/layout.tsx`
- `app/admin/agencies/page.tsx` (new)
- `app/api/admin/agencies/route.ts` (new)
- `app/api/admin/agencies/[id]/route.ts` (new)
- `/home/vanguardm/env/production.env`
