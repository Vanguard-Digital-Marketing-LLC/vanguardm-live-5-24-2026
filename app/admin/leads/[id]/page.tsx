import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { resolveAgencyId } from "@/lib/resolve-agency";
import LeadScoreCard from "@/components/admin/leads/LeadScoreCard";
import LeadActivityTimeline from "@/components/admin/leads/LeadActivityTimeline";
import LeadDetailEditor from "@/components/admin/leads/LeadDetailEditor";
import LeadAiAssist from "@/components/admin/leads/LeadAiAssist";
import { ChevronLeft, Mail, Phone, Building2, Globe, Calendar } from "lucide-react";

export const dynamic = "force-dynamic";
export const metadata = { title: "Lead detail" };

type Props = { params: Promise<{ id: string }> };

export default async function LeadDetailPage({ params }: Props) {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/sign-in");
  const role = session.user.role ?? (session.user.isAdmin ? "ADMIN" : "USER");
  if (role !== "ADMIN" && role !== "TEAM") redirect("/admin");

  const agencyId = await resolveAgencyId();
  if (!agencyId) redirect("/auth/sign-in");

  const { id } = await params;

  const [lead, assignees] = await Promise.all([
    prisma.lead.findFirst({
      where: { id, agencyId },
      include: {
        assignedTo: { select: { id: true, name: true, email: true } },
        activities: { orderBy: { createdAt: "desc" }, take: 100 },
        formResponses: {
          include: { form: { select: { name: true, slug: true } } },
          orderBy: { createdAt: "desc" },
        },
        chatSessions: { orderBy: { updatedAt: "desc" }, take: 5 },
      },
    }),
    prisma.user.findMany({
      where: { agencyId, role: { in: ["ADMIN", "TEAM"] } },
      select: { id: true, name: true, email: true },
      orderBy: { name: "asc" },
    }),
  ]);

  if (!lead) notFound();

  const activities = lead.activities.map((a) => ({
    id: a.id,
    type: a.type,
    data: (a.data as Record<string, string | number | boolean | null> | null) ?? null,
    createdAt: a.createdAt.toISOString(),
  }));

  const scoreLead = {
    id: lead.id,
    name: lead.name,
    email: lead.email,
    score: lead.score,
    scoreBreakdown: (lead.scoreBreakdown as Record<string, number> | null) ?? null,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/leads"
          className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white"
        >
          <ChevronLeft size={16} /> Back to pipeline
        </Link>
        <span className="text-xs text-slate-500">
          Created {lead.createdAt.toLocaleString()}
        </span>
      </div>

      <div>
        <h1 className="font-display text-2xl font-bold text-white">{lead.name}</h1>
        <p className="text-sm text-slate-400 mt-1">
          {[lead.company, lead.source && `via ${lead.source}`].filter(Boolean).join(" · ") || "—"}
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#111827] border border-white/6 rounded-xl p-6">
            <h2 className="font-display text-base font-semibold text-white mb-4">Contact</h2>
            <dl className="grid sm:grid-cols-2 gap-y-3 gap-x-6 text-sm">
              <ContactRow icon={Mail} label="Email" value={lead.email} href={`mailto:${lead.email}`} />
              <ContactRow icon={Phone} label="Phone" value={lead.phone} href={lead.phone ? `tel:${lead.phone}` : null} />
              <ContactRow icon={Building2} label="Company" value={lead.company} />
              <ContactRow icon={Globe} label="Source" value={lead.source} />
              <ContactRow
                icon={Calendar}
                label="Last activity"
                value={lead.updatedAt.toLocaleString()}
              />
            </dl>
          </div>

          <LeadDetailEditor
            leadId={lead.id}
            initialStatus={lead.status}
            initialAssignedToId={lead.assignedToId}
            initialName={lead.name}
            initialPhone={lead.phone}
            initialCompany={lead.company}
            assignees={assignees}
          />

          <LeadAiAssist
            leadId={lead.id}
            initialBrief={lead.researchBrief}
            initialAiScore={lead.aiScore}
            initialAiReason={lead.aiScoreReason}
            initialSubject={lead.followupSubject}
            initialBody={lead.followupBody}
            initialAnalyzedAt={lead.aiAnalyzedAt ? lead.aiAnalyzedAt.toISOString() : null}
          />

          {lead.formResponses.length > 0 && (
            <div className="bg-[#111827] border border-white/6 rounded-xl p-6">
              <h2 className="font-display text-base font-semibold text-white mb-4">
                Form responses ({lead.formResponses.length})
              </h2>
              <div className="space-y-3">
                {lead.formResponses.map((r) => (
                  <div key={r.id} className="p-3 rounded-lg bg-white/5">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-white">{r.form?.name || "Form"}</p>
                      <span className="text-[10px] text-slate-500">
                        {new Date(r.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <pre className="mt-2 text-xs text-slate-400 whitespace-pre-wrap break-words font-mono">
                      {JSON.stringify(r.data, null, 2).slice(0, 800)}
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-[#111827] border border-white/6 rounded-xl p-6">
            <h2 className="font-display text-base font-semibold text-white mb-4">
              Activity timeline ({activities.length})
            </h2>
            <LeadActivityTimeline activities={activities} />
          </div>
        </div>

        <div className="space-y-6">
          <LeadScoreCard lead={scoreLead} />

          {lead.chatSessions.length > 0 && (
            <div className="bg-[#111827] border border-white/6 rounded-xl p-6">
              <h2 className="font-display text-base font-semibold text-white mb-3">
                Chat sessions
              </h2>
              <ul className="space-y-2">
                {lead.chatSessions.map((c) => (
                  <li key={c.id} className="text-xs text-slate-400">
                    {c.updatedAt.toLocaleString()}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Mail;
  label: string;
  value: string | null;
  href?: string | null;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon size={14} className="text-slate-500 mt-1 flex-shrink-0" />
      <div className="min-w-0">
        <dt className="text-[10px] uppercase tracking-widest text-slate-600 font-semibold">
          {label}
        </dt>
        <dd className="text-sm text-slate-200 truncate">
          {value ? (
            href ? (
              <a href={href} className="hover:text-white">
                {value}
              </a>
            ) : (
              value
            )
          ) : (
            <span className="text-slate-600">—</span>
          )}
        </dd>
      </div>
    </div>
  );
}
