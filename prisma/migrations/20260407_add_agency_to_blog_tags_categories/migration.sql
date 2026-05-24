-- AlterTable: Add agencyId to BlogTag
ALTER TABLE "BlogTag" ADD COLUMN "agencyId" TEXT;

-- AlterTable: Add agencyId to BlogCategory  
ALTER TABLE "BlogCategory" ADD COLUMN "agencyId" TEXT;

-- DropIndex: Remove global uniqueness
DROP INDEX "BlogTag_name_key";
DROP INDEX "BlogTag_slug_key";
DROP INDEX "BlogCategory_name_key";
DROP INDEX "BlogCategory_slug_key";

-- CreateIndex: Agency-scoped indexes
CREATE INDEX "BlogTag_agencyId_idx" ON "BlogTag"("agencyId");
CREATE INDEX "BlogCategory_agencyId_idx" ON "BlogCategory"("agencyId");
CREATE UNIQUE INDEX "BlogTag_slug_agencyId_key" ON "BlogTag"("slug", "agencyId");
CREATE UNIQUE INDEX "BlogCategory_slug_agencyId_key" ON "BlogCategory"("slug", "agencyId");

-- AddForeignKey
ALTER TABLE "BlogTag" ADD CONSTRAINT "BlogTag_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "BlogCategory" ADD CONSTRAINT "BlogCategory_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE SET NULL ON UPDATE CASCADE;
