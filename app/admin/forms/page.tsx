import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { resolveAgencyId } from "@/lib/resolve-agency";
import FormsListClient from "@/components/admin/forms/FormsListClient";

export const dynamic = "force-dynamic";
export const metadata = { title: "Multi-step forms" };

export default async function FormsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/sign-in");
  const role = session.user.role ?? (session.user.isAdmin ? "ADMIN" : "USER");
  if (role !== "ADMIN" && role !== "TEAM") redirect("/admin");

  const agencyId = await resolveAgencyId();
  if (!agencyId) redirect("/auth/sign-in");

  const forms = await prisma.multiStepForm.findMany({
    where: { agencyId },
    orderBy: { updatedAt: "desc" },
    include: { _count: { select: { responses: true } } },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Multi-step forms</h1>
          <p className="text-sm text-slate-400 mt-1">
            Public-facing lead capture forms. Responses link to leads automatically.
          </p>
        </div>
      </div>

      <FormsListClient
        canCreate={role === "ADMIN"}
        initial={forms.map((f) => ({
          id: f.id,
          name: f.name,
          slug: f.slug,
          isActive: f.isActive,
          stepCount: Array.isArray(f.steps) ? f.steps.length : 0,
          responseCount: f._count.responses,
          updatedAt: f.updatedAt.toISOString(),
        }))}
      />
    </div>
  );
}
