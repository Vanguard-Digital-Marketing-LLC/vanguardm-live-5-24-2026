import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { resolveAgencyId } from "@/lib/resolve-agency";
import AdminSidebar from "@/components/admin/layout/AdminSidebar";
import AdminHeader from "@/components/admin/layout/AdminHeader";
import { AgencyProvider } from "@/contexts/AgencyContext";
import { AdminSidebarProvider } from "@/contexts/AdminSidebarContext";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | Admin — Vanguard Digital Marketing" },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/sign-in");

  const role = session.user.role ?? (session.user.isAdmin ? "ADMIN" : "USER");
  if (role !== "ADMIN" && role !== "TEAM") redirect("/dashboard");

  // Load plan tier so the sidebar can hide features the agency hasn't paid for.
  const agencyId = await resolveAgencyId();
  const agency = agencyId
    ? await prisma.agency.findUnique({
        where: { id: agencyId },
        select: { planTier: true },
      })
    : null;
  const planTier = agency?.planTier ?? "STARTER";

  return (
    <AgencyProvider>
      <AdminSidebarProvider>
        <div className="fixed inset-0 z-50 flex bg-[#0A0F1A]">
          <AdminSidebar role={role} planTier={planTier} />
          <div className="flex-1 flex flex-col min-w-0">
            <AdminHeader user={session.user} />
            <main className="flex-1 overflow-y-auto p-4 md:p-6">
              <div className="max-w-7xl mx-auto">{children}</div>
            </main>
          </div>
        </div>
      </AdminSidebarProvider>
    </AgencyProvider>
  );
}
