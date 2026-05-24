# Supabase → Local Storage Migration Design

**Date:** 2026-02-25
**Status:** Approved
**Scope:** Remove Supabase dependency entirely — migrate file storage to local VPS disk

## Background

The vanguardm.com app uses Supabase for **file storage only** (onboarding uploads).
- Database: Already 100% on local PostgreSQL 16.11 (via Prisma)
- Auth: NextAuth.js v5 (no Supabase Auth)
- Supabase database: 8 tables, all 0 rows (never used)
- Only dependency: `@supabase/supabase-js` v2.97.0 for Storage SDK

## Decision

Full removal of Supabase — migrate onboarding file storage to local filesystem, remove package, clean up env vars, pause Supabase project.

## Architecture

### Storage Location
- **Path:** `/home/vanguardm/storage/onboarding-files/`
- **Ownership:** `vanguardm:nobody` (LiteSpeed compatibility)
- **Permissions:** 750 (no public web access)
- **Structure:** `{onboardingId}/{category}/{uid}_{filename}`

### Code Changes

| File | Action |
|------|--------|
| `lib/supabase.ts` | Delete |
| `lib/storage.ts` | Create (local fs replacement) |
| `lib/db.ts` | Remove Supabase SSL conditional |
| `app/api/onboarding/[token]/files/route.ts` | Swap import to `@/lib/storage` |
| `app/api/onboarding/[token]/files/[fileId]/route.ts` | Stream file from disk instead of signed URL |
| `app/api/admin/onboarding/[id]/files/route.ts` | Swap import to `@/lib/storage` |
| `app/api/admin/onboarding/[id]/files/[fileId]/route.ts` | Stream file from disk, local delete |
| `app/api/admin/onboarding/[id]/route.ts` | Bulk delete via local fs |
| `components/admin/onboarding/OnboardingWizard.tsx` | Direct `window.open` (skip fetch-then-open) |
| `package.json` | Remove `@supabase/supabase-js` |
| `production.env` | Remove `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` |

### Download Flow Change

**Before (Supabase):**
1. Frontend calls `GET /api/.../files/{fileId}`
2. API generates signed URL from Supabase
3. API returns `{ url, fileName }`
4. Frontend opens `url` in new tab

**After (Local):**
1. Frontend opens `GET /api/.../files/{fileId}` directly in new tab
2. API reads file from disk, streams with Content-Type + Content-Disposition headers
3. Browser handles download natively

### Storage Functions

```typescript
// lib/storage.ts
STORAGE_ROOT = /home/vanguardm/storage/onboarding-files/

uploadFile(storagePath, buffer) → writes to STORAGE_ROOT/storagePath
readFile(storagePath) → returns { buffer, exists }
deleteFile(storagePath) → unlinks file, ignores ENOENT
deleteFiles(paths[]) → bulk delete
```

## Rollback Plan

If anything breaks:
1. Re-add `SUPABASE_*` env vars to production.env
2. Restore `lib/supabase.ts` from git
3. Revert API route imports
4. Rebuild and redeploy

## Verification

- [ ] Storage directory exists with correct permissions
- [ ] Build succeeds (no import errors)
- [ ] App starts without Supabase env var errors
- [ ] File upload works via onboarding form
- [ ] File download works via admin dashboard
- [ ] File delete works via admin dashboard
- [ ] Supabase project paused
