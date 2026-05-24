-- Drop old keyword tables (no production data)
DROP TABLE IF EXISTS "Keyword" CASCADE;
DROP TABLE IF EXISTS "KeywordProject" CASCADE;

-- CreateEnum
CREATE TYPE "KeywordSource" AS ENUM ('MANUAL', 'GOOGLE_ADS', 'AUTOCOMPLETE', 'CSV_IMPORT', 'AHREFS_IMPORT');

-- CreateTable: Keyword (seed database, unique per term+agency)
CREATE TABLE "Keyword" (
    "id" TEXT NOT NULL,
    "term" TEXT NOT NULL,
    "volume" INTEGER,
    "difficulty" INTEGER,
    "cps" DOUBLE PRECISION,
    "trafficPotential" INTEGER,
    "globalVolume" INTEGER,
    "parentTopic" TEXT,
    "serpFeatures" TEXT[],
    "intent" "KeywordIntent",
    "source" "KeywordSource" NOT NULL DEFAULT 'MANUAL',
    "tags" TEXT[],
    "notes" TEXT,
    "lastMetricsUpdate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "agencyId" TEXT NOT NULL,

    CONSTRAINT "Keyword_pkey" PRIMARY KEY ("id")
);

-- CreateTable: KeywordList (collections/folders)
CREATE TABLE "KeywordList" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "clientId" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "agencyId" TEXT NOT NULL,

    CONSTRAINT "KeywordList_pkey" PRIMARY KEY ("id")
);

-- CreateTable: KeywordListEntry (many-to-many join)
CREATE TABLE "KeywordListEntry" (
    "keywordId" TEXT NOT NULL,
    "listId" TEXT NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "KeywordListEntry_pkey" PRIMARY KEY ("keywordId","listId")
);

-- CreateTable: SerpSnapshot (batch scrape event)
CREATE TABLE "SerpSnapshot" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "source" TEXT NOT NULL DEFAULT 'manual',
    "keywordCount" INTEGER NOT NULL DEFAULT 0,
    "resultCount" INTEGER NOT NULL DEFAULT 0,
    "scrapedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "agencyId" TEXT NOT NULL,

    CONSTRAINT "SerpSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable: SerpResult (individual SERP position)
CREATE TABLE "SerpResult" (
    "id" TEXT NOT NULL,
    "snapshotId" TEXT NOT NULL,
    "keywordId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SerpResult_pkey" PRIMARY KEY ("id")
);

-- Unique constraint: one keyword per term per agency
CREATE UNIQUE INDEX "Keyword_term_agencyId_key" ON "Keyword"("term", "agencyId");

-- Indexes: Keyword
CREATE INDEX "Keyword_agencyId_idx" ON "Keyword"("agencyId");
CREATE INDEX "Keyword_term_idx" ON "Keyword"("term");
CREATE INDEX "Keyword_volume_idx" ON "Keyword"("volume");
CREATE INDEX "Keyword_difficulty_idx" ON "Keyword"("difficulty");

-- Indexes: KeywordList
CREATE INDEX "KeywordList_agencyId_idx" ON "KeywordList"("agencyId");
CREATE INDEX "KeywordList_clientId_idx" ON "KeywordList"("clientId");

-- Indexes: KeywordListEntry
CREATE INDEX "KeywordListEntry_listId_idx" ON "KeywordListEntry"("listId");

-- Indexes: SerpSnapshot
CREATE INDEX "SerpSnapshot_agencyId_idx" ON "SerpSnapshot"("agencyId");
CREATE INDEX "SerpSnapshot_scrapedAt_idx" ON "SerpSnapshot"("scrapedAt");

-- Indexes: SerpResult
CREATE INDEX "SerpResult_snapshotId_idx" ON "SerpResult"("snapshotId");
CREATE INDEX "SerpResult_keywordId_idx" ON "SerpResult"("keywordId");
CREATE INDEX "SerpResult_domain_idx" ON "SerpResult"("domain");
CREATE INDEX "SerpResult_url_idx" ON "SerpResult"("url");
CREATE INDEX "SerpResult_position_idx" ON "SerpResult"("position");

-- ForeignKeys: Keyword
ALTER TABLE "Keyword" ADD CONSTRAINT "Keyword_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ForeignKeys: KeywordList
ALTER TABLE "KeywordList" ADD CONSTRAINT "KeywordList_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "KeywordList" ADD CONSTRAINT "KeywordList_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ForeignKeys: KeywordListEntry
ALTER TABLE "KeywordListEntry" ADD CONSTRAINT "KeywordListEntry_keywordId_fkey" FOREIGN KEY ("keywordId") REFERENCES "Keyword"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "KeywordListEntry" ADD CONSTRAINT "KeywordListEntry_listId_fkey" FOREIGN KEY ("listId") REFERENCES "KeywordList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ForeignKeys: SerpSnapshot
ALTER TABLE "SerpSnapshot" ADD CONSTRAINT "SerpSnapshot_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ForeignKeys: SerpResult
ALTER TABLE "SerpResult" ADD CONSTRAINT "SerpResult_snapshotId_fkey" FOREIGN KEY ("snapshotId") REFERENCES "SerpSnapshot"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "SerpResult" ADD CONSTRAINT "SerpResult_keywordId_fkey" FOREIGN KEY ("keywordId") REFERENCES "Keyword"("id") ON DELETE CASCADE ON UPDATE CASCADE;
