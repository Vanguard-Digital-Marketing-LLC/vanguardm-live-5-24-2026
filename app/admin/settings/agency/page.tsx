import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import AgencySettingsClient from "./AgencySettingsClient";

export const metadata = { title: "Agency Settings" };

export default async function AgencySettingsPage() {
  const session = await auth();
  if (!session?.user?.id || !session.user.agencyId) redirect("/auth/sign-in");
  if (session.user.role !== "ADMIN") redirect("/admin");

  const agency = await prisma.agency.findUnique({
    where: { id: session.user.agencyId },
    select: {
      id: true,
      name: true,
      slug: true,
      logoUrl: true,
      primaryColor: true,
      accentColor: true,
    },
  });

  if (!agency) redirect("/admin");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">Agency Settings</h1>
        <p className="text-sm text-slate-400 mt-1">Customize your agency branding</p>
      </div>

      <AgencySettingsClient agency={agency} />
    </div>
  );
}
