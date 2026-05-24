-- Track processed Stripe webhook events for idempotency.
-- Stripe re-delivers events on timeout; without this guard, duplicate
-- events caused duplicate subscription updates / payment records.

CREATE TABLE "ProcessedStripeEvent" (
  "id"          TEXT        NOT NULL,
  "type"        TEXT        NOT NULL,
  "processedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ProcessedStripeEvent_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "ProcessedStripeEvent_processedAt_idx" ON "ProcessedStripeEvent"("processedAt");
