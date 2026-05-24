"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAgency } from "@/contexts/AgencyContext";
import { useAdminSidebar } from "@/contexts/AdminSidebarContext";
import { PLAN_FEATURES } from "@/lib/plan-features";
import type { PlanTier } from "@/lib/generated/prisma/client";
import {
  LayoutDashboard,
  Building2,
  FolderKanban,
  KanbanSquare,
  LifeBuoy,
  MessageSquare,
  UserCog,
  GraduationCap,
  Settings,
  ChevronLeft,
  CreditCard,
  ChevronRight,
  ClipboardList,
  Newspaper,
  BarChart3,
  Mail,
  X,
  Search,
  FileText,
  Share2,
  ListChecks,
  MousePointerClick,
  Bot,
} from "lucide-react";

interface NavItem {
  label: string;
  icon: typeof LayoutDashboard;
  href: string;
  adminOnly: boolean;
  feature?: string; // PLAN_FEATURES key — hide when not in plan
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    label: "Dashboard",
    items: [
      { label: "Overview", icon: LayoutDashboard, href: "/admin", adminOnly: true },
    ],
  },
  {
    label: "CRM",
    items: [
      { label: "Clients", icon: Building2, href: "/admin/clients", adminOnly: true, feature: "clients" },
      { label: "Onboarding", icon: ClipboardList, href: "/admin/onboarding", adminOnly: true, feature: "onboarding" },
      { label: "Leads", icon: MessageSquare, href: "/admin/leads", adminOnly: true, feature: "leads" },
      { label: "Forms", icon: ListChecks, href: "/admin/forms", adminOnly: true, feature: "leads" },
      { label: "Exit popups", icon: MousePointerClick, href: "/admin/exit-popups", adminOnly: true, feature: "leads" },
    ],
  },
  {
    label: "Work",
    items: [
      { label: "Projects", icon: FolderKanban, href: "/admin/projects", adminOnly: true },
      { label: "Tasks", icon: KanbanSquare, href: "/admin/tasks", adminOnly: false },
      { label: "Tickets", icon: LifeBuoy, href: "/admin/tickets", adminOnly: false },
    ],
  },
  {
    label: "Finance",
    items: [
      { label: "Payments", icon: CreditCard, href: "/admin/payments", adminOnly: true },
      { label: "Reports", icon: BarChart3, href: "/admin/reports", adminOnly: true, feature: "reports" },
    ],
  },
  {
    label: "SEO & Marketing",
    items: [
      { label: "Keywords", icon: Search, href: "/admin/seo/keywords", adminOnly: true },
      { label: "Content", icon: FileText, href: "/admin/seo/content", adminOnly: true },
      { label: "Social Media", icon: Share2, href: "/admin/seo/social", adminOnly: true },
    ],
  },
  {
    label: "AI",
    items: [
      { label: "Agent runs", icon: Bot, href: "/admin/agents", adminOnly: true, feature: "agent" },
    ],
  },
  {
    label: "Content",
    items: [
      { label: "Blog", icon: Newspaper, href: "/admin/blog", adminOnly: true, feature: "blog" },
      { label: "Academy", icon: GraduationCap, href: "/admin/academy", adminOnly: true },
    ],
  },
  {
    label: "Admin",
    items: [
      { label: "Team", icon: UserCog, href: "/admin/team", adminOnly: true },
      { label: "Invites", icon: Mail, href: "/admin/invites", adminOnly: true },
      { label: "Settings", icon: Settings, href: "/admin/settings", adminOnly: true },
    ],
  },
];

export default function AdminSidebar({
  role,
  planTier = "STARTER",
}: {
  role: string;
  planTier?: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const pathname = usePathname();
  const agency = useAgency();
  const { isMobileOpen, closeMobile } = useAdminSidebar();

  // Close mobile drawer on route change
  useEffect(() => {
    closeMobile();
  }, [pathname, closeMobile]);

  const planFeatures = PLAN_FEATURES[planTier as PlanTier] ?? PLAN_FEATURES.STARTER;

  const visibleGroups = NAV_GROUPS.map((group) => ({
    ...group,
    items: group.items.filter((item) => {
      // Plan-tier gate first
      if (item.feature && !planFeatures.has(item.feature)) return false;
      if (role === "ADMIN") return true;
      if (role === "TEAM") {
        return ["/admin", "/admin/tasks", "/admin/tickets"].includes(item.href);
      }
      return !item.adminOnly;
    }),
  })).filter((group) => group.items.length > 0);

  const navContent = (showLabels: boolean) => (
    <>
      <div className="h-14 flex items-center justify-center border-b border-white/6 px-3">
        {agency.logoUrl && showLabels ? (
          <img src={agency.logoUrl} alt={agency.name} className="h-8 max-w-[200px] object-contain" />
        ) : (
          <span className="font-display font-bold text-lg" style={{ color: agency.primaryColor || "#10b981" }}>
            {showLabels ? agency.name : agency.name.charAt(0)}
          </span>
        )}
      </div>

      <nav className="flex-1 py-3 px-2 overflow-y-auto">
        {visibleGroups.map((group, gi) => (
          <div key={group.label} className={gi > 0 ? "mt-4" : ""}>
            {showLabels && (
              <p className="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-slate-600">
                {group.label}
              </p>
            )}
            {!showLabels && gi > 0 && (
              <div className="mx-3 mb-2 border-t border-white/6" />
            )}
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const isActive =
                  item.href === "/admin"
                    ? pathname === "/admin"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                      isActive
                        ? "bg-teal/10 text-white border-l-2 border-teal"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                    title={!showLabels ? item.label : undefined}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <item.icon size={18} className="flex-shrink-0" />
                    {showLabels && <span className="font-body">{item.label}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        role="navigation"
        aria-label="Admin navigation"
        className={`relative hidden md:flex flex-col bg-[#0D1117] border-r border-white/6 transition-all duration-200 ${
          expanded ? "w-60" : "w-16"
        }`}
      >
        {navContent(expanded)}
        <button
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          aria-label="Toggle sidebar"
          className="absolute -right-3 top-20 w-6 h-6 bg-slate-800 border border-white/10 rounded-full flex items-center justify-center text-slate-400 hover:text-white z-10"
        >
          {expanded ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
        </button>
      </aside>

      {/* Mobile drawer overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={closeMobile}
            aria-hidden="true"
          />
          {/* Drawer */}
          <aside
            role="navigation"
            aria-label="Admin navigation"
            className="relative flex flex-col w-64 h-full bg-[#0D1117] border-r border-white/6"
          >
            <button
              onClick={closeMobile}
              aria-label="Close menu"
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white z-10"
            >
              <X size={18} />
            </button>
            {navContent(true)}
          </aside>
        </div>
      )}
    </>
  );
}
