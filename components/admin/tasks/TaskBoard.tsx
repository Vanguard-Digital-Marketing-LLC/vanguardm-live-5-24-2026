"use client";

import { useState, useEffect, useCallback } from "react";
import {
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
  LayoutGrid,
  List,
  Send,
  Trash2,
  X,
  Square,
  CheckSquare,
} from "lucide-react";
import MetricCard from "@/components/admin/shared/MetricCard";
import Badge from "@/components/admin/shared/Badge";
import ServiceTypeBadge from "@/components/admin/shared/ServiceTypeBadge";
import ServiceFilterTabs from "@/components/admin/shared/ServiceFilterTabs";
import SidePanel from "@/components/admin/shared/SidePanel";
import ConfirmModal from "@/components/admin/shared/ConfirmModal";
import DataTable, { Column } from "@/components/admin/shared/DataTable";
import AgentButton from "@/components/admin/shared/AgentButton";

// --------------- types ---------------

interface User {
  id: string;
  name: string | null;
  email: string;
  role?: string;
}
interface ClientRef {
  id: string;
  name: string;
}
interface ProjectRef {
  id: string;
  name: string;
  clientId?: string;
}
interface Subtask {
  id: string;
  text: string;
  done: boolean;
}
interface Comment {
  id: string;
  content: string;
  createdAt: string;
  user: { id: string; name: string | null; email: string };
}
interface Task {
  id: string;
  title: string;
  description: string | null;
  status: "NEW" | "IN_PROGRESS" | "COMPLETED";
  priority: "LOW" | "NORMAL" | "HIGH" | "URGENT";
  category: string | null;
  clientId: string | null;
  client: ClientRef | null;
  projectId: string | null;
  project: ProjectRef | null;
  serviceType: string | null;
  dueDate: string | null;
  assigneeId: string | null;
  assignee: { id: string; name: string | null; email: string } | null;
  createdBy: { id: string; name: string | null } | null;
  subtasks: Subtask[] | null;
  _count: { comments: number };
  createdAt: string;
}

interface TaskBoardProps {
  role: "ADMIN" | "TEAM";
  userId: string;
}

// --------------- helpers ---------------

const priorityVariant = (p: string): "red" | "amber" | "slate" => {
  if (p === "URGENT") return "red";
  if (p === "HIGH") return "amber";
  return "slate";
};

const statusLabel: Record<string, string> = {
  NEW: "New",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
};

const priorityOptions = ["LOW", "NORMAL", "HIGH", "URGENT"] as const;
const serviceOptions = [
  "SMA",
  "PPC",
  "WEB",
  "SUPPORT",
  "SEO",
  "REPORTING",
] as const;

// --------------- component ---------------

export default function TaskBoard({ role, userId }: TaskBoardProps) {
  // ---- data state ----
  const [tasks, setTasks] = useState<Task[]>([]);
  const [clients, setClients] = useState<ClientRef[]>([]);
  const [projects, setProjects] = useState<ProjectRef[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // ---- view state ----
  const [viewMode, setViewMode] = useState<"kanban" | "table">("kanban");
  const [serviceFilter, setServiceFilter] = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // ---- panel/modal state ----
  const [createOpen, setCreateOpen] = useState(false);
  const [detailTaskId, setDetailTaskId] = useState<string | null>(null);
  const [deleteTaskId, setDeleteTaskId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // ---- create form state ----
  const [createForm, setCreateForm] = useState({
    title: "",
    description: "",
    priority: "NORMAL",
    category: "",
    serviceType: "",
    clientId: "",
    projectId: "",
    assigneeId: "",
    dueDate: "",
  });
  const [createSaving, setCreateSaving] = useState(false);

  // ---- detail panel state ----
  const [editForm, setEditForm] = useState<Record<string, string>>({});
  const [editSubtasks, setEditSubtasks] = useState<Subtask[]>([]);
  const [newSubtaskText, setNewSubtaskText] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [editSaving, setEditSaving] = useState(false);
  const [commentSaving, setCommentSaving] = useState(false);

  // ---- table pagination ----
  const [tablePage, setTablePage] = useState(1);
  const tablePageSize = 20;

  // --------------- data fetching ---------------

  const fetchTasks = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/tasks");
      if (res.ok) {
        const data = await res.json();
        setTasks(Array.isArray(data) ? data : []);
      }
    } catch {
      // Network error - keep existing tasks
    }
  }, []);

  useEffect(() => {
    async function loadAll() {
      setLoading(true);
      await Promise.all([
        fetchTasks(),
        fetch("/api/admin/clients")
          .then((r) => r.json())
          .then(setClients)
          .catch(() => {}),
        fetch("/api/admin/projects")
          .then((r) => r.json())
          .then(setProjects)
          .catch(() => {}),
        fetch("/api/admin/users?pageSize=100")
          .then((r) => r.json())
          .then((d) => {
            const all = d.data || [];
            setUsers(all.filter((u: { role?: string }) => u.role === "ADMIN" || u.role === "TEAM"));
          })
          .catch(() => {}),
      ]);
      setLoading(false);
    }
    loadAll();
  }, [fetchTasks]);

  // --------------- filtered tasks ---------------

  const filtered = tasks.filter((t) => {
    if (serviceFilter !== "ALL" && t.serviceType !== serviceFilter)
      return false;
    if (priorityFilter !== "ALL" && t.priority !== priorityFilter)
      return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (
        !t.title.toLowerCase().includes(q) &&
        !(t.description || "").toLowerCase().includes(q) &&
        !(t.client?.name || "").toLowerCase().includes(q)
      )
        return false;
    }
    return true;
  });

  // ---- service type counts for filter tabs ----
  const serviceCounts: Record<string, number> = { ALL: tasks.length };
  for (const t of tasks) {
    const st = t.serviceType || "NONE";
    serviceCounts[st] = (serviceCounts[st] || 0) + 1;
  }

  // ---- metrics ----
  const completedCount = filtered.filter(
    (t) => t.status === "COMPLETED"
  ).length;
  const inProgressCount = filtered.filter(
    (t) => t.status === "IN_PROGRESS"
  ).length;
  const overdueCount = filtered.filter(
    (t) =>
      t.status !== "COMPLETED" &&
      t.dueDate &&
      new Date(t.dueDate) < new Date()
  ).length;

  // ---- kanban columns ----
  const newTasks = filtered.filter((t) => t.status === "NEW");
  const ipTasks = filtered.filter((t) => t.status === "IN_PROGRESS");
  const doneTasks = filtered.filter((t) => t.status === "COMPLETED");

  // --------------- status change ---------------

  const changeStatus = async (
    taskId: string,
    status: "NEW" | "IN_PROGRESS" | "COMPLETED"
  ) => {
    const res = await fetch(`/api/admin/tasks/${taskId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      const updated = await res.json();
      setTasks((prev) => prev.map((t) => (t.id === taskId ? updated : t)));
    }
  };

  const canChangeStatus = (task: Task) =>
    role === "ADMIN" || task.assigneeId === userId;

  // --------------- create task ---------------

  const handleCreate = async () => {
    if (!createForm.title.trim()) return;
    setCreateSaving(true);
    const body: Record<string, string | null> = {
      title: createForm.title.trim(),
      description: createForm.description.trim() || null,
      priority: createForm.priority,
      category: createForm.category.trim() || null,
      serviceType: createForm.serviceType || null,
      clientId: createForm.clientId || null,
      projectId: createForm.projectId || null,
      assigneeId: createForm.assigneeId || null,
      dueDate: createForm.dueDate || null,
    };
    const res = await fetch("/api/admin/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      const task = await res.json();
      setTasks((prev) => [task, ...prev]);
      setCreateOpen(false);
      setCreateForm({
        title: "",
        description: "",
        priority: "NORMAL",
        category: "",
        serviceType: "",
        clientId: "",
        projectId: "",
        assigneeId: "",
        dueDate: "",
      });
    }
    setCreateSaving(false);
  };

  // --------------- detail panel ---------------

  const detailTask = tasks.find((t) => t.id === detailTaskId) || null;

  const openDetail = async (task: Task) => {
    setDetailTaskId(task.id);
    setEditForm({
      title: task.title,
      description: task.description || "",
      status: task.status,
      priority: task.priority,
      category: task.category || "",
      serviceType: task.serviceType || "",
      clientId: task.clientId || "",
      projectId: task.projectId || "",
      assigneeId: task.assigneeId || "",
      dueDate: task.dueDate ? task.dueDate.slice(0, 10) : "",
    });
    setEditSubtasks(
      Array.isArray(task.subtasks) ? [...task.subtasks] : []
    );
    setNewSubtaskText("");
    setComments([]);
    setNewComment("");
    // fetch comments
    const res = await fetch(`/api/admin/tasks/${task.id}/comments`);
    if (res.ok) setComments(await res.json());
  };

  const saveEdit = async () => {
    if (!detailTask) return;
    setEditSaving(true);
    const body: Record<string, unknown> = {};

    if (role === "ADMIN") {
      body.title = editForm.title;
      body.description = editForm.description || null;
      body.status = editForm.status;
      body.priority = editForm.priority;
      body.category = editForm.category || null;
      body.serviceType = editForm.serviceType || null;
      body.clientId = editForm.clientId || null;
      body.projectId = editForm.projectId || null;
      body.assigneeId = editForm.assigneeId || null;
      body.dueDate = editForm.dueDate || null;
      body.subtasks = editSubtasks;
    } else {
      // TEAM can only change status
      body.status = editForm.status;
    }

    const res = await fetch(`/api/admin/tasks/${detailTask.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      const updated = await res.json();
      setTasks((prev) =>
        prev.map((t) => (t.id === updated.id ? updated : t))
      );
    }
    setEditSaving(false);
  };

  // ---- subtasks ----

  const addSubtask = () => {
    if (!newSubtaskText.trim()) return;
    setEditSubtasks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text: newSubtaskText.trim(), done: false },
    ]);
    setNewSubtaskText("");
  };

  const toggleSubtask = (id: string) => {
    setEditSubtasks((prev) =>
      prev.map((s) => (s.id === id ? { ...s, done: !s.done } : s))
    );
  };

  const removeSubtask = (id: string) => {
    setEditSubtasks((prev) => prev.filter((s) => s.id !== id));
  };

  // ---- comments ----

  const postComment = async () => {
    if (!newComment.trim() || !detailTask) return;
    setCommentSaving(true);
    const res = await fetch(
      `/api/admin/tasks/${detailTask.id}/comments`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newComment.trim() }),
      }
    );
    if (res.ok) {
      const c = await res.json();
      setComments((prev) => [...prev, c]);
      setNewComment("");
      // update comment count
      setTasks((prev) =>
        prev.map((t) =>
          t.id === detailTask.id
            ? { ...t, _count: { comments: t._count.comments + 1 } }
            : t
        )
      );
    }
    setCommentSaving(false);
  };

  // --------------- delete ---------------

  const handleDelete = async () => {
    if (!deleteTaskId) return;
    setDeleteLoading(true);
    const res = await fetch(`/api/admin/tasks/${deleteTaskId}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setTasks((prev) => prev.filter((t) => t.id !== deleteTaskId));
      if (detailTaskId === deleteTaskId) setDetailTaskId(null);
    }
    setDeleteLoading(false);
    setDeleteTaskId(null);
  };

  // --------------- table columns ---------------

  const tableColumns: Column<Task>[] = [
    {
      key: "title",
      label: "Title",
      sortable: true,
      render: (t) => (
        <span className="font-medium text-white">{t.title}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (t) => (
        <Badge
          label={statusLabel[t.status]}
          variant={
            t.status === "COMPLETED"
              ? "emerald"
              : t.status === "IN_PROGRESS"
                ? "amber"
                : "slate"
          }
        />
      ),
    },
    {
      key: "priority",
      label: "Priority",
      sortable: true,
      render: (t) => (
        <Badge label={t.priority} variant={priorityVariant(t.priority)} />
      ),
    },
    {
      key: "serviceType",
      label: "Service",
      render: (t) =>
        t.serviceType ? <ServiceTypeBadge type={t.serviceType} /> : null,
    },
    {
      key: "client",
      label: "Client",
      render: (t) => (
        <span className="text-slate-400 text-xs">
          {t.client?.name || "—"}
        </span>
      ),
    },
    {
      key: "assignee",
      label: "Assignee",
      render: (t) => (
        <span className="text-slate-400 text-xs">
          {t.assignee?.name || t.assignee?.email || "Unassigned"}
        </span>
      ),
    },
    {
      key: "dueDate",
      label: "Due",
      sortable: true,
      render: (t) =>
        t.dueDate ? (
          <span className="text-xs text-slate-400">
            {new Date(t.dueDate).toLocaleDateString()}
          </span>
        ) : null,
    },
    {
      key: "actions",
      label: "Actions",
      render: (t) =>
        canChangeStatus(t) && t.status !== "COMPLETED" ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              changeStatus(
                t.id,
                t.status === "NEW" ? "IN_PROGRESS" : "COMPLETED"
              );
            }}
            className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${
              t.status === "NEW"
                ? "bg-amber-500/15 text-amber-400 hover:bg-amber-500/25 border border-amber-500/20"
                : "bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 border border-emerald-500/20"
            }`}
          >
            {t.status === "NEW" ? "Start" : "Complete"}
          </button>
        ) : t.status === "COMPLETED" ? (
          <span className="text-xs text-emerald-400/60">Done</span>
        ) : null,
    },
  ];

  // --------------- render ---------------

  const selectClass =
    "w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 [&>option]:text-black [&>option]:bg-white";
  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500";

  // ---- Kanban card ----

  const renderCard = (task: Task) => (
    <div
      key={task.id}
      className="bg-white/5 rounded-lg p-4 border border-white/6 hover:border-white/12 transition-colors cursor-pointer"
      onClick={() => openDetail(task)}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-medium text-white">{task.title}</p>
        {role === "ADMIN" && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setDeleteTaskId(task.id);
            }}
            className="text-slate-600 hover:text-red-400 shrink-0"
          >
            <Trash2 size={14} />
          </button>
        )}
      </div>
      {task.description && (
        <p className="text-xs text-slate-400 mt-1 line-clamp-2">
          {task.description}
        </p>
      )}
      {task.client && (
        <span className="text-xs text-emerald-400 mt-1 block">
          {task.client.name}
        </span>
      )}
      <div className="flex items-center gap-2 mt-3 flex-wrap">
        <Badge
          label={task.priority}
          variant={priorityVariant(task.priority)}
        />
        {task.category && <Badge label={task.category} variant="cyan" />}
        {task.serviceType && (
          <ServiceTypeBadge type={task.serviceType} />
        )}
      </div>
      <div className="flex items-center justify-between mt-3">
        {task.assignee ? (
          <span className="text-xs text-slate-400">
            {task.assignee.name || task.assignee.email}
          </span>
        ) : (
          <span className="text-xs text-slate-600">Unassigned</span>
        )}
        <div className="flex items-center gap-2">
          {task._count.comments > 0 && (
            <span className="text-xs text-slate-500">
              {task._count.comments} comment
              {task._count.comments !== 1 ? "s" : ""}
            </span>
          )}
          {task.dueDate && (
            <span
              className={`text-xs ${
                new Date(task.dueDate) < new Date() &&
                task.status !== "COMPLETED"
                  ? "text-red-400"
                  : "text-slate-500"
              }`}
            >
              {new Date(task.dueDate).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>
      {/* Status change buttons */}
      {canChangeStatus(task) && (
        <div className="flex gap-2 mt-3 pt-3 border-t border-white/6">
          {task.status === "NEW" && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  changeStatus(task.id, "IN_PROGRESS");
                }}
                className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg bg-amber-500/15 text-amber-400 hover:bg-amber-500/25 border border-amber-500/20 transition-colors"
              >
                <Clock size={13} /> Start
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  changeStatus(task.id, "COMPLETED");
                }}
                className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 border border-emerald-500/20 transition-colors"
              >
                <CheckCircle size={13} /> Complete
              </button>
            </>
          )}
          {task.status === "IN_PROGRESS" && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  changeStatus(task.id, "COMPLETED");
                }}
                className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 border border-emerald-500/20 transition-colors"
              >
                <CheckCircle size={13} /> Mark Complete
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  changeStatus(task.id, "NEW");
                }}
                className="text-xs px-2 py-2 rounded-lg bg-slate-500/10 text-slate-400 hover:bg-slate-500/20 transition-colors"
              >
                Reopen
              </button>
            </>
          )}
          {task.status === "COMPLETED" && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                changeStatus(task.id, "NEW");
              }}
              className="text-xs px-3 py-2 rounded-lg bg-slate-500/10 text-slate-400 hover:bg-slate-500/20 transition-colors"
            >
              Reopen
            </button>
          )}
        </div>
      )}
    </div>
  );

  const renderColumn = (
    title: string,
    color: string,
    columnTasks: Task[]
  ) => (
    <div className="bg-[#111827] border border-white/6 rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-white/6 flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${color}`} />
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        <span className="text-xs text-slate-500 ml-auto">
          {columnTasks.length}
        </span>
      </div>
      <div className="p-3 space-y-3 min-h-[200px]">
        {columnTasks.map(renderCard)}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-slate-400">
        Loading tasks...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ---- Header ---- */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">
            Tasks
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Task board across all service lines
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* View toggle */}
          <div className="flex bg-white/5 rounded-lg p-1 border border-white/10">
            <button
              onClick={() => setViewMode("kanban")}
              className={`p-1.5 rounded ${
                viewMode === "kanban"
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded ${
                viewMode === "table"
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <List size={16} />
            </button>
          </div>
          {/* New task button */}
          {(role === "ADMIN" || role === "TEAM") && (
            <button
              onClick={() => setCreateOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-medium transition-colors"
            >
              <Plus size={16} />
              New Task
            </button>
          )}
        </div>
      </div>

      {/* ---- Metrics ---- */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard
          label="Completed"
          value={completedCount}
          icon={CheckCircle}
          accent="emerald"
        />
        <MetricCard
          label="In Progress"
          value={inProgressCount}
          icon={Clock}
          accent="amber"
        />
        <MetricCard
          label="Overdue"
          value={overdueCount}
          icon={AlertCircle}
          accent="red"
        />
      </div>

      {/* ---- Filters ---- */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <ServiceFilterTabs
          active={serviceFilter}
          onChange={setServiceFilter}
          counts={serviceCounts}
        />
        <div className="flex gap-3 ml-auto">
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            aria-label="Filter by priority"
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-emerald-500 [&>option]:text-black [&>option]:bg-white"
          >
            <option value="ALL">All Priorities</option>
            {priorityOptions.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search tasks"
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 w-48"
          />
        </div>
      </div>

      {/* ---- Content: Kanban or Table ---- */}
      {viewMode === "kanban" ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {renderColumn("New", "bg-red-400", newTasks)}
          {renderColumn("In Progress", "bg-amber-400", ipTasks)}
          {renderColumn("Completed", "bg-emerald-400", doneTasks)}
        </div>
      ) : (
        <DataTable
          columns={tableColumns}
          data={filtered.slice(
            (tablePage - 1) * tablePageSize,
            tablePage * tablePageSize
          )}
          totalCount={filtered.length}
          page={tablePage}
          pageSize={tablePageSize}
          onPageChange={setTablePage}
          onRowClick={openDetail}
        />
      )}

      {/* ---- Create Side Panel ---- */}
      <SidePanel
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="New Task"
      >
        <div className="space-y-4">
          <div>
            <label htmlFor="create-task-title" className="text-xs text-slate-400 mb-1 block">
              Title *
            </label>
            <input
              id="create-task-title"
              className={inputClass}
              value={createForm.title}
              onChange={(e) =>
                setCreateForm({ ...createForm, title: e.target.value })
              }
              placeholder="Task title"
            />
          </div>
          <div>
            <label htmlFor="create-task-description" className="text-xs text-slate-400 mb-1 block">
              Description
            </label>
            <textarea
              id="create-task-description"
              className={`${inputClass} min-h-[80px]`}
              value={createForm.description}
              onChange={(e) =>
                setCreateForm({
                  ...createForm,
                  description: e.target.value,
                })
              }
              placeholder="Details..."
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="create-task-priority" className="text-xs text-slate-400 mb-1 block">
                Priority
              </label>
              <select
                id="create-task-priority"
                className={selectClass}
                value={createForm.priority}
                onChange={(e) =>
                  setCreateForm({
                    ...createForm,
                    priority: e.target.value,
                  })
                }
              >
                {priorityOptions.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="create-task-service-type" className="text-xs text-slate-400 mb-1 block">
                Service Type
              </label>
              <select
                id="create-task-service-type"
                className={selectClass}
                value={createForm.serviceType}
                onChange={(e) =>
                  setCreateForm({
                    ...createForm,
                    serviceType: e.target.value,
                  })
                }
              >
                <option value="">None</option>
                {serviceOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="create-task-category" className="text-xs text-slate-400 mb-1 block">
              Category
            </label>
            <input
              id="create-task-category"
              className={inputClass}
              value={createForm.category}
              onChange={(e) =>
                setCreateForm({
                  ...createForm,
                  category: e.target.value,
                })
              }
              placeholder="e.g. Bug, Feature"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="create-task-client" className="text-xs text-slate-400 mb-1 block">
                Client
              </label>
              <select
                id="create-task-client"
                className={selectClass}
                value={createForm.clientId}
                onChange={(e) =>
                  setCreateForm({
                    ...createForm,
                    clientId: e.target.value,
                  })
                }
              >
                <option value="">None</option>
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="create-task-project" className="text-xs text-slate-400 mb-1 block">
                Project
              </label>
              <select
                id="create-task-project"
                className={selectClass}
                value={createForm.projectId}
                onChange={(e) =>
                  setCreateForm({
                    ...createForm,
                    projectId: e.target.value,
                  })
                }
              >
                <option value="">None</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="create-task-assignee" className="text-xs text-slate-400 mb-1 block">
                Assignee
              </label>
              <select
                id="create-task-assignee"
                className={selectClass}
                value={createForm.assigneeId}
                onChange={(e) =>
                  setCreateForm({
                    ...createForm,
                    assigneeId: e.target.value,
                  })
                }
              >
                <option value="">Unassigned</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name || u.email}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="create-task-due-date" className="text-xs text-slate-400 mb-1 block">
                Due Date
              </label>
              <input
                id="create-task-due-date"
                type="date"
                className={inputClass}
                value={createForm.dueDate}
                onChange={(e) =>
                  setCreateForm({
                    ...createForm,
                    dueDate: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <button
            onClick={handleCreate}
            disabled={!createForm.title.trim() || createSaving}
            className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-lg text-sm font-medium transition-colors"
          >
            {createSaving ? "Creating..." : "Create Task"}
          </button>
        </div>
      </SidePanel>

      {/* ---- Detail Side Panel ---- */}
      <SidePanel
        open={!!detailTaskId}
        onClose={() => setDetailTaskId(null)}
        title="Task Details"
      >
        {detailTask && (
          <div className="space-y-6">
            {/* ---- Editable fields ---- */}
            <div className="space-y-4">
              <div>
                <label htmlFor="edit-task-title" className="text-xs text-slate-400 mb-1 block">
                  Title
                </label>
                {role === "ADMIN" ? (
                  <input
                    id="edit-task-title"
                    className={inputClass}
                    value={editForm.title || ""}
                    onChange={(e) =>
                      setEditForm({ ...editForm, title: e.target.value })
                    }
                  />
                ) : (
                  <p className="text-sm text-white">{detailTask.title}</p>
                )}
              </div>
              <div>
                <label htmlFor="edit-task-description" className="text-xs text-slate-400 mb-1 block">
                  Description
                </label>
                {role === "ADMIN" ? (
                  <textarea
                    id="edit-task-description"
                    className={`${inputClass} min-h-[80px]`}
                    value={editForm.description || ""}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        description: e.target.value,
                      })
                    }
                  />
                ) : (
                  <p className="text-sm text-slate-300">
                    {detailTask.description || "No description"}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="edit-task-status" className="text-xs text-slate-400 mb-1 block">
                    Status
                  </label>
                  <select
                    id="edit-task-status"
                    className={selectClass}
                    value={editForm.status || ""}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        status: e.target.value,
                      })
                    }
                  >
                    <option value="NEW">New</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="COMPLETED">Completed</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="edit-task-priority" className="text-xs text-slate-400 mb-1 block">
                    Priority
                  </label>
                  {role === "ADMIN" ? (
                    <select
                      id="edit-task-priority"
                      className={selectClass}
                      value={editForm.priority || ""}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          priority: e.target.value,
                        })
                      }
                    >
                      {priorityOptions.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <Badge
                      label={detailTask.priority}
                      variant={priorityVariant(detailTask.priority)}
                    />
                  )}
                </div>
              </div>
              {role === "ADMIN" && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="edit-task-service-type" className="text-xs text-slate-400 mb-1 block">
                        Service Type
                      </label>
                      <select
                        id="edit-task-service-type"
                        className={selectClass}
                        value={editForm.serviceType || ""}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            serviceType: e.target.value,
                          })
                        }
                      >
                        <option value="">None</option>
                        {serviceOptions.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="edit-task-category" className="text-xs text-slate-400 mb-1 block">
                        Category
                      </label>
                      <input
                        id="edit-task-category"
                        className={inputClass}
                        value={editForm.category || ""}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            category: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="edit-task-client" className="text-xs text-slate-400 mb-1 block">
                        Client
                      </label>
                      <select
                        id="edit-task-client"
                        className={selectClass}
                        value={editForm.clientId || ""}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            clientId: e.target.value,
                          })
                        }
                      >
                        <option value="">None</option>
                        {clients.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="edit-task-project" className="text-xs text-slate-400 mb-1 block">
                        Project
                      </label>
                      <select
                        id="edit-task-project"
                        className={selectClass}
                        value={editForm.projectId || ""}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            projectId: e.target.value,
                          })
                        }
                      >
                        <option value="">None</option>
                        {projects.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="edit-task-assignee" className="text-xs text-slate-400 mb-1 block">
                        Assignee
                      </label>
                      <select
                        id="edit-task-assignee"
                        className={selectClass}
                        value={editForm.assigneeId || ""}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            assigneeId: e.target.value,
                          })
                        }
                      >
                        <option value="">Unassigned</option>
                        {users.map((u) => (
                          <option key={u.id} value={u.id}>
                            {u.name || u.email}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="edit-task-due-date" className="text-xs text-slate-400 mb-1 block">
                        Due Date
                      </label>
                      <input
                        id="edit-task-due-date"
                        type="date"
                        className={inputClass}
                        value={editForm.dueDate || ""}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            dueDate: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </>
              )}
              <button
                onClick={saveEdit}
                disabled={editSaving}
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-lg text-sm font-medium transition-colors"
              >
                {editSaving ? "Saving..." : "Save Changes"}
              </button>
              {role === "ADMIN" && (
                <button
                  onClick={() => setDeleteTaskId(detailTask.id)}
                  className="w-full py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg text-sm font-medium transition-colors"
                >
                  Delete Task
                </button>
              )}
              {role === "ADMIN" && detailTask.clientId && detailTask.status !== "COMPLETED" && (
                <div className="pt-2 border-t border-white/6">
                  <span className="text-xs text-slate-400 mb-1.5 block">AI Agent</span>
                  <AgentButton taskId={detailTask.id} onComplete={() => fetchTasks()} />
                </div>
              )}
            </div>

            {/* ---- Subtasks ---- */}
            <div className="border-t border-white/6 pt-4">
              <h4 className="text-sm font-semibold text-white mb-3">
                Subtasks
              </h4>
              <div className="space-y-2">
                {editSubtasks.map((sub) => (
                  <div
                    key={sub.id}
                    className="flex items-center gap-2 group"
                  >
                    <button
                      onClick={() => toggleSubtask(sub.id)}
                      className="text-slate-400 hover:text-emerald-400 shrink-0"
                    >
                      {sub.done ? (
                        <CheckSquare size={16} className="text-emerald-400" />
                      ) : (
                        <Square size={16} />
                      )}
                    </button>
                    <span
                      className={`text-sm flex-1 ${
                        sub.done
                          ? "line-through text-slate-500"
                          : "text-slate-300"
                      }`}
                    >
                      {sub.text}
                    </span>
                    {role === "ADMIN" && (
                      <button
                        onClick={() => removeSubtask(sub.id)}
                        className="text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {role === "ADMIN" && (
                <div className="flex gap-2 mt-3">
                  <input
                    className={`${inputClass} flex-1`}
                    value={newSubtaskText}
                    onChange={(e) => setNewSubtaskText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addSubtask()}
                    aria-label="Add subtask"
                    placeholder="Add subtask..."
                  />
                  <button
                    onClick={addSubtask}
                    disabled={!newSubtaskText.trim()}
                    className="px-3 py-2 bg-white/5 hover:bg-white/10 disabled:opacity-50 text-white rounded-lg text-sm transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              )}
            </div>

            {/* ---- Comments ---- */}
            <div className="border-t border-white/6 pt-4">
              <h4 className="text-sm font-semibold text-white mb-3">
                Comments ({comments.length})
              </h4>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {comments.map((c) => (
                  <div
                    key={c.id}
                    className="bg-white/5 rounded-lg p-3 border border-white/6"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-emerald-400">
                        {c.user.name || c.user.email}
                      </span>
                      <span className="text-xs text-slate-500">
                        {new Date(c.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-slate-300">{c.content}</p>
                  </div>
                ))}
                {comments.length === 0 && (
                  <p className="text-xs text-slate-500">
                    No comments yet
                  </p>
                )}
              </div>
              <div className="flex gap-2 mt-3">
                <input
                  className={`${inputClass} flex-1`}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && postComment()}
                  aria-label="Add comment"
                  placeholder="Add a comment..."
                />
                <button
                  onClick={postComment}
                  disabled={!newComment.trim() || commentSaving}
                  className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-lg text-sm transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </SidePanel>

      {/* ---- Delete Confirmation Modal ---- */}
      <ConfirmModal
        open={!!deleteTaskId}
        onClose={() => setDeleteTaskId(null)}
        onConfirm={handleDelete}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
        confirmLabel="Delete"
        danger
        loading={deleteLoading}
      />
    </div>
  );
}
