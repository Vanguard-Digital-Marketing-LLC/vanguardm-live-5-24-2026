import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { resolveAgencyId } from "@/lib/resolve-agency";
import EmailSettingsForm from "./EmailSettingsForm";

export const metadata = { title: "Email Settings" };

export default async function EmailSettingsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/sign-in");

  const role = session.user.role ?? (session.user.isAdmin ? "ADMIN" : "USER");
  if (role !== "ADMIN") redirect("/admin/settings");

  const agencyId = await resolveAgencyId();
  if (!agencyId) redirect("/admin/settings");

  const agency = await prisma.agency.findUnique({
    where: { id: agencyId },
    select: {
      smtpHostEnc: true,
      smtpUserEnc: true,
      smtpPassEnc: true,
      fromEmail: true,
    },
  });

  const hasSmtp = !!(agency?.smtpHostEnc && agency.smtpUserEnc && agency.smtpPassEnc);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">Email Settings</h1>
        <p className="text-sm text-slate-400 mt-1">
          Configure SMTP for sending branded report emails to your clients
        </p>
      </div>

      {hasSmtp && (
        <div className="flex items-center gap-2 bg-emerald/5 border border-emerald/20 rounded-xl px-4 py-3">
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-sm text-emerald-400">SMTP configured</span>
          {agency?.fromEmail && (
            <span className="text-sm text-slate-400 ml-2">
              — sending as <span className="text-white font-mono text-xs">{agency.fromEmail}</span>
            </span>
          )}
        </div>
      )}

      <EmailSettingsForm
        hasSmtp={hasSmtp}
        fromEmail={agency?.fromEmail ?? ""}
      />
    </div>
  );
}
