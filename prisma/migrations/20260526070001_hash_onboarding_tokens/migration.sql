-- One-time migration: hash any in-flight plaintext onboarding tokens so the
-- new lookup-by-hash code path in lib/onboarding-auth.ts can still find them.
-- Tokens already >= 64 chars are assumed to be SHA-256 hex (or freshly issued
-- 64-hex pairs from generateOnboardingTokenPair) and are left alone, which
-- makes this migration idempotent on re-run.
--
-- pgcrypto provides `digest`; install it conditionally so the migration is
-- safe to apply on a fresh database that doesn't already have the extension.
CREATE EXTENSION IF NOT EXISTS pgcrypto;

UPDATE "ClientOnboarding"
SET "token" = encode(digest("token", 'sha256'), 'hex')
WHERE "token" IS NOT NULL AND length("token") < 64;
