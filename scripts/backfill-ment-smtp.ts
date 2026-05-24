/**
 * One-time script to backfill MENT Services agency with its SMTP config.
 * Run from project root: npx tsx scripts/backfill-ment-smtp.ts
 */
import { createCipheriv, randomBytes } from "crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12;
const AUTH_TAG_LENGTH = 16;

function encryptSecret(plaintext: string): string {
  const hex = process.env.ENCRYPTION_KEY;
  if (!hex || hex.length !== 64) throw new Error("ENCRYPTION_KEY must be 64 hex chars");
  const key = Buffer.from(hex, "hex");
  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv(ALGORITHM, key, iv, { authTagLength: AUTH_TAG_LENGTH });
  const encrypted = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  const authTag = cipher.getAuthTag();
  return [iv.toString("base64"), authTag.toString("base64"), encrypted.toString("base64")].join(":");
}

async function main() {
  const { Client } = await import("pg");

  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();

  const host = process.env.MENT_SMTP_HOST;
  const port = process.env.MENT_SMTP_PORT || "465";
  const user = process.env.MENT_SMTP_USER;
  const pass = process.env.MENT_SMTP_PASS;
  const fromEmail = (process.env.MENT_FROM_EMAIL || "").replace(/"/g, "");

  if (!host || !user || !pass) {
    console.error("Missing MENT_SMTP_* env vars");
    process.exit(1);
  }

  const result = await client.query(
    `UPDATE "Agency" SET "smtpHostEnc" = $1, "smtpPortEnc" = $2, "smtpUserEnc" = $3, "smtpPassEnc" = $4, "fromEmail" = $5 WHERE slug = 'mentservices' RETURNING id, "fromEmail"`,
    [encryptSecret(host), encryptSecret(port), encryptSecret(user), encryptSecret(pass), fromEmail || null]
  );

  console.log(`Updated ${result.rowCount} row(s)`);
  if (result.rows[0]) console.log("Verification:", result.rows[0]);

  await client.end();
}

main().catch(console.error);
