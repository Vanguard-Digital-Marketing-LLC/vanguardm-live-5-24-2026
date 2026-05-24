-- CreateEnum
CREATE TYPE "PlanTier" AS ENUM ('STARTER', 'PRO', 'ENTERPRISE');
CREATE TYPE "SubStatus" AS ENUM ('TRIALING', 'ACTIVE', 'PAST_DUE', 'CANCELED', 'UNPAID');

-- CreateTable: Agency
CREATE TABLE "Agency" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "logoUrl" TEXT,
    "primaryColor" TEXT DEFAULT '#10b981',
    "accentColor" TEXT DEFAULT '#f59e0b',
    "stripeCustomerId" TEXT,
    "subscriptionId" TEXT,
    "subscriptionStatus" "SubStatus" NOT NULL DEFAULT 'TRIALING',
    "planTier" "PlanTier" NOT NULL DEFAULT 'STARTER',
    "currentPeriodEnd" TIMESTAMP(3),
    "maxClients" INTEGER NOT NULL DEFAULT 5,
    "ownerUserId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Agency_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Agency_slug_key" ON "Agency"("slug");
CREATE UNIQUE INDEX "Agency_stripeCustomerId_key" ON "Agency"("stripeCustomerId");
CREATE UNIQUE INDEX "Agency_subscriptionId_key" ON "Agency"("subscriptionId");
CREATE INDEX "Agency_slug_idx" ON "Agency"("slug");

-- Step 1: Seed the default "vanguard" agency
INSERT INTO "Agency" ("id", "name", "slug", "planTier", "subscriptionStatus", "maxClients", "createdAt", "updatedAt")
VALUES ('vanguard-seed', 'Vanguard Digital', 'vanguard', 'ENTERPRISE', 'ACTIVE', 999, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Step 2: Add nullable agencyId columns to all 15 models
ALTER TABLE "User" ADD COLUMN "agencyId" TEXT;
ALTER TABLE "Client" ADD COLUMN "agencyId" TEXT;
ALTER TABLE "Task" ADD COLUMN "agencyId" TEXT;
ALTER TABLE "Lead" ADD COLUMN "agencyId" TEXT;
ALTER TABLE "BlogPost" ADD COLUMN "agencyId" TEXT;
ALTER TABLE "Notification" ADD COLUMN "agencyId" TEXT;
ALTER TABLE "TeamInvite" ADD COLUMN "agencyId" TEXT;
ALTER TABLE "SupportTicket" ADD COLUMN "agencyId" TEXT;
ALTER TABLE "Project" ADD COLUMN "agencyId" TEXT;
ALTER TABLE "Approval" ADD COLUMN "agencyId" TEXT;
ALTER TABLE "ClientOnboarding" ADD COLUMN "agencyId" TEXT;
ALTER TABLE "MultiStepForm" ADD COLUMN "agencyId" TEXT;
ALTER TABLE "ContactSubmission" ADD COLUMN "agencyId" TEXT;
ALTER TABLE "Conversation" ADD COLUMN "agencyId" TEXT;

-- Step 3: Backfill all existing rows with the vanguard agency
UPDATE "User" SET "agencyId" = 'vanguard-seed' WHERE "agencyId" IS NULL;
UPDATE "Client" SET "agencyId" = 'vanguard-seed' WHERE "agencyId" IS NULL;
UPDATE "Task" SET "agencyId" = 'vanguard-seed' WHERE "agencyId" IS NULL;
UPDATE "Lead" SET "agencyId" = 'vanguard-seed' WHERE "agencyId" IS NULL;
UPDATE "BlogPost" SET "agencyId" = 'vanguard-seed' WHERE "agencyId" IS NULL;
UPDATE "Notification" SET "agencyId" = 'vanguard-seed' WHERE "agencyId" IS NULL;
UPDATE "TeamInvite" SET "agencyId" = 'vanguard-seed' WHERE "agencyId" IS NULL;
UPDATE "SupportTicket" SET "agencyId" = 'vanguard-seed' WHERE "agencyId" IS NULL;
UPDATE "Project" SET "agencyId" = 'vanguard-seed' WHERE "agencyId" IS NULL;
UPDATE "Approval" SET "agencyId" = 'vanguard-seed' WHERE "agencyId" IS NULL;
UPDATE "ClientOnboarding" SET "agencyId" = 'vanguard-seed' WHERE "agencyId" IS NULL;
UPDATE "MultiStepForm" SET "agencyId" = 'vanguard-seed' WHERE "agencyId" IS NULL;
UPDATE "ContactSubmission" SET "agencyId" = 'vanguard-seed' WHERE "agencyId" IS NULL;
UPDATE "Conversation" SET "agencyId" = 'vanguard-seed' WHERE "agencyId" IS NULL;

-- Step 4: Set NOT NULL on required columns (User, BlogPost, ContactSubmission stay nullable)
ALTER TABLE "Client" ALTER COLUMN "agencyId" SET NOT NULL;
ALTER TABLE "Task" ALTER COLUMN "agencyId" SET NOT NULL;
ALTER TABLE "Lead" ALTER COLUMN "agencyId" SET NOT NULL;
ALTER TABLE "Notification" ALTER COLUMN "agencyId" SET NOT NULL;
ALTER TABLE "TeamInvite" ALTER COLUMN "agencyId" SET NOT NULL;
ALTER TABLE "SupportTicket" ALTER COLUMN "agencyId" SET NOT NULL;
ALTER TABLE "Project" ALTER COLUMN "agencyId" SET NOT NULL;
ALTER TABLE "Approval" ALTER COLUMN "agencyId" SET NOT NULL;
ALTER TABLE "ClientOnboarding" ALTER COLUMN "agencyId" SET NOT NULL;
ALTER TABLE "MultiStepForm" ALTER COLUMN "agencyId" SET NOT NULL;
ALTER TABLE "Conversation" ALTER COLUMN "agencyId" SET NOT NULL;

-- Step 5: Add FK constraints
ALTER TABLE "User" ADD CONSTRAINT "User_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Client" ADD CONSTRAINT "Client_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Task" ADD CONSTRAINT "Task_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "BlogPost" ADD CONSTRAINT "BlogPost_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "TeamInvite" ADD CONSTRAINT "TeamInvite_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "SupportTicket" ADD CONSTRAINT "SupportTicket_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Project" ADD CONSTRAINT "Project_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Approval" ADD CONSTRAINT "Approval_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ClientOnboarding" ADD CONSTRAINT "ClientOnboarding_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "MultiStepForm" ADD CONSTRAINT "MultiStepForm_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ContactSubmission" ADD CONSTRAINT "ContactSubmission_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Step 6: Add indexes
CREATE INDEX "User_agencyId_idx" ON "User"("agencyId");
CREATE INDEX "Client_agencyId_idx" ON "Client"("agencyId");
CREATE INDEX "Task_agencyId_idx" ON "Task"("agencyId");
CREATE INDEX "Lead_agencyId_idx" ON "Lead"("agencyId");
CREATE INDEX "BlogPost_agencyId_idx" ON "BlogPost"("agencyId");
CREATE INDEX "Notification_agencyId_idx" ON "Notification"("agencyId");
CREATE INDEX "TeamInvite_agencyId_idx" ON "TeamInvite"("agencyId");
CREATE INDEX "SupportTicket_agencyId_idx" ON "SupportTicket"("agencyId");
CREATE INDEX "Project_agencyId_idx" ON "Project"("agencyId");
CREATE INDEX "Approval_agencyId_idx" ON "Approval"("agencyId");
CREATE INDEX "ClientOnboarding_agencyId_idx" ON "ClientOnboarding"("agencyId");
CREATE INDEX "MultiStepForm_agencyId_idx" ON "MultiStepForm"("agencyId");
CREATE INDEX "ContactSubmission_agencyId_idx" ON "ContactSubmission"("agencyId");
CREATE INDEX "Conversation_agencyId_idx" ON "Conversation"("agencyId");

-- Step 7: Change Client unique constraint from (name) to (name, agencyId)
ALTER TABLE "Client" DROP CONSTRAINT IF EXISTS "Client_name_key";
CREATE UNIQUE INDEX "Client_name_agencyId_key" ON "Client"("name", "agencyId");
