import { redirect, notFound } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import Badge from "@/components/admin/shared/Badge";
import ServiceTypeBadge from "@/components/admin/shared/ServiceTypeBadge";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Circle, Clock } from "lucide-react";

export const metadata = { title: "Project Details" };

function getStatusVariant(status: string): "emerald" | "amber" | "red" | "slate" | "cyan" | "purple" {
  const map: Record<string, "emerald" | "amber" | "red" | "slate" | "cyan" | "purple"> = {
    ACTIVE: "emerald",
    PLANNING: "cyan",
    ON_HOLD: "amber",
    COMPLETED: "slate",
    NEW: "cyan",
    IN_PROGRESS: "amber",
  };
  return map[status] || "slate";
}

function getTaskIcon(status: string) {
  switch (status) {
    case "COMPLETED":
      return <CheckCircle2 size={16} className="text-teal flex-shrink-0" />;
    case "IN_PROGRESS":
      return <Clock size={16} className="text-amber flex-shrink-0" />;
    default:
      return <Circle size={16} className="text-slate-500 flex-shrink-0" />;
  }
}

function formatDate(date: Date | null): string {
  if (!date) return "--";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getPriorityVariant(priority: string): "emerald" | "amber" | "red" | "slate" | "cyan" | "purple" {
  const map: Record<string, "emerald" | "amber" | "red" | "slate" | "cyan" | "purple"> = {
    LOW: "slate",
    NORMAL: "cyan",
    HIGH: "amber",
    URGENT: "red",
  };
  return map[priority] || "slate";
}

export default async function PortalProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user?.id || !session.user.clientId) redirect("/auth/sign-in");

  const { id } = await params;
  const clientId = session.user.clientId;

  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      tasks: {
        orderBy: [{ status: "asc" }, { priority: "desc" }, { createdAt: "desc" }],
        select: {
          id: true,
          title: true,
          status: true,
          priority: true,
          dueDate: true,
          description: true,
        },
      },
    },
  });

  // Ensure the project belongs to this client
  if (!project || project.clientId !== clientId) notFound();

  const completedTasks = project.tasks.filter((t) => t.status === "COMPLETED").length;
  const totalTasks = project.tasks.length;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="space-y-8">
      {/* Back link */}
      <Link
        href="/portal/projects"
        className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Projects
      </Link>

      {/* Project header */}
      <div className="bg-[#111827] border border-white/6 rounded-xl p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-white">{project.name}</h1>
            {project.description && (
              <p className="text-sm text-slate-400 mt-2 max-w-2xl">{project.description}</p>
            )}
          </div>
          <Badge label={project.status.replace("_", " ")} variant={getStatusVariant(project.status)} />
        </div>

        <div className="flex flex-wrap items-center gap-6 mt-6">
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider">Service</p>
            <div className="mt-1">
              <ServiceTypeBadge type={project.serviceType} />
            </div>
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider">Start Date</p>
            <p className="text-sm text-white mt-1">{formatDate(project.startDate)}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider">Due Date</p>
            <p className="text-sm text-white mt-1">{formatDate(project.dueDate)}</p>
          </div>
          {project.completedDate && (
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider">Completed</p>
              <p className="text-sm text-teal mt-1">{formatDate(project.completedDate)}</p>
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400">Progress</span>
            <span className="text-xs text-slate-400">
              {completedTasks}/{totalTasks} tasks ({progressPercent}%)
            </span>
          </div>
          <div className="h-2 rounded-full bg-white/5 overflow-hidden">
            <div
              className="h-full rounded-full bg-teal transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Task list */}
      <div className="bg-[#111827] border border-white/6 rounded-xl p-6">
        <h2 className="font-display text-base font-semibold text-white mb-4">
          Tasks ({totalTasks})
        </h2>

        {project.tasks.length > 0 ? (
          <div className="space-y-2">
            {project.tasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-center gap-3 p-3 rounded-lg bg-white/5 ${
                  task.status === "COMPLETED" ? "opacity-60" : ""
                }`}
              >
                {getTaskIcon(task.status)}
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm ${
                      task.status === "COMPLETED"
                        ? "text-slate-500 line-through"
                        : "text-white"
                    }`}
                  >
                    {task.title}
                  </p>
                  {task.description && (
                    <p className="text-xs text-slate-500 truncate mt-0.5">
                      {task.description}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Badge label={task.priority} variant={getPriorityVariant(task.priority)} />
                  {task.dueDate && (
                    <span className="text-[10px] text-slate-500">
                      {formatDate(task.dueDate)}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500">No tasks have been added to this project yet.</p>
        )}
      </div>
    </div>
  );
}
