-- One-time backfill: assign the vanguard tenant to any historic isAdmin user
-- that has no agencyId, so the tightened super-admin check (agencySlug ===
-- "vanguard") doesn't lock them out. Idempotent.
UPDATE "User"
SET "agencyId" = (SELECT "id" FROM "Agency" WHERE "slug" = 'vanguard' LIMIT 1)
WHERE "isAdmin" = true AND "agencyId" IS NULL;
