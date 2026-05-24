"use client";

import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

const BREADCRUMB_MAP: Record<string, string> = {
  "/portal": "Dashboard",
  "/portal/projects": "Projects",
  "/portal/tickets": "Tickets",
  "/portal/tickets/new": "New Ticket",
  "/portal/messages": "Messages",
  "/portal/invoices": "Invoices",
  "/portal/reports": "Reports",
  "/portal/approvals": "Approvals",
  "/portal/settings": "Settings",
};

interface PortalHeaderProps {
  user: { name?: string | null; email?: string | null; image?: string | null };
  clientName?: string;
}

export default function PortalHeader({ user, clientName }: PortalHeaderProps) {
  const pathname = usePathname();
  // Prefix match — find exact first, then longest prefix
  const pageTitle = BREADCRUMB_MAP[pathname] ??
    (Object.keys(BREADCRUMB_MAP)
      .filter((key) => key !== "/portal" && pathname.startsWith(key))
      .sort((a, b) => b.length - a.length)[0]
      ? BREADCRUMB_MAP[Object.keys(BREADCRUMB_MAP)
          .filter((key) => key !== "/portal" && pathname.startsWith(key))
          .sort((a, b) => b.length - a.length)[0]]
      : "Portal");
  const initials = (user.name || user.email || "C")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="h-14 flex items-center justify-between px-6 border-b border-white/6 bg-[#0D1117]">
      <div className="flex items-center gap-2">
        <span className="text-teal text-sm font-medium">{clientName || "Client Portal"}</span>
        <span className="text-slate-600">/</span>
        <span className="text-white text-sm font-medium">{pageTitle}</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-teal/20 flex items-center justify-center text-teal text-xs font-bold">
            {initials}
          </div>
          <span className="text-sm text-slate-400 hidden sm:block">
            {user.name || user.email}
          </span>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/auth/sign-in" })}
          className="text-slate-400 hover:text-white transition-colors"
          title="Sign out"
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
}
