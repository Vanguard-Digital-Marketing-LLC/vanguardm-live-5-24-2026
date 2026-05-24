import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import PortalSidebar from "@/components/portal/PortalSidebar";
import PortalHeader from "@/components/portal/PortalHeader";
import { AgencyProvider } from "@/contexts/AgencyContext";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { default: "Client Portal", template: "%s | Client Portal — Vanguard Digital Marketing" },
  robots: { index: false, follow: false },
};

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/sign-in");
  if (session.user.role !== "CLIENT") redirect("/dashboard");
  if (!session.user.clientId) redirect("/dashboard");

  // Check onboarding from DB (bypasses stale JWT issues)
  const [portalUser, client] = await Promise.all([
    prisma.user.findUnique({
      where: { id: session.user.id },
      select: { portalOnboarded: true },
    }),
    prisma.client.findUnique({
      where: { id: session.user.clientId },
      select: { name: true },
    }),
  ]);

  // Redirect un-onboarded clients to onboarding (outside /portal to avoid loop)
  if (portalUser && !portalUser.portalOnboarded) {
    redirect("/client-onboarding");
  }

  const clientName = client?.name || "Client Portal";

  return (
    <AgencyProvider>
      <div className="fixed inset-0 z-50 flex bg-[#0A0F1A]">
        <PortalSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <PortalHeader user={session.user} clientName={clientName} />
          <main className="flex-1 overflow-y-auto p-6">
            <div className="max-w-7xl mx-auto">{children}</div>
          </main>
        </div>
      </div>
    </AgencyProvider>
  );
}
