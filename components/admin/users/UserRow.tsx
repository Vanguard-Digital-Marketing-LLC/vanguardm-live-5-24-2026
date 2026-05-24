"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import Badge from "@/components/admin/shared/Badge";
import ConfirmModal from "@/components/admin/shared/ConfirmModal";

type Role = "ADMIN" | "TEAM" | "USER";

interface UserRowProps {
  user: {
    id: string;
    name: string | null;
    email: string | null;
    role: string | null;
    isAdmin: boolean;
    createdAt: string;
    coursePurchases: number;
    certificates: number;
  };
  currentUserId: string;
}

const ROLE_VARIANT: Record<string, "emerald" | "amber" | "slate"> = {
  ADMIN: "emerald",
  TEAM: "amber",
  USER: "slate",
};

export default function UserRow({ user, currentUserId }: UserRowProps) {
  const router = useRouter();
  const displayRole = (user.role || (user.isAdmin ? "ADMIN" : "USER")) as Role;
  const isSelf = user.id === currentUserId;

  const [roleValue, setRoleValue] = useState<Role>(displayRole);
  const [pendingRole, setPendingRole] = useState<Role | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const initials = (user.name || user.email || "?")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const showToast = useCallback((type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const handleRoleChange = useCallback(async () => {
    if (!pendingRole) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: pendingRole }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update role");
      }
      setRoleValue(pendingRole);
      showToast("success", `Role changed to ${pendingRole}`);
      router.refresh();
    } catch (err) {
      showToast("error", err instanceof Error ? err.message : "Failed to update role");
    } finally {
      setLoading(false);
      setPendingRole(null);
    }
  }, [pendingRole, user.id, router, showToast]);

  const handleDelete = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/users/${user.id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete user");
      }
      showToast("success", "User deleted");
      router.refresh();
    } catch (err) {
      showToast("error", err instanceof Error ? err.message : "Failed to delete user");
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
    }
  }, [user.id, router, showToast]);

  return (
    <>
      <tr className="border-b border-white/4 hover:bg-white/5 transition-colors">
        {/* User info */}
        <td className="px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald/20 flex items-center justify-center text-emerald text-xs font-bold flex-shrink-0">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="text-sm text-white truncate">{user.name || "\u2014"}</p>
              <p className="text-xs text-slate-500 truncate">{user.email}</p>
            </div>
          </div>
        </td>

        {/* Role dropdown */}
        <td className="px-4 py-3">
          <div className="flex items-center gap-2">
            {isSelf ? (
              <Badge label={roleValue} variant={ROLE_VARIANT[roleValue] || "slate"} />
            ) : (
              <select
                value={roleValue}
                onChange={(e) => setPendingRole(e.target.value as Role)}
                disabled={loading}
                className="bg-[#0d1117] border border-white/10 rounded-lg px-2 py-1 text-xs font-semibold uppercase tracking-wider text-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald/50 disabled:opacity-50 cursor-pointer appearance-none"
                style={{ paddingRight: "1.5rem", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 0.4rem center" }}
              >
                <option value="ADMIN">Admin</option>
                <option value="TEAM">Team</option>
                <option value="USER">User</option>
              </select>
            )}
          </div>
        </td>

        {/* Courses */}
        <td className="px-4 py-3 text-sm text-slate-300">{user.coursePurchases}</td>

        {/* Certs */}
        <td className="px-4 py-3 text-sm text-slate-300">{user.certificates}</td>

        {/* Joined */}
        <td className="px-4 py-3 text-xs text-slate-500">
          {new Date(user.createdAt).toLocaleDateString()}
        </td>

        {/* Actions */}
        <td className="px-4 py-3">
          <div className="flex items-center gap-2">
            {/* Inline toast */}
            {toast && (
              <span
                className={`text-[10px] font-medium px-2 py-0.5 rounded ${
                  toast.type === "success"
                    ? "bg-emerald/10 text-emerald"
                    : "bg-red-400/10 text-red-400"
                }`}
              >
                {toast.message}
              </span>
            )}
            {!isSelf && (
              <button
                onClick={() => setShowDeleteModal(true)}
                disabled={loading}
                className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-400/10 transition-colors disabled:opacity-50"
                title="Delete user"
              >
                <Trash2 size={14} />
              </button>
            )}
          </div>
        </td>
      </tr>

      {/* Role change confirmation */}
      <ConfirmModal
        open={pendingRole !== null}
        onClose={() => setPendingRole(null)}
        onConfirm={handleRoleChange}
        title="Change User Role"
        message={`Change ${user.name || user.email || "this user"}'s role from ${roleValue} to ${pendingRole}?`}
        confirmLabel={`Set to ${pendingRole}`}
        loading={loading}
      />

      {/* Delete confirmation */}
      <ConfirmModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete User"
        message={`Are you sure you want to delete ${user.name || user.email || "this user"}? This action cannot be undone.`}
        confirmLabel="Delete"
        danger
        loading={loading}
      />
    </>
  );
}
