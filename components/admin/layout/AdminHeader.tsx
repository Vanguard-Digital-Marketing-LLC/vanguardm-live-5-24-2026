"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, Search } from "lucide-react";
import { useAdminSidebar } from "@/contexts/AdminSidebarContext";
import UnreadMessagesBadge from "./UnreadMessagesBadge";
import CommandPalette from "./CommandPalette";

const BREADCRUMB_MAP: Record<string, string> = {
  "/admin": "Overview",
  "/admin/academy": "Academy",
  "/admin/users": "Users",
  "/admin/team": "Team",
  "/admin/tasks": "Tasks",
  "/admin/leads": "Leads",
  "/admin/payments": "Payments",
  "/admin/clients": "Clients",
  "/admin/onboarding": "Onboarding",
  "/admin/projects": "Projects",
  "/admin/tickets": "Tickets",
  "/admin/settings": "Settings",
  "/admin/blog": "Blog",
  "/admin/reports": "Reports",
};

function resolvePageTitle(pathname: string): string {
  // Exact match first
  if (BREADCRUMB_MAP[pathname]) return BREADCRUMB_MAP[pathname];
  // Prefix match — find the longest matching key
  const sorted = Object.keys(BREADCRUMB_MAP)
    .filter((key) => key !== "/admin" && pathname.startsWith(key))
    .sort((a, b) => b.length - a.length);
  return sorted.length > 0 ? BREADCRUMB_MAP[sorted[0]] : "Admin";
}

interface AdminHeaderProps {
  user: { name?: string | null; email?: string | null; image?: string | null };
}

export default function AdminHeader({ user }: AdminHeaderProps) {
  const pathname = usePathname();
  const { toggleMobile } = useAdminSidebar();
  const pageTitle = resolvePageTitle(pathname);
  const [isMac, setIsMac] = useState(false);
  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform));
  }, []);
  const triggerPalette = () => {
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }));
  };
  const initials = (user.name || user.email || "A")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="h-14 flex items-center justify-between px-4 md:px-6 border-b border-white/6 bg-[#0D1117]">
      <div className="flex items-center gap-2">
        <button
          onClick={toggleMobile}
          aria-label="Open menu"
          className="md:hidden w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white -ml-1 mr-1"
        >
          <Menu size={20} />
        </button>
        <span className="text-slate-500 text-sm hidden sm:inline">Admin</span>
        <span className="text-slate-600 hidden sm:inline">/</span>
        <span className="text-white text-sm font-medium">{pageTitle}</span>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={triggerPalette}
          aria-label="Open command palette"
          className="hidden sm:flex items-center gap-2 h-8 pl-2.5 pr-2 rounded-md border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] text-slate-400 hover:text-white text-xs transition-colors"
        >
          <Search size={14} />
          <span className="hidden md:inline">Search…</span>
          <kbd className="hidden md:inline text-[10px] border border-white/10 rounded px-1 py-0.5 ml-1">
            {isMac ? "⌘K" : "Ctrl K"}
          </kbd>
        </button>
        <UnreadMessagesBadge />
        <div className="w-8 h-8 rounded-full bg-teal/20 flex items-center justify-center text-teal text-xs font-bold">
          {initials}
        </div>
      </div>
      <CommandPalette />
    </header>
  );
}
