import type Anthropic from "@anthropic-ai/sdk";
import { loadCapsuleBundle } from "./capsules";

type SystemBlock = Anthropic.TextBlockParam;

export type ClientForPrompt = {
  name: string;
  domain?: string | null;
  monthlyRetainer?: number | null;
  slaResponseHours?: number | null;
  status: string;
  services: { serviceType: string; status: string; monthlyBudget: number | null }[];
  projects: { name: string; status: string }[];
  tasks: { title: string; status: string; priority: string }[];
  supportTickets: { title: string; status: string; priority: string }[];
  clientNotes: { content: string }[];
};

const STATIC_INSTRUCTIONS = `You are an embedded AI assistant for a digital-marketing agency, talking to a senior team member about ONE specific client. Use the context below; reason concretely, propose next actions, draft copy when asked. Be terse — assume the reader is an expert.

Don't restate context unprompted. Ask clarifying questions only if necessary; otherwise just answer.

The capsule reference below describes the agency's product surfaces (portal, admin, AI sidebar), conventions, and gotchas. Treat it as authoritative project knowledge.`;

function clientFactsBlock(client: ClientForPrompt): string {
  const services = client.services.length
    ? client.services
        .map(
          (s) =>
            `${s.serviceType}${s.monthlyBudget ? ` ($${s.monthlyBudget}/mo)` : ""} — ${s.status}`,
        )
        .join(", ")
    : "(none)";
  const projects = client.projects.length
    ? client.projects.map((p) => `${p.name} [${p.status}]`).join(", ")
    : "(none)";

  const lines = [
    "CLIENT",
    `- Name: ${client.name}`,
    client.domain ? `- Site: ${client.domain}` : null,
    client.monthlyRetainer
      ? `- Retainer: $${client.monthlyRetainer.toLocaleString()}/mo`
      : null,
    client.slaResponseHours ? `- Support SLA: ${client.slaResponseHours}h` : null,
    `- Status: ${client.status}`,
    `- Services: ${services}`,
    `- Active projects: ${projects}`,
  ].filter(Boolean);

  return lines.join("\n");
}

function recentActivityBlock(client: ClientForPrompt): string {
  const tasks = client.tasks.length
    ? client.tasks.map((t) => `- ${t.title} [${t.status}/${t.priority}]`).join("\n")
    : "  (none)";
  const tickets = client.supportTickets.length
    ? client.supportTickets.map((t) => `- ${t.title} [${t.status}/${t.priority}]`).join("\n")
    : "  (none)";
  const notes = client.clientNotes.length
    ? client.clientNotes.map((n) => `- ${n.content.slice(0, 200)}`).join("\n")
    : "  (none)";

  return `RECENT TASKS\n${tasks}\n\nRECENT SUPPORT TICKETS\n${tickets}\n\nRECENT NOTES\n${notes}`;
}

export function buildSystemPrompt(client: ClientForPrompt): SystemBlock[] {
  return [
    {
      type: "text",
      text: `${STATIC_INSTRUCTIONS}\n\n=== CAPSULE REFERENCE ===\n\n${loadCapsuleBundle()}`,
      cache_control: { type: "ephemeral" },
    },
    {
      type: "text",
      text: clientFactsBlock(client),
      cache_control: { type: "ephemeral" },
    },
    {
      type: "text",
      text: recentActivityBlock(client),
    },
  ];
}
