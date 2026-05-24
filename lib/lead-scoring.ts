/* ──────────────────────────────────────────────
   Lead Scoring Engine
   Calculates a lead's score based on behavioral
   signals and maps it to a temperature label.
   ────────────────────────────────────────────── */

export const SCORING_RULES = {
  contact_form_submitted: 10,
  multi_step_form_completed: 15,
  company_provided: 5,
  phone_provided: 5,
  services_page_viewed: 3,
  pricing_page_viewed: 5,
  chatbot_conversation: 5,
  blog_post_read: 2,
  return_visit: 5,
  viewed_3_plus_pages: 5,
} as const;

export type ScoreSignal = keyof typeof SCORING_RULES;

/**
 * Calculate a lead's total score from an array of signals.
 * Returns both the total and a per-signal breakdown.
 */
export function calculateLeadScore(signals: ScoreSignal[]): {
  score: number;
  breakdown: Record<string, number>;
} {
  const breakdown: Record<string, number> = {};
  let score = 0;

  for (const signal of signals) {
    const points = SCORING_RULES[signal];
    if (points) {
      breakdown[signal] = (breakdown[signal] || 0) + points;
      score += points;
    }
  }

  return { score, breakdown };
}

/**
 * Map a numeric score to a human-readable temperature.
 * cold (0-10) | warm (11-25) | hot (26-40) | very_hot (41+)
 */
export function getLeadTemperature(
  score: number,
): "cold" | "warm" | "hot" | "very_hot" {
  if (score >= 41) return "very_hot";
  if (score >= 26) return "hot";
  if (score >= 11) return "warm";
  return "cold";
}

/** Tailwind-safe color for each temperature tier. */
export const TEMPERATURE_COLORS: Record<string, string> = {
  cold: "#60a5fa",     // blue-400
  warm: "#fbbf24",     // amber-400
  hot: "#f97316",      // orange-500
  very_hot: "#ef4444", // red-500
};

/** CSS class string for temperature badge backgrounds. */
export const TEMPERATURE_BG_CLASSES: Record<string, string> = {
  cold: "bg-blue-400",
  warm: "bg-amber-400",
  hot: "bg-orange-500",
  very_hot: "bg-red-500",
};

/** Temperature-aware text classes for badges. */
export const TEMPERATURE_TEXT_CLASSES: Record<string, string> = {
  cold: "text-blue-400",
  warm: "text-amber-400",
  hot: "text-orange-500",
  very_hot: "text-red-500",
};

/** Temperature labels for display. */
export const TEMPERATURE_LABELS: Record<string, string> = {
  cold: "Cold",
  warm: "Warm",
  hot: "Hot",
  very_hot: "Very Hot",
};

/**
 * Add an activity to a lead and update the score if the activity
 * type matches a scoring rule. Idempotent per signal type — a
 * signal only scores once.
 */
export async function addLeadActivity(
  prisma: any,
  leadId: string,
  type: string,
  data?: Record<string, unknown>,
) {
  await prisma.leadActivity.create({
    data: { leadId, type, data: data ?? {} },
  });

  // Update score if this activity type has a score value
  const scoreKey = type as ScoreSignal;
  if (SCORING_RULES[scoreKey]) {
    const lead = await prisma.lead.findUnique({ where: { id: leadId } });
    if (lead) {
      const breakdown = (lead.scoreBreakdown as Record<string, number>) ?? {};
      if (!breakdown[type]) {
        breakdown[type] = SCORING_RULES[scoreKey];
        const newScore = Object.values(breakdown).reduce(
          (sum, pts) => sum + pts,
          0,
        );
        await prisma.lead.update({
          where: { id: leadId },
          data: { score: newScore, scoreBreakdown: breakdown },
        });
      }
    }
  }
}
