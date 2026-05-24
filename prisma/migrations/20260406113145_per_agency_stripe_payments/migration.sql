-- Per-agency Stripe payments: add encrypted Stripe keys to Agency, scope ServicePayment by agency

-- Agency: per-agency Stripe credentials
ALTER TABLE "Agency" ADD COLUMN "stripeSecretKeyEnc" TEXT;
ALTER TABLE "Agency" ADD COLUMN "stripePublishableKey" TEXT;
ALTER TABLE "Agency" ADD COLUMN "stripeWebhookSecretEnc" TEXT;
ALTER TABLE "Agency" ADD COLUMN "stripeConnectedAt" TIMESTAMPTZ;

-- ServicePayment: scope by agency
ALTER TABLE "ServicePayment" ADD COLUMN "agencyId" TEXT;
ALTER TABLE "ServicePayment" ADD CONSTRAINT "ServicePayment_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE SET NULL ON UPDATE CASCADE;
CREATE INDEX "ServicePayment_agencyId_idx" ON "ServicePayment"("agencyId");

-- Backfill existing payments to vanguard agency
UPDATE "ServicePayment" SET "agencyId" = (SELECT id FROM "Agency" WHERE slug = 'vanguard' LIMIT 1) WHERE "agencyId" IS NULL;
