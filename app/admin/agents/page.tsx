import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { resolveAgencyId } from "@/lib/resolve-agency";
import { requireFeature } from "@/lib/require-feature";
import AgentRunStatusBadge from "@/components/admin/agents/AgentRunStatusBadge";
import AgentLauncherButton from "@/components/admin/agents/AgentLauncherButton";
import { ArrowRight, Bot } from "lucide-react";

export const dynamic = "force-dynamic";
export const metadata = { title: "Agent runs" };

type Search = { status?: string; kind?: string };

export default async function AgentsPage({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/sign-in");
  if (session.user.role !== "ADMIN") redirect("/admin");

  const gate = await requireFeature("agent");
  if (gate) return gate;

  const agencyId = await resolveAgencyId();
  if (!agencyId) redirect("/auth/sign-in");

  const { status, kind } = await searchParams;

  // Scope: direct agencyId OR via ticket/task in the same agency (legacy rows).
  const where = {
    AND: [
      {
        OR: [
          { agencyId },
          { ticket: { agencyId } },
          { task: { agencyId } },
        ],
      },
      status ? { status: status as "QUEUED" | "RUNNING" | "COMPLETED" | "FAILED" } : {},
      kind ? { kind } : {},
    ],
  };

  const [runs, statusCounts, clients] = await Promise.all([
    prisma.agentRun.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: 100,
      include: {
        client: { select: { id: true, name: true } },
        ticket: { select: { id: true, title: true } },
        task: { select: { id: true, title: true } },
      },
    }),
    prisma.agentRun.groupBy({
      by: ["status"],
      where: {
        OR: [
          { agencyId },
          { ticket: { agencyId } },
          { task: { agencyId } },
        ],
      },
      _count: true,
    }),
    prisma.client.findMany({
      where: { agencyId, status: "ACTIVE" },
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    }),
  ]);

  const counts: Record<string, number> = { ALL: 0 };
  for (const c of statusCounts) {
    counts[c.status] = c._count;
    counts.ALL += c._count;
  }

  const statusLinks: Array<["ALL" | "QUEUED" | "RUNNING" | "COMPLETED" | "FAILED", string]> = [
    ["ALL", "All"],
    ["RUNNING", "Running"],
    ["QUEUED", "Queued"],
    ["COMPLETED", "Completed"],
    ["FAILED", "Failed"],
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Agent runs</h1>
          <p className="text-sm text-slate-400 mt-1">
            Claude-powered automated work. Each run is sandboxed to a single client&rsquo;s site.
          </p>
        </div>
        <AgentLauncherButton clients={clients} />
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {statusLinks.map(([key, label]) => {
          const isActive = (status || "ALL") === key;
          const href =
            key === "ALL"
              ? "/admin/agents"
              : `/admin/agents?status=${key}${kind ? `&kind=${kind}` : ""}`;
          return (
            <Link
              key={key}
              href={href}
              className={`inline-flex items-center gap-2 h-8 px-3 rounded-md text-xs font-medium transition-colors ${
                isActive
                  ? "bg-emerald-500/15 border border-emerald-400/30 text-emerald-300"
                  : "bg-white/5 border border-white/8 text-slate-400 hover:text-white"
              }`}
            >
              {label}
              <span className="text-[10px] text-slate-500">{counts[key] ?? 0}</span>
            </Link>
          );
        })}
      </div>

      {runs.length === 0 ? (
        <div className="bg-[#111827] border border-white/6 rounded-xl p-10 text-center">
          <Bot size={28} className="text-slate-600 mx-auto mb-3" />
          <p className="text-sm text-slate-400">
            No agent runs {status ? `with status ${status.toLowerCase()}` : "yet"}.
          </p>
          <p className="text-xs text-slate-600 mt-1">
            Launch one from the button above, or queue one from a ticket / task.
          </p>
        </div>
      ) : (
        <div className="bg-[#111827] border border-white/6 rounded-xl divide-y divide-white/6">
          {runs.map((r) => {
            const target = r.ticket?.title || r.task?.title || r.kind || "Custom run";
            const filesChanged = Array.isArray(r.filesChanged) ? r.filesChanged.length : 0;
            return (
              <Link
                key={r.id}
                href={`/admin/agents/${r.id}`}
                className="flex items-center justify-between p-4 hover:bg-white/[0.03] gap-4"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <AgentRunStatusBadge status={r.status} />
                    {r.kind && (
                      <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
                        {r.kind}
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-medium text-white truncate">{target}</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {r.client?.name ? `${r.client.name} · ` : ""}
                    {new Date(r.createdAt).toLocaleString()}
                    {filesChanged > 0 && ` · ${filesChanged} file${filesChanged === 1 ? "" : "s"} changed`}
                  </p>
                </div>
                <ArrowRight size={16} className="text-slate-600 flex-shrink-0" />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
