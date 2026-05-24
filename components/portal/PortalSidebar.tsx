"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAgency } from "@/contexts/AgencyContext";
import {
  LayoutDashboard,
  FolderKanban,
  LifeBuoy,
  MessageSquare,
  CreditCard,
  BarChart3,
  FileCheck,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/portal" },
  { label: "Projects", icon: FolderKanban, href: "/portal/projects" },
  { label: "Tickets", icon: LifeBuoy, href: "/portal/tickets" },
  { label: "Messages", icon: MessageSquare, href: "/portal/messages" },
  { label: "Invoices", icon: CreditCard, href: "/portal/invoices" },
  { label: "Reports", icon: BarChart3, href: "/portal/reports" },
  { label: "Approvals", icon: FileCheck, href: "/portal/approvals" },
  { label: "Settings", icon: Settings, href: "/portal/settings" },
];

export default function PortalSidebar() {
  const [expanded, setExpanded] = useState(false);
  const pathname = usePathname();
  const agency = useAgency();

  return (
    <aside
      role="navigation"
      aria-label="Portal navigation"
      className={`relative flex flex-col bg-[#0D1117] border-r border-white/6 transition-all duration-200 ${
        expanded ? "w-60" : "w-16"
      }`}
    >
      <div className="h-14 flex items-center justify-center border-b border-white/6">
        {agency.logoUrl ? (
          <img src={agency.logoUrl} alt={agency.name} className={expanded ? "h-8" : "h-6 w-6 rounded"} />
        ) : (
          <span className="font-display font-bold text-lg" style={{ color: agency.primaryColor || "#10b981" }}>
            {expanded ? agency.name : agency.name.charAt(0)}
          </span>
        )}
      </div>

      <nav className="flex-1 py-4 space-y-1 px-2">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === "/portal"
              ? pathname === "/portal"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-teal/10 text-white border-l-2 border-teal"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
              title={!expanded ? item.label : undefined}
              aria-current={isActive ? "page" : undefined}
            >
              <item.icon size={20} className="flex-shrink-0" />
              {expanded && <span className="font-body">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        aria-label="Toggle sidebar"
        className="absolute -right-3 top-20 w-6 h-6 bg-slate-800 border border-white/10 rounded-full flex items-center justify-center text-slate-400 hover:text-white z-10"
      >
        {expanded ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
      </button>
    </aside>
  );
}
