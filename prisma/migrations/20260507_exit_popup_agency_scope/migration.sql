-- Add agencyId to ExitPopupConfig for tenant isolation.
-- Strategy: tolerate live snapshots where the table already exists and
-- clean-ish deploys where the migration history did not include its creation.

CREATE TABLE IF NOT EXISTS "ExitPopupConfig" (
  "id" TEXT NOT NULL,
  "agencyId" TEXT,
  "headline" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "ctaText" TEXT NOT NULL,
  "ctaLink" TEXT NOT NULL,
  "offerType" TEXT,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "showOnPaths" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ExitPopupConfig_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "ExitPopupConfig" ADD COLUMN IF NOT EXISTS "agencyId" TEXT;

UPDATE "ExitPopupConfig" SET "agencyId" = 'vanguard-seed' WHERE "agencyId" IS NULL;

ALTER TABLE "ExitPopupConfig" ALTER COLUMN "agencyId" SET NOT NULL;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'ExitPopupConfig_agencyId_fkey'
  ) THEN
    ALTER TABLE "ExitPopupConfig"
      ADD CONSTRAINT "ExitPopupConfig_agencyId_fkey"
      FOREIGN KEY ("agencyId") REFERENCES "Agency"("id")
      ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS "ExitPopupConfig_agencyId_idx" ON "ExitPopupConfig"("agencyId");
