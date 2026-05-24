import { prisma } from "@/lib/db";
import { resolveSiteConfig } from "@/lib/client-sites";
import { buildAgentPrompt, executeAgent } from "@/lib/agent-executor";
import { notifyTicketCreated, notifyAgentCompleted } from "@/lib/ticket-notifications";

// Re-exports kept for downstream imports — no behavior change.
export { prisma, resolveSiteConfig, buildAgentPrompt, executeAgent, notifyTicketCreated, notifyAgentCompleted };

/**
 * SECURITY-DISABLED 2026-04-25.
 *
 * Direct auto-trigger of the AI coding agent from a ticket-creation event is
 * a known prompt-injection-to-RCE vector: tickets created via the public
 * contact-ticket webhook have a description: field that is verbatim user
 * input. The agent embeds that description into its LLM prompt, and its
 * `bash` tool executes via /usr/local/bin/agent-exec.sh under sudo (NOPASSWD,
 * root). Auto-firing on ticket creation would make this a zero-click chain.
 *
 * Use the admin endpoint POST /api/admin/agent/run instead — it requires
 * authenticated admin (requireAdminAuth("ADMIN")) before invoking the agent,
 * and it scopes ticket lookup to the admin's agencyId.
 *
 * If you intentionally want to re-enable auto-triggering: add a per-ticket
 * source allowlist (e.g. only sources that are admin-curated, never the
 * contact-form webhook) before unwrapping this stub. Bring a security
 * reviewer.
 */
export async function triggerAgentForTicket(_ticketId: string): Promise<void> {
  throw new Error(
    "[SECURITY] triggerAgentForTicket is disabled. " +
    "Use POST /api/admin/agent/run with admin auth instead. " +
    "See lib/ticket-agent.ts header comment for context."
  );
}
