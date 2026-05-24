import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { resolveAgencyId } from "@/lib/resolve-agency";
import ExitPopupsManager from "@/components/admin/exit-popups/ExitPopupsManager";

export const dynamic = "force-dynamic";
export const metadata = { title: "Exit popups" };

export default async function ExitPopupsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/sign-in");
  if (session.user.role !== "ADMIN") redirect("/admin");

  const agencyId = await resolveAgencyId();
  if (!agencyId) redirect("/admin");

  const configs = await prisma.exitPopupConfig.findMany({
    where: { agencyId },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">Exit popups</h1>
        <p className="text-sm text-slate-400 mt-1">
          Configure the exit-intent popup shown to anonymous visitors.
        </p>
      </div>

      <ExitPopupsManager
        initial={configs.map((c) => ({
          id: c.id,
          headline: c.headline,
          description: c.description,
          ctaText: c.ctaText,
          ctaLink: c.ctaLink,
          offerType: c.offerType,
          isActive: c.isActive,
          showOnPaths: (c.showOnPaths as string[] | null) ?? null,
          updatedAt: c.updatedAt.toISOString(),
        }))}
      />
    </div>
  );
}
