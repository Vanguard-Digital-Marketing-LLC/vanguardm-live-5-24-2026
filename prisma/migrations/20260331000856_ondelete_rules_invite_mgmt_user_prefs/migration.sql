-- DropForeignKey
ALTER TABLE "BlogPost" DROP CONSTRAINT "BlogPost_authorId_fkey";

-- DropForeignKey
ALTER TABLE "ClientMessage" DROP CONSTRAINT "ClientMessage_userId_fkey";

-- DropForeignKey
ALTER TABLE "ClientMessageRead" DROP CONSTRAINT "ClientMessageRead_userId_fkey";

-- DropForeignKey
ALTER TABLE "ClientNote" DROP CONSTRAINT "ClientNote_userId_fkey";

-- DropForeignKey
ALTER TABLE "ClientOnboarding" DROP CONSTRAINT "ClientOnboarding_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Conversation" DROP CONSTRAINT "Conversation_userId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_userId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_createdById_fkey";

-- DropForeignKey
ALTER TABLE "TaskComment" DROP CONSTRAINT "TaskComment_userId_fkey";

-- DropForeignKey
ALTER TABLE "TeamInvite" DROP CONSTRAINT "TeamInvite_invitedById_fkey";

-- DropIndex
DROP INDEX "ClientInvite_token_idx";

-- AlterTable
ALTER TABLE "ClientInvite" ADD COLUMN     "acceptedAt" TIMESTAMP(3),
ADD COLUMN     "revokedAt" TIMESTAMP(3),
ALTER COLUMN "token" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "emailOnApprovalRequest" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "emailOnNewMessage" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "emailOnNewReport" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "emailOnTicketUpdate" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "portalOnboarded" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "ClientInvite_email_idx" ON "ClientInvite"("email");

-- AddForeignKey
ALTER TABLE "TeamInvite" ADD CONSTRAINT "TeamInvite_invitedById_fkey" FOREIGN KEY ("invitedById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskComment" ADD CONSTRAINT "TaskComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientNote" ADD CONSTRAINT "ClientNote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientOnboarding" ADD CONSTRAINT "ClientOnboarding_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogPost" ADD CONSTRAINT "BlogPost_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientMessage" ADD CONSTRAINT "ClientMessage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientMessageRead" ADD CONSTRAINT "ClientMessageRead_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;


-- DropForeignKey (SetNull changes)
ALTER TABLE "Task" DROP CONSTRAINT IF EXISTS "Task_clientId_fkey";
ALTER TABLE "Task" DROP CONSTRAINT IF EXISTS "Task_projectId_fkey";
ALTER TABLE "Task" DROP CONSTRAINT IF EXISTS "Task_assigneeId_fkey";
ALTER TABLE "SupportTicket" DROP CONSTRAINT IF EXISTS "SupportTicket_assigneeId_fkey";
ALTER TABLE "Lead" DROP CONSTRAINT IF EXISTS "Lead_assignedToId_fkey";
ALTER TABLE "Lead" DROP CONSTRAINT IF EXISTS "Lead_clientId_fkey";
ALTER TABLE "MultiStepFormResponse" DROP CONSTRAINT IF EXISTS "MultiStepFormResponse_leadId_fkey";
ALTER TABLE "ChatSession" DROP CONSTRAINT IF EXISTS "ChatSession_leadId_fkey";

-- AddForeignKey (SetNull)
ALTER TABLE "Task" ADD CONSTRAINT "Task_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Task" ADD CONSTRAINT "Task_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Task" ADD CONSTRAINT "Task_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "SupportTicket" ADD CONSTRAINT "SupportTicket_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "MultiStepFormResponse" ADD CONSTRAINT "MultiStepFormResponse_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "ChatSession" ADD CONSTRAINT "ChatSession_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Data migration: Set portalOnboarded=true for existing CLIENT users
UPDATE "User" SET "portalOnboarded" = true WHERE "role" = 'CLIENT';
