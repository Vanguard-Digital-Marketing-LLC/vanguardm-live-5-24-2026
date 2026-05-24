-- Link Conversation to Client so admins can hold per-client AI chats.

ALTER TABLE "Conversation" ADD COLUMN "clientId" TEXT;

ALTER TABLE "Conversation"
  ADD CONSTRAINT "Conversation_clientId_fkey"
  FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE INDEX "Conversation_clientId_idx" ON "Conversation"("clientId");
