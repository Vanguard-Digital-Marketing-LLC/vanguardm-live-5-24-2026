import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { resolveAgencyId } from "@/lib/resolve-agency";
import FormDetailEditor from "@/components/admin/forms/FormDetailEditor";
import { ChevronLeft } from "lucide-react";

export const dynamic = "force-dynamic";
export const metadata = { title: "Form detail" };

type Props = { params: Promise<{ id: string }> };

export default async function FormDetailPage({ params }: Props) {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/sign-in");
  const role = session.user.role ?? (session.user.isAdmin ? "ADMIN" : "USER");
  if (role !== "ADMIN" && role !== "TEAM") redirect("/admin");

  const agencyId = await resolveAgencyId();
  if (!agencyId) redirect("/auth/sign-in");

  const { id } = await params;

  const form = await prisma.multiStepForm.findFirst({
    where: { id, agencyId },
    include: {
      _count: { select: { responses: true } },
      responses: {
        orderBy: { createdAt: "desc" },
        take: 50,
        include: {
          lead: { select: { id: true, name: true, email: true } },
        },
      },
    },
  });

  if (!form) notFound();

  return (
    <div className="space-y-6">
      <Link
        href="/admin/forms"
        className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white"
      >
        <ChevronLeft size={16} /> Back to forms
      </Link>

      <div>
        <h1 className="font-display text-2xl font-bold text-white">{form.name}</h1>
        <p className="text-sm text-slate-400 mt-1">
          Public URL: <span className="font-mono text-emerald-400">/forms/{form.slug}</span>
        </p>
      </div>

      <FormDetailEditor
        canEdit={role === "ADMIN"}
        form={{
          id: form.id,
          name: form.name,
          slug: form.slug,
          isActive: form.isActive,
          steps: JSON.stringify(form.steps, null, 2),
        }}
      />

      <div className="bg-[#111827] border border-white/6 rounded-xl p-6">
        <h2 className="font-display text-base font-semibold text-white mb-4">
          Recent responses ({form._count.responses})
        </h2>
        {form.responses.length === 0 ? (
          <p className="text-sm text-slate-500">No responses yet.</p>
        ) : (
          <div className="space-y-3">
            {form.responses.map((r) => (
              <div key={r.id} className="p-3 rounded-lg bg-white/5">
                <div className="flex items-center justify-between">
                  <div className="min-w-0">
                    {r.lead ? (
                      <Link
                        href={`/admin/leads/${r.lead.id}`}
                        className="text-sm text-white hover:text-emerald-400 truncate block"
                      >
                        {r.lead.name} <span className="text-slate-500">· {r.lead.email}</span>
                      </Link>
                    ) : (
                      <p className="text-sm text-slate-400">Anonymous response</p>
                    )}
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {r.completedSteps} step{r.completedSteps === 1 ? "" : "s"} ·{" "}
                      {r.isComplete ? "Complete" : "Partial"} ·{" "}
                      {new Date(r.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <pre className="mt-2 text-xs text-slate-400 whitespace-pre-wrap break-words font-mono max-h-40 overflow-y-auto">
                  {JSON.stringify(r.data, null, 2)}
                </pre>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
