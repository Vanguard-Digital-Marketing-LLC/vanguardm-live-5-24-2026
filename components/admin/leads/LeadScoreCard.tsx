"use client";

/* ──────────────────────────────────────────────
   LeadScoreCard — Shows score circle with
   temperature color, score breakdown, and
   contact info for a lead.
   ────────────────────────────────────────────── */

interface Lead {
  id: string;
  name: string;
  email: string;
  score: number;
  scoreBreakdown: Record<string, number> | null;
}

const TEMP_COLORS: Record<string, string> = {
  cold: "#60a5fa",
  warm: "#fbbf24",
  hot: "#f97316",
  very_hot: "#ef4444",
};

const TEMP_LABELS: Record<string, string> = {
  cold: "Cold",
  warm: "Warm",
  hot: "Hot",
  very_hot: "Very Hot",
};

const SIGNAL_LABELS: Record<string, string> = {
  contact_form_submitted: "Contact Form",
  multi_step_form_completed: "Multi-Step Form",
  company_provided: "Company Provided",
  phone_provided: "Phone Provided",
  services_page_viewed: "Services Page Viewed",
  pricing_page_viewed: "Pricing Page Viewed",
  chatbot_conversation: "Chatbot Conversation",
  blog_post_read: "Blog Post Read",
  return_visit: "Return Visit",
  viewed_3_plus_pages: "Viewed 3+ Pages",
};

function getTemperature(score: number): string {
  if (score >= 41) return "very_hot";
  if (score >= 26) return "hot";
  if (score >= 11) return "warm";
  return "cold";
}

export default function LeadScoreCard({ lead }: { lead: Lead }) {
  const temp = getTemperature(lead.score);
  const color = TEMP_COLORS[temp];
  const label = TEMP_LABELS[temp];
  const breakdown = lead.scoreBreakdown || {};

  // SVG circle parameters
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const maxScore = 65; // theoretical max from all signals
  const percentage = Math.min(lead.score / maxScore, 1);
  const strokeDashoffset = circumference * (1 - percentage);

  return (
    <div className="space-y-4">
      {/* Score circle */}
      <div className="flex items-center gap-5">
        <div className="relative w-24 h-24 flex-shrink-0">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="8"
            />
            {/* Score arc */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke={color}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-500"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-white">{lead.score}</span>
            <span className="text-[10px] uppercase tracking-wider" style={{ color }}>
              {label}
            </span>
          </div>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold text-white">
            {lead.name}
          </h3>
          <p className="text-sm text-slate-400">{lead.email}</p>
        </div>
      </div>

      {/* Score breakdown */}
      {Object.keys(breakdown).length > 0 && (
        <div>
          <h4 className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-2">
            Score Breakdown
          </h4>
          <div className="space-y-1.5">
            {Object.entries(breakdown)
              .sort(([, a], [, b]) => b - a)
              .map(([signal, points]) => (
                <div
                  key={signal}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-slate-300">
                    {SIGNAL_LABELS[signal] || signal.replace(/_/g, " ")}
                  </span>
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded"
                    style={{
                      color,
                      backgroundColor: `${color}15`,
                    }}
                  >
                    +{points}
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
