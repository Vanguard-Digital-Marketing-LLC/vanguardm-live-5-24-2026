"use client";

/* ──────────────────────────────────────────────
   LeadActivityTimeline — Vertical timeline of
   LeadActivity entries with icons per type.
   ────────────────────────────────────────────── */

interface Activity {
  id: string;
  type: string;
  data: Record<string, string | number | boolean | null> | null;
  createdAt: string;
}

interface ActivityConfig {
  icon: string;
  label: string;
  color: string;
}

const ACTIVITY_TYPES: Record<string, ActivityConfig> = {
  contact_form_submitted: {
    icon: "M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75",
    label: "Contact Form Submitted",
    color: "#10b981",
  },
  multi_step_form_completed: {
    icon: "M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25",
    label: "Multi-Step Form Completed",
    color: "#8b5cf6",
  },
  chatbot_conversation: {
    icon: "M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z",
    label: "Chatbot Conversation",
    color: "#06b6d4",
  },
  page_view: {
    icon: "M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
    label: "Page View",
    color: "#64748b",
  },
  services_page_viewed: {
    icon: "M11.42 15.17l-5.25-3.25a.75.75 0 010-1.28l5.25-3.25a.75.75 0 01.84 0l5.25 3.25a.75.75 0 010 1.28l-5.25 3.25a.75.75 0 01-.84 0z",
    label: "Services Page Viewed",
    color: "#f59e0b",
  },
  pricing_page_viewed: {
    icon: "M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    label: "Pricing Page Viewed",
    color: "#22c55e",
  },
  blog_post_read: {
    icon: "M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25",
    label: "Blog Post Read",
    color: "#a855f7",
  },
  viewed_3_plus_pages: {
    icon: "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z",
    label: "Viewed 3+ Pages",
    color: "#3b82f6",
  },
  return_visit: {
    icon: "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182",
    label: "Return Visit",
    color: "#0ea5e9",
  },
  status_changed: {
    icon: "M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5",
    label: "Status Changed",
    color: "#f97316",
  },
};

function getActivityConfig(type: string): ActivityConfig {
  return (
    ACTIVITY_TYPES[type] || {
      icon: "M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z",
      label: type.replace(/_/g, " "),
      color: "#64748b",
    }
  );
}

function formatDate(date: string): string {
  const d = new Date(date);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return d.toLocaleDateString();
}

export default function LeadActivityTimeline({
  activities,
}: {
  activities: Activity[];
}) {
  if (!activities || activities.length === 0) {
    return (
      <p className="text-xs text-slate-500 py-2">No activity recorded yet.</p>
    );
  }

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-3 top-2 bottom-2 w-px bg-white/8" />

      <div className="space-y-4">
        {activities.map((activity) => {
          const config = getActivityConfig(activity.type);

          return (
            <div key={activity.id} className="relative flex gap-3 pl-0">
              {/* Icon circle */}
              <div
                className="relative z-10 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${config.color}20` }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={config.color}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={config.icon} />
                </svg>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-300">
                    {config.label}
                  </p>
                  <span className="text-[10px] text-slate-500 flex-shrink-0 ml-2">
                    {formatDate(activity.createdAt)}
                  </span>
                </div>
                {activity.data && Object.keys(activity.data).length > 0 && (
                  <div className="mt-1 text-xs text-slate-500">
                    {activity.data.page && (
                      <span>Page: {String(activity.data.page)}</span>
                    )}
                    {activity.data.message && (
                      <p className="truncate">{String(activity.data.message)}</p>
                    )}
                    {activity.data.service && (
                      <span>Service: {String(activity.data.service)}</span>
                    )}
                    {activity.data.formName && (
                      <span>Form: {String(activity.data.formName)}</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
