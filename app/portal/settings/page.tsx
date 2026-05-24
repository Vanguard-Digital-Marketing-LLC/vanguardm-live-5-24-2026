import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { User, Briefcase, Clock } from "lucide-react";
import PortalPasswordForm from "@/components/portal/settings/PortalPasswordForm";

export const dynamic = "force-dynamic";
export const metadata = { title: "Settings" };

const SERVICE_LABELS: Record<string, string> = {
  SMA: "Social media & ads",
  PPC: "Paid search",
  WEB: "Website",
  SUPPORT: "Support & maintenance",
  SEO: "SEO",
  REPORTING: "Reporting & analytics",
};

const SERVICE_COLORS: Record<string, string> = {
  SMA: "bg-purple-400/15 text-purple-300",
  PPC: "bg-blue-400/15 text-blue-300",
  WEB: "bg-emerald-400/15 text-emerald-300",
  SUPPORT: "bg-amber-400/15 text-amber-300",
  SEO: "bg-cyan-400/15 text-cyan-300",
  REPORTING: "bg-rose-400/15 text-rose-300",
};

export default async function PortalSettingsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/sign-in");

  const clientId = session.user.clientId;
  if (!clientId) {
    return (
      <div className="max-w-2xl">
        <h1 className="font-display text-2xl font-bold text-white">Settings</h1>
        <p className="text-sm text-amber-400 mt-3">
          Your account isn&rsquo;t linked to a client yet. Ask your agency admin to invite you.
        </p>
      </div>
    );
  }

  const client = await prisma.client.findFirst({
    where: { id: clientId },
    select: {
      name: true,
      domain: true,
      slaResponseHours: true,
      contractStart: true,
      contractEnd: true,
      monthlyRetainer: true,
      services: {
        orderBy: { startDate: "asc" },
        select: { id: true, serviceType: true, status: true, monthlyBudget: true, startDate: true },
      },
    },
  });

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">Settings</h1>
        <p className="text-sm text-slate-400 mt-1">
          Account, services, and support response targets.
        </p>
      </div>

      {/* Account */}
      <section className="bg-[#111827] border border-white/6 rounded-xl p-6">
        <Header icon={User} label="Account" />
        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          <Field label="Name" value={session.user.name || "—"} />
          <Field label="Email" value={session.user.email || "—"} />
          {client && <Field label="Company" value={client.name} />}
          {client?.domain && <Field label="Site" value={client.domain} />}
        </div>
      </section>

      {/* Services */}
      {client && client.services.length > 0 && (
        <section className="bg-[#111827] border border-white/6 rounded-xl p-6">
          <Header icon={Briefcase} label={`Services (${client.services.length})`} />
          <div className="grid sm:grid-cols-2 gap-3 mt-4">
            {client.services.map((s) => (
              <div
                key={s.id}
                className="p-3 rounded-lg bg-white/5 border border-white/6"
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`inline-flex items-center h-5 px-2 rounded-full text-[10px] font-semibold ${
                      SERVICE_COLORS[s.serviceType] || "bg-slate-400/15 text-slate-300"
                    }`}
                  >
                    {SERVICE_LABELS[s.serviceType] || s.serviceType}
                  </span>
                  <span
                    className={`text-[10px] uppercase tracking-widest font-semibold ${
                      s.status === "ACTIVE" ? "text-emerald-400" : "text-slate-500"
                    }`}
                  >
                    {s.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Started {new Date(s.startDate).toLocaleDateString()}
                  {s.monthlyBudget != null && ` · $${s.monthlyBudget.toLocaleString()}/mo`}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SLA */}
      {client && (
        <section className="bg-[#111827] border border-white/6 rounded-xl p-6">
          <Header icon={Clock} label="Support SLA" />
          <p className="text-sm text-slate-300 mt-3">
            Tickets are answered within{" "}
            <span className="text-emerald-400 font-medium">
              {client.slaResponseHours ?? 24} hours
            </span>{" "}
            on business days.
          </p>
          {client.contractStart && (
            <p className="text-xs text-slate-500 mt-2">
              Contract period: {client.contractStart.toLocaleDateString()}
              {client.contractEnd ? ` – ${client.contractEnd.toLocaleDateString()}` : " – ongoing"}
            </p>
          )}
        </section>
      )}

      <PortalPasswordForm />
    </div>
  );
}

function Header({ icon: Icon, label }: { icon: typeof User; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-slate-400">
        <Icon size={16} />
      </div>
      <h2 className="font-display text-base font-semibold text-white">{label}</h2>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="block text-[10px] uppercase tracking-widest text-slate-600 font-semibold mb-1">
        {label}
      </span>
      <p className="text-sm text-white bg-white/5 rounded-lg px-3 py-2 border border-white/5 truncate">
        {value}
      </p>
    </div>
  );
}
