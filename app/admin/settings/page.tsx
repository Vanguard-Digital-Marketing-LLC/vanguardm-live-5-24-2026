import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import AdminSettingsClient from "./AdminSettingsClient";
import {
  Building2,
  CreditCard,
  Mail,
  Wallet,
  Palette,
  ChevronRight,
} from "lucide-react";

export const metadata = { title: "Settings" };

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/sign-in");

  const isAdmin = session.user.role === "ADMIN";

  // Pull agency snapshot for the hub cards (branding + plan)
  const agency = isAdmin && session.user.agencyId
    ? await prisma.agency.findUnique({
        where: { id: session.user.agencyId },
        select: {
          name: true,
          slug: true,
          logoUrl: true,
          primaryColor: true,
          planTier: true,
          subscriptionStatus: true,
          maxClients: true,
          _count: { select: { clients: true } },
        },
      })
    : null;

  // Check env vars for integration status
  const integrations = {
    gtm: process.env.NEXT_PUBLIC_GTM_ID || null,
    turnstile: !!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
    stripe: !!process.env.STRIPE_SECRET_KEY,
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">Settings</h1>
        <p className="text-sm text-slate-400 mt-1">Profile, agency configuration, integrations</p>
      </div>

      {/* Settings hub — admin only */}
      {isAdmin && agency && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <HubCard
            href="/admin/settings/agency"
            icon={Palette}
            title="Branding"
            primary={agency.name}
            secondary={`${agency.slug}.vanguardm.com`}
            swatch={agency.primaryColor || "#10b981"}
          />
          <HubCard
            href="/admin/settings/billing"
            icon={CreditCard}
            title="Plan & billing"
            primary={agency.planTier}
            secondary={`${agency._count.clients} / ${agency.maxClients} clients · ${agency.subscriptionStatus}`}
          />
          <HubCard
            href="/admin/settings/payments"
            icon={Wallet}
            title="Stripe payments"
            primary={integrations.stripe ? "Connected" : "Not configured"}
            secondary="Per-agency keys for client invoicing"
          />
          <HubCard
            href="/admin/settings/email"
            icon={Mail}
            title="Email / SMTP"
            primary="Configure"
            secondary="Outbound transactional email"
          />
        </div>
      )}

      {/* Profile — editable */}
      <AdminSettingsClient
        user={{
          name: session.user.name || "",
          email: session.user.email || "",
          role: session.user.role || "USER",
        }}
      />

      {/* Integration status — dynamic from env */}
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4">
          <h2 className="font-display text-base font-semibold text-white">Integrations</h2>
          <p className="text-sm text-slate-400 mt-1">Connected service status</p>
        </div>
        <div className="lg:col-span-8 bg-[#111827] border border-white/6 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-300">Google Tag Manager</span>
            {integrations.gtm ? (
              <span className="text-xs text-emerald font-mono">{integrations.gtm}</span>
            ) : (
              <span className="text-xs text-slate-500">Not configured</span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-300">Cloudflare Turnstile</span>
            <span className={`text-xs ${integrations.turnstile ? "text-emerald" : "text-slate-500"}`}>
              {integrations.turnstile ? "Active" : "Not configured"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-300">Stripe Payments</span>
            <div className="flex items-center gap-3">
              <span className={`text-xs ${integrations.stripe ? "text-emerald" : "text-slate-500"}`}>
                {integrations.stripe ? "Connected" : "Not configured"}
              </span>
              <Link
                href="/admin/settings/payments"
                className="text-xs text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
              >
                Configure
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-300">Email / SMTP</span>
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500">Per-agency SMTP</span>
              <Link
                href="/admin/settings/email"
                className="text-xs text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
              >
                Configure
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HubCard({
  href,
  icon: Icon,
  title,
  primary,
  secondary,
  swatch,
}: {
  href: string;
  icon: typeof Building2;
  title: string;
  primary: string;
  secondary: string;
  swatch?: string;
}) {
  return (
    <Link
      href={href}
      className="group bg-[#111827] border border-white/6 hover:border-emerald-400/30 rounded-xl p-5 transition-colors block"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center">
          <Icon size={18} className="text-slate-400 group-hover:text-emerald-400" />
        </div>
        {swatch && (
          <span
            className="w-5 h-5 rounded-full border border-white/10"
            style={{ backgroundColor: swatch }}
            aria-hidden
          />
        )}
        {!swatch && (
          <ChevronRight size={16} className="text-slate-600 group-hover:text-slate-400 mt-2" />
        )}
      </div>
      <p className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">{title}</p>
      <p className="text-sm text-white font-medium mt-1 truncate">{primary}</p>
      <p className="text-xs text-slate-500 mt-0.5 truncate">{secondary}</p>
    </Link>
  );
}
