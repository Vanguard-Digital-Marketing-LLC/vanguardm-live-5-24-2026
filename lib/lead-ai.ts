import Anthropic from "@anthropic-ai/sdk";

/* ──────────────────────────────────────────────
   Lead AI assist (on-demand).
   Generates a fact-based research brief, an intent
   score + reason, and a follow-up email draft from
   the lead's OWN data only (no external enrichment).
   ────────────────────────────────────────────── */

const MODEL = "claude-haiku-4-5-20251001";

export interface LeadAiInput {
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  company?: string | null;
  source?: string | null;
  message?: string | null;
  /** Free-form extra context: form answers, chat excerpts, activity summary. */
  context?: string | null;
}

export interface LeadAiResult {
  researchBrief: string;
  /** 0-100 AI intent assessment (null when flagged). */
  intentScore: number | null;
  reason: string;
  followup: { subject: string; body: string } | null;
  flagged: boolean;
  flagReason?: string;
}

export const LEAD_AI_SYSTEM_PROMPT = [
  "You are a sales assistant for Vanguard Digital Marketing, a full-service digital marketing agency.",
  "You analyze an inbound lead and produce: (1) a short research brief, (2) an intent score, (3) a personalized follow-up email draft.",
  "",
  "HARD RULES:",
  "- NEVER invent facts. Use ONLY the information provided about the lead. If something is unknown, omit it — do not guess company details, size, industry, etc.",
  "- NEVER state pricing, discounts, or commitments in the draft.",
  "- The follow-up email MUST be warm and professional in tone, and MUST end with exactly one clear call-to-action (e.g. book a call or reply).",
  "- If the lead looks like spam, junk, a test, or is too incomplete to act on, set \"flagged\": true, give a short flagReason, and set \"followup\": null and \"intentScore\": null.",
  "",
  "Respond with ONLY a JSON object (no markdown, no prose) of this exact shape:",
  "{",
  '  "researchBrief": string,   // 2-4 sentences, facts only',
  '  "intentScore": number,     // 0-100, higher = more likely to buy',
  '  "reason": string,          // one sentence justifying the score',
  '  "flagged": boolean,',
  '  "flagReason": string,      // "" when not flagged',
  '  "followup": { "subject": string, "body": string } | null',
  "}",
].join("\n");

export function buildLeadAnalysisPrompt(lead: LeadAiInput): string {
  const lines = [
    "Analyze this inbound lead.",
    "",
    `Name: ${lead.name || "(unknown)"}`,
    `Email: ${lead.email || "(unknown)"}`,
    `Phone: ${lead.phone || "(none)"}`,
    `Company: ${lead.company || "(unknown)"}`,
    `Source: ${lead.source || "(unknown)"}`,
    "",
    "Message / what they submitted:",
    lead.message?.trim() || "(none)",
  ];
  if (lead.context?.trim()) {
    lines.push("", "Additional context (form answers / chat / activity):", lead.context.trim());
  }
  return lines.join("\n");
}

/** Defensively parse the model's JSON response into a normalized result. */
export function parseLeadAiResponse(raw: string): LeadAiResult {
  let jsonText = raw.trim();
  // Strip ```json fences if present.
  const fence = jsonText.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fence) jsonText = fence[1].trim();
  // Fall back to the first {...} block.
  if (!jsonText.startsWith("{")) {
    const brace = jsonText.indexOf("{");
    const end = jsonText.lastIndexOf("}");
    if (brace >= 0 && end > brace) jsonText = jsonText.slice(brace, end + 1);
  }

  let data: Record<string, unknown>;
  try {
    data = JSON.parse(jsonText) as Record<string, unknown>;
  } catch {
    throw new Error("AI returned malformed JSON");
  }

  const flagged = data.flagged === true;
  const rawScore = typeof data.intentScore === "number" ? data.intentScore : null;
  const intentScore = flagged || rawScore === null
    ? null
    : Math.max(0, Math.min(100, Math.round(rawScore)));

  const fu = data.followup as { subject?: unknown; body?: unknown } | null | undefined;
  const followup =
    !flagged && fu && typeof fu.subject === "string" && typeof fu.body === "string"
      ? { subject: fu.subject, body: fu.body }
      : null;

  return {
    researchBrief: typeof data.researchBrief === "string" ? data.researchBrief : "",
    intentScore,
    reason: typeof data.reason === "string" ? data.reason : "",
    flagged,
    flagReason: typeof data.flagReason === "string" ? data.flagReason : undefined,
    followup,
  };
}

export async function analyzeLead(lead: LeadAiInput): Promise<LeadAiResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY not configured");

  const anthropic = new Anthropic({ apiKey });
  const msg = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 1500,
    system: LEAD_AI_SYSTEM_PROMPT,
    messages: [{ role: "user", content: buildLeadAnalysisPrompt(lead) }],
  });

  const text = msg.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("");

  return parseLeadAiResponse(text);
}
