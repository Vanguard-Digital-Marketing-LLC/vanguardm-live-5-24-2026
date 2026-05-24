import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { resolveAgencyId } from "@/lib/resolve-agency";
import Badge from "@/components/admin/shared/Badge";
import InviteForm from "./InviteForm";

export const metadata = { title: "Team Management" };

export default async function TeamPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/sign-in");

  const agencyId = await resolveAgencyId();
  if (!agencyId) redirect("/auth/sign-in");

  const [teamMembers, pendingInvites] = await Promise.all([
    prisma.user.findMany({
      where: { agencyId, role: { in: ["ADMIN", "TEAM"] } },
      orderBy: { createdAt: "desc" },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    }),
    prisma.teamInvite.findMany({
      where: { agencyId, acceptedAt: null, expiresAt: { gt: new Date() } },
      orderBy: { createdAt: "desc" },
      select: { id: true, email: true, role: true, expiresAt: true },
    }),
  ]);

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Team</h1>
          <p className="text-sm text-slate-400 mt-1">Manage team members and invitations</p>
        </div>
        <InviteForm />
      </div>
      <div className="bg-[#111827] border border-white/6 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/6">
          <h2 className="font-display text-base font-semibold text-white">Active Members ({teamMembers.length})</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/6">
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Member</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Role</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Joined</th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((m) => {
                const initials = (m.name || m.email).split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
                return (
                  <tr key={m.id} className="border-b border-white/4 hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald/20 flex items-center justify-center text-emerald text-xs font-bold flex-shrink-0">{initials}</div>
                        <div><p className="text-sm text-white">{m.name || "—"}</p><p className="text-xs text-slate-500">{m.email}</p></div>
                      </div>
                    </td>
                    <td className="px-4 py-3"><Badge label={m.role} variant={m.role === "ADMIN" ? "emerald" : "amber"} /></td>
                    <td className="px-4 py-3 text-xs text-slate-500">{new Date(m.createdAt).toLocaleDateString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {pendingInvites.length > 0 && (
        <div className="bg-[#111827] border border-white/6 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/6">
            <h2 className="font-display text-base font-semibold text-white">Pending Invites ({pendingInvites.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-white/6">
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Email</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Role</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Expires</th>
              </tr></thead>
              <tbody>
                {pendingInvites.map((inv) => (
                  <tr key={inv.id} className="border-b border-white/4">
                    <td className="px-4 py-3 text-sm text-slate-300">{inv.email}</td>
                    <td className="px-4 py-3"><Badge label={inv.role} variant="amber" /></td>
                    <td className="px-4 py-3 text-xs text-slate-500">{new Date(inv.expiresAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
