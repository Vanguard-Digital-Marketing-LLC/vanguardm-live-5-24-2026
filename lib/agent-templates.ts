/**
 * Lightweight content-agent templates. These run via a direct Anthropic SDK
 * call (no sandboxed file/bash tools) — they produce text only, persisted
 * onto an AgentRun row.
 *
 * Distinct from lib/agent-executor.ts which targets a client's deployed site
 * with bash + file edits.
 */

export type TemplateKey = "brief-writer" | "serp-analyst" | "content-drafter";

export type TemplateInput = {
  topic: string;
  notes?: string;
  // Optional client context filled in by the caller from Prisma.
  client?: { name: string; domain: string | null } | null;
};

export type Template = {
  key: TemplateKey;
  label: string;
  description: string;
  inputs: { topic: { label: string; placeholder: string }; notes: { label: string; placeholder: string } };
  buildSystem: () => string;
  buildUser: (input: TemplateInput) => string;
};

const clientContext = (input: TemplateInput) => {
  if (!input.client) return "Working without a specific client context.";
  const parts = [
    `Client: ${input.client.name}`,
    input.client.domain ? `Site: ${input.client.domain}` : null,
  ].filter(Boolean);
  return parts.join("\n");
};

export const TEMPLATES: Record<TemplateKey, Template> = {
  "brief-writer": {
    key: "brief-writer",
    label: "Brief writer",
    description:
      "One-page creative brief for a new piece of content (blog, ad, landing page).",
    inputs: {
      topic: {
        label: "Topic / asset",
        placeholder: "e.g. Long-form blog: 'How to compare home painters'",
      },
      notes: {
        label: "Constraints, audience, goals",
        placeholder: "Target audience, tone, must-include points, deadline…",
      },
    },
    buildSystem: () =>
      `You are a senior content strategist at a digital marketing agency.
Produce a creative brief in markdown with these sections, in order:
1. **Audience** — who is this for, primary pain points
2. **Promise** — single sentence: what the asset will help the reader do
3. **Key messages** — 3–5 bullets, ordered by importance
4. **Proof / examples** — concrete data, quotes, or examples to weave in
5. **Tone & voice** — adjectives + 1-line example
6. **Outline** — h2/h3 structure if longform; or hook/body/CTA if short
7. **Success metric** — what the asset has to move
Be concrete and opinionated. No filler.`,
    buildUser: (input) =>
      `${clientContext(input)}\n\nTopic / asset:\n${input.topic}\n\nConstraints / notes:\n${input.notes || "(none)"}\n\nWrite the brief.`,
  },

  "serp-analyst": {
    key: "serp-analyst",
    label: "SERP analyst",
    description:
      "Analyse the search-intent landscape for a target query and recommend an angle.",
    inputs: {
      topic: { label: "Target query", placeholder: "e.g. 'best CRM for solo consultants'" },
      notes: {
        label: "Additional context (optional)",
        placeholder: "Geo, current ranking page, what's already been tried…",
      },
    },
    buildSystem: () =>
      `You are an SEO strategist. Given a target search query, analyse the SERP
landscape from first principles (what *kinds* of pages tend to rank, what user
intent they serve, where the gaps are). Output markdown with:
1. **Dominant intent** — informational / navigational / commercial / transactional, with one-line justification
2. **Page archetypes that win** — typical formats / lengths / sub-topics
3. **Gaps & angles** — 3 specific angles that are under-served
4. **Recommended target page** — one-line spec: format, length, primary angle, hook
5. **Anchor terms / entities to include** — bullet list of 8–15
You don't have live SERP data — reason from training knowledge and explicitly
flag claims that need verification with a tool like Ahrefs or SEMrush.`,
    buildUser: (input) =>
      `${clientContext(input)}\n\nTarget query:\n${input.topic}\n\nContext:\n${input.notes || "(none)"}\n\nAnalyse and recommend.`,
  },

  "content-drafter": {
    key: "content-drafter",
    label: "Content drafter",
    description:
      "First-draft copy: blog post, email, or ad. Tight, punchy, ready to edit.",
    inputs: {
      topic: { label: "What to draft", placeholder: "e.g. 'Email: book a free site audit'" },
      notes: {
        label: "Brief / spec",
        placeholder: "Audience, key points, length, CTA, tone…",
      },
    },
    buildSystem: () =>
      `You are a senior copywriter. Draft the asset described in the user message.
Rules:
- Cut anything a reader would skim. Lead with the most important sentence.
- Concrete > abstract. Specific numbers > vague claims.
- One idea per paragraph; short paragraphs.
- Match the requested format precisely (subject line if email, h2/h3 if blog, etc.)
- End with the requested CTA or, if none specified, a single clear next step.
Return only the draft itself, no preamble or sign-off commentary.`,
    buildUser: (input) =>
      `${clientContext(input)}\n\nAsset:\n${input.topic}\n\nBrief:\n${input.notes || "(use sensible defaults)"}\n\nDraft it now.`,
  },
};

export const TEMPLATE_LIST: Template[] = Object.values(TEMPLATES);
