-- Vanguard Digital Marketing — Database Schema
-- Run this on your VPS PostgreSQL as the vanguard_app user:
--   psql -U vanguard_app -d vanguardm_vanguard_app -f prisma/init-database.sql

-- CreateTable
CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "password" TEXT,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "ContactSubmission" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "company" TEXT,
    "service" TEXT,
    "message" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContactSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "CoursePurchase" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "courseSlug" TEXT NOT NULL,
    "stripeSessionId" TEXT,
    "stripePaymentId" TEXT,
    "stripePriceId" TEXT,
    "amount" INTEGER NOT NULL,
    "purchasedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CoursePurchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "QuizAttempt" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "courseSlug" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "totalQuestions" INTEGER NOT NULL,
    "passed" BOOLEAN NOT NULL,
    "answers" JSONB NOT NULL,
    "attemptedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuizAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "Certificate" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "courseSlug" TEXT NOT NULL,
    "quizAttemptId" TEXT NOT NULL,
    "certificateNumber" TEXT NOT NULL,
    "issuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Certificate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX IF NOT EXISTS "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");
CREATE UNIQUE INDEX IF NOT EXISTS "Session_sessionToken_key" ON "Session"("sessionToken");
CREATE UNIQUE INDEX IF NOT EXISTS "VerificationToken_token_key" ON "VerificationToken"("token");
CREATE UNIQUE INDEX IF NOT EXISTS "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");
CREATE UNIQUE INDEX IF NOT EXISTS "CoursePurchase_stripeSessionId_key" ON "CoursePurchase"("stripeSessionId");
CREATE INDEX IF NOT EXISTS "CoursePurchase_userId_idx" ON "CoursePurchase"("userId");
CREATE INDEX IF NOT EXISTS "CoursePurchase_courseSlug_idx" ON "CoursePurchase"("courseSlug");
CREATE UNIQUE INDEX IF NOT EXISTS "CoursePurchase_userId_courseSlug_key" ON "CoursePurchase"("userId", "courseSlug");
CREATE INDEX IF NOT EXISTS "QuizAttempt_userId_idx" ON "QuizAttempt"("userId");
CREATE INDEX IF NOT EXISTS "QuizAttempt_userId_courseSlug_idx" ON "QuizAttempt"("userId", "courseSlug");
CREATE UNIQUE INDEX IF NOT EXISTS "Certificate_quizAttemptId_key" ON "Certificate"("quizAttemptId");
CREATE UNIQUE INDEX IF NOT EXISTS "Certificate_certificateNumber_key" ON "Certificate"("certificateNumber");
CREATE INDEX IF NOT EXISTS "Certificate_certificateNumber_idx" ON "Certificate"("certificateNumber");
CREATE UNIQUE INDEX IF NOT EXISTS "Certificate_userId_courseSlug_key" ON "Certificate"("userId", "courseSlug");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "CoursePurchase" ADD CONSTRAINT "CoursePurchase_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "QuizAttempt" ADD CONSTRAINT "QuizAttempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_quizAttemptId_fkey" FOREIGN KEY ("quizAttemptId") REFERENCES "QuizAttempt"("id") ON DELETE CASCADE ON UPDATE CASCADE;
