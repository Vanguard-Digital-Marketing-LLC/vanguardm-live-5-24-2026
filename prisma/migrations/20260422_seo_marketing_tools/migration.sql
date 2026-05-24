-- CreateEnum
CREATE TYPE "KeywordIntent" AS ENUM ('INFORMATIONAL', 'COMMERCIAL', 'TRANSACTIONAL', 'NAVIGATIONAL');

-- CreateEnum
CREATE TYPE "SocialPlatform" AS ENUM ('TWITTER', 'LINKEDIN', 'FACEBOOK', 'INSTAGRAM');

-- CreateEnum
CREATE TYPE "SocialPostStatus" AS ENUM ('DRAFT', 'SCHEDULED', 'PUBLISHED', 'FAILED');

-- CreateTable
CREATE TABLE "KeywordProject" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "clientId" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "agencyId" TEXT NOT NULL,

    CONSTRAINT "KeywordProject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Keyword" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "term" TEXT NOT NULL,
    "volume" INTEGER,
    "difficulty" INTEGER,
    "cps" DOUBLE PRECISION,
    "trafficPotential" INTEGER,
    "globalVolume" INTEGER,
    "parentTopic" TEXT,
    "serpFeatures" TEXT[],
    "intent" "KeywordIntent",
    "position" INTEGER,
    "url" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Keyword_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContentProject" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "clientId" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "agencyId" TEXT NOT NULL,

    CONSTRAINT "ContentProject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContentEntry" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "organicTraffic" INTEGER,
    "trafficValue" DOUBLE PRECISION,
    "referringDomains" INTEGER,
    "domainRating" INTEGER,
    "wordCount" INTEGER,
    "publishedAt" TIMESTAMP(3),
    "status" TEXT DEFAULT 'live',
    "contentType" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContentEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SocialPost" (
    "id" TEXT NOT NULL,
    "platform" "SocialPlatform" NOT NULL,
    "content" TEXT NOT NULL,
    "mediaUrls" TEXT[],
    "hashtags" TEXT[],
    "scheduledAt" TIMESTAMP(3),
    "publishedAt" TIMESTAMP(3),
    "status" "SocialPostStatus" NOT NULL DEFAULT 'DRAFT',
    "metrics" JSONB,
    "clientId" TEXT,
    "createdById" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "agencyId" TEXT NOT NULL,

    CONSTRAINT "SocialPost_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "KeywordProject_agencyId_idx" ON "KeywordProject"("agencyId");
CREATE INDEX "KeywordProject_clientId_idx" ON "KeywordProject"("clientId");

CREATE INDEX "Keyword_projectId_idx" ON "Keyword"("projectId");
CREATE INDEX "Keyword_term_idx" ON "Keyword"("term");

CREATE INDEX "ContentProject_agencyId_idx" ON "ContentProject"("agencyId");
CREATE INDEX "ContentProject_clientId_idx" ON "ContentProject"("clientId");

CREATE INDEX "ContentEntry_projectId_idx" ON "ContentEntry"("projectId");
CREATE INDEX "ContentEntry_url_idx" ON "ContentEntry"("url");

CREATE INDEX "SocialPost_agencyId_idx" ON "SocialPost"("agencyId");
CREATE INDEX "SocialPost_clientId_idx" ON "SocialPost"("clientId");
CREATE INDEX "SocialPost_platform_idx" ON "SocialPost"("platform");
CREATE INDEX "SocialPost_status_idx" ON "SocialPost"("status");
CREATE INDEX "SocialPost_scheduledAt_idx" ON "SocialPost"("scheduledAt");

-- AddForeignKey
ALTER TABLE "KeywordProject" ADD CONSTRAINT "KeywordProject_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "KeywordProject" ADD CONSTRAINT "KeywordProject_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "Keyword" ADD CONSTRAINT "Keyword_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "KeywordProject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "ContentProject" ADD CONSTRAINT "ContentProject_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "ContentProject" ADD CONSTRAINT "ContentProject_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "ContentEntry" ADD CONSTRAINT "ContentEntry_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "ContentProject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "SocialPost" ADD CONSTRAINT "SocialPost_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "SocialPost" ADD CONSTRAINT "SocialPost_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "SocialPost" ADD CONSTRAINT "SocialPost_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE CASCADE ON UPDATE CASCADE;
