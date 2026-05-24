-- Add agencyId to ExitPopupConfig for tenant isolation.
-- Strategy: add nullable, backfill to seed agency, set NOT NULL, add FK + index.

ALTER TABLE "ExitPopupConfig" ADD COLUMN "agencyId" TEXT;

UPDATE "ExitPopupConfig" SET "agencyId" = 'vanguard-seed' WHERE "agencyId" IS NULL;

ALTER TABLE "ExitPopupConfig" ALTER COLUMN "agencyId" SET NOT NULL;

ALTER TABLE "ExitPopupConfig"
  ADD CONSTRAINT "ExitPopupConfig_agencyId_fkey"
  FOREIGN KEY ("agencyId") REFERENCES "Agency"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;

CREATE INDEX "ExitPopupConfig_agencyId_idx" ON "ExitPopupConfig"("agencyId");
