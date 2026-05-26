-- Lead AI assist: on-demand research brief, augmented intent score + reason, follow-up draft.
ALTER TABLE "Lead"
  ADD COLUMN "researchBrief" TEXT,
  ADD COLUMN "aiScore" INTEGER,
  ADD COLUMN "aiScoreReason" TEXT,
  ADD COLUMN "followupSubject" TEXT,
  ADD COLUMN "followupBody" TEXT,
  ADD COLUMN "aiAnalyzedAt" TIMESTAMP(3);
