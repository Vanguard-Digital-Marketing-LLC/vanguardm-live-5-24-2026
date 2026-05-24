-- Add agency / client scoping + run kind + triggering user to AgentRun

ALTER TABLE "AgentRun"
  ADD COLUMN "agencyId" TEXT,
  ADD COLUMN "clientId" TEXT,
  ADD COLUMN "kind" TEXT,
  ADD COLUMN "triggeredBy" TEXT;

ALTER TABLE "AgentRun"
  ADD CONSTRAINT "AgentRun_agencyId_fkey"
  FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "AgentRun"
  ADD CONSTRAINT "AgentRun_clientId_fkey"
  FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE SET NULL ON UPDATE CASCADE;

CREATE INDEX "AgentRun_agencyId_idx" ON "AgentRun"("agencyId");
CREATE INDEX "AgentRun_clientId_idx" ON "AgentRun"("clientId");

-- Backfill agencyId / clientId for existing rows from their parent ticket / task.
UPDATE "AgentRun" ar
   SET "agencyId" = t."agencyId",
       "clientId" = t."clientId"
  FROM "SupportTicket" t
 WHERE t."id" = ar."ticketId";

UPDATE "AgentRun" ar
   SET "agencyId" = tk."agencyId",
       "clientId" = tk."clientId"
  FROM "Task" tk
 WHERE tk."id" = ar."taskId" AND ar."agencyId" IS NULL;

-- Tag legacy rows with their kind.
UPDATE "AgentRun" SET "kind" = 'ticket-fix' WHERE "kind" IS NULL AND "ticketId" IS NOT NULL;
UPDATE "AgentRun" SET "kind" = 'task-fix'   WHERE "kind" IS NULL AND "taskId"   IS NOT NULL;
