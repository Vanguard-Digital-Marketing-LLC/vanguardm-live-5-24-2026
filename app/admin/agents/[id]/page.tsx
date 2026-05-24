import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { resolveAgencyId } from "@/lib/resolve-agency";
import { requireFeature } from "@/lib/require-feature";
import AgentRunStatusBadge from "@/components/admin/agents/AgentRunStatusBadge";
import AgentRunPoller from "@/components/admin/agents/AgentRunPoller";
import { ChevronLeft, ExternalLink } from "lucide-react";

export const dynamic = "force-dynamic";
export const metadata = { title: "Agent run" };

type Props = { params: Promise<{ id: string }> };

export default async function AgentRunDetailPage({ params }: Props) {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/sign-in");
  if (session.user.role !== "ADMIN") redirect("/admin");

  const gate = await requireFeature("agent");
  if (gate) return gate;

  const agencyId = await resolveAgencyId();
  if (!agencyId) redirect("/auth/sign-in");

  const { id } = await params;

  const run = await prisma.agentRun.findUnique({
    where: { id },
    include: {
      client: { select: { id: true, name: true, domain: true } },
      ticket: { select: { id: true, title: true, agencyId: true } },
      task: { select: { id: true, title: true, agencyId: true } },
    },
  });

  if (!run) notFound();
  const runAgencyId = run.agencyId ?? run.ticket?.agencyId ?? run.task?.agencyId ?? null;
  if (runAgencyId !== agencyId) notFound();

  const filesChanged = Array.isArray(run.filesChanged) ? (run.filesChanged as unknown[]) : [];
  const durationMs =
    run.startedAt && run.completedAt
      ? new Date(run.completedAt).getTime() - new Date(run.startedAt).getTime()
      : null;

  return (
    <div className="space-y-6">
      <Link
        href="/admin/agents"
        className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white"
      >
        <ChevronLeft size={16} /> Back to agent runs
      </Link>

      {(run.status === "QUEUED" || run.status === "RUNNING") && (
        <AgentRunPoller id={run.id} />
      )}

      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <AgentRunStatusBadge status={run.status} />
            {run.kind && (
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
                {run.kind}
              </span>
            )}
          </div>
          <h1 className="font-display text-2xl font-bold text-white">
            {run.ticket?.title || run.task?.title || run.kind || "Custom run"}
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Started {run.createdAt.toLocaleString()}
            {durationMs !== null && ` · took ${(durationMs / 1000).toFixed(1)}s`}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2 text-xs text-slate-500">
          {run.client && (
            <Link
              href={`/admin/clients/${run.client.id}`}
              className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300"
            >
              {run.client.name} <ExternalLink size={11} />
            </Link>
          )}
          {run.ticket && (
            <Link
              href={`/admin/tickets/${run.ticket.id}`}
              className="inline-flex items-center gap-1 hover:text-white"
            >
              Ticket <ExternalLink size={11} />
            </Link>
          )}
          {run.task && (
            <Link
              href={`/admin/tasks`}
              className="inline-flex items-center gap-1 hover:text-white"
            >
              Task <ExternalLink size={11} />
            </Link>
          )}
        </div>
      </div>

      {run.errorMessage && (
        <div className="bg-red-500/10 border border-red-400/20 rounded-xl p-4">
          <p className="text-xs uppercase tracking-widest text-red-400 font-semibold mb-1">
            Error
          </p>
          <pre className="text-xs text-red-200 whitespace-pre-wrap font-mono break-words">
            {run.errorMessage}
          </pre>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Section title="Output">
            {run.output ? (
              <pre className="text-xs text-slate-200 whitespace-pre-wrap font-mono break-words leading-relaxed">
                {run.output}
              </pre>
            ) : (
              <p className="text-sm text-slate-500">
                {run.status === "RUNNING" ? "Running…" : run.status === "QUEUED" ? "Queued — output will appear here." : "No output."}
              </p>
            )}
          </Section>

          <Section title="Prompt">
            <pre className="text-xs text-slate-400 whitespace-pre-wrap font-mono break-words max-h-96 overflow-y-auto">
              {run.prompt}
            </pre>
          </Section>
        </div>

        <div className="space-y-6">
          {filesChanged.length > 0 && (
            <Section title={`Files changed (${filesChanged.length})`}>
              <ul className="space-y-1.5 text-xs font-mono text-slate-300">
                {filesChanged.map((f, i) => (
                  <li key={i} className="break-all">
                    {typeof f === "string" ? f : JSON.stringify(f)}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          <Section title="Timing">
            <dl className="space-y-2 text-xs">
              <Row label="Created" value={run.createdAt.toLocaleString()} />
              <Row label="Started" value={run.startedAt?.toLocaleString() || "—"} />
              <Row label="Completed" value={run.completedAt?.toLocaleString() || "—"} />
              <Row
                label="Duration"
                value={durationMs !== null ? `${(durationMs / 1000).toFixed(1)}s` : "—"}
              />
            </dl>
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#111827] border border-white/6 rounded-xl p-6">
      <h2 className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold mb-3">
        {title}
      </h2>
      {children}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-slate-500">{label}</dt>
      <dd className="text-slate-300">{value}</dd>
    </div>
  );
}
