import { auth } from "@/auth";
import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { resolveAgencyId } from "@/lib/resolve-agency";
import Link from "next/link";
import { ArrowLeft, Send, ExternalLink, Copy, Clock, User, Mail } from "lucide-react";
import OnboardingStatusBadge from "@/components/admin/onboarding/OnboardingStatusBadge";
import OnboardingDetailClient from "./OnboardingDetailClient";

export const metadata = { title: "Onboarding Detail | Admin" };

export default async function OnboardingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/sign-in");

  const agencyId = await resolveAgencyId();
  if (!agencyId) redirect("/auth/sign-in");

  const { id } = await params;
  const onboarding = await prisma.clientOnboarding.findFirst({
    where: { id, client: { agencyId } },
    include: {
      client: { select: { id: true, name: true, email: true } },
      createdBy: { select: { id: true, name: true } },
      responses: true,
      files: {
        select: {
          id: true,
          category: true,
          fileName: true,
          mimeType: true,
          fileSize: true,
          createdAt: true,
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!onboarding) notFound();

  // Build responses map
  const responsesMap: Record<string, Record<string, unknown>> = {};
  for (const r of onboarding.responses) {
    responsesMap[r.stepKey] = r.data as Record<string, unknown>;
  }

  const headersList = await headers();
  const agencySlug = headersList.get("x-agency-slug");
  const baseUrl = agencySlug
    ? `https://${agencySlug}.vanguardm.com`
    : (process.env.NEXTAUTH_URL || "https://vanguardm.com");
  const clientLink = `${baseUrl}/onboarding/${onboarding.token}`;
  const isExpired = onboarding.tokenExpiresAt < new Date();

  return (
    <div className="space-y-6">
      {/* Back + header */}
      <Link
        href="/admin/onboarding"
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft size={14} />
        Back to Onboarding
      </Link>

      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-white font-display">
              {onboarding.client.name}
            </h1>
            <OnboardingStatusBadge status={onboarding.status} />
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Created by {onboarding.createdBy.name || "—"} on{" "}
            {new Date(onboarding.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {onboarding.serviceTypes.map((s) => (
            <span
              key={s}
              className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Token link */}
        <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4 space-y-2 md:col-span-2">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <ExternalLink size={12} />
            Client Link
          </div>
          <div className="flex items-center gap-2">
            <code className="flex-1 text-xs text-slate-300 bg-white/5 px-3 py-2 rounded-lg truncate">
              {clientLink}
            </code>
            <OnboardingDetailClient
              onboardingId={onboarding.id}
              clientLink={clientLink}
              hasEmail={!!onboarding.respondentEmail}
              status={onboarding.status}
            />
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Clock size={10} />
              {isExpired ? (
                <span className="text-red-400">Expired</span>
              ) : (
                `Expires ${onboarding.tokenExpiresAt.toLocaleDateString()}`
              )}
            </span>
            {onboarding.submittedAt && (
              <span className="flex items-center gap-1">
                <Send size={10} />
                Submitted {onboarding.submittedAt.toLocaleDateString()}
              </span>
            )}
          </div>
        </div>

        {/* Respondent */}
        <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4 space-y-2">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <User size={12} />
            Respondent
          </div>
          <p className="text-sm text-white">
            {onboarding.respondentName || "Not set"}
          </p>
          {onboarding.respondentEmail && (
            <p className="flex items-center gap-1 text-xs text-slate-400">
              <Mail size={10} />
              {onboarding.respondentEmail}
            </p>
          )}
        </div>
      </div>

      {/* Wizard (admin mode) */}
      <div className="bg-white/[0.02] border border-white/5 rounded-xl p-6">
        <OnboardingDetailClient
          onboardingId={onboarding.id}
          clientLink={clientLink}
          hasEmail={!!onboarding.respondentEmail}
          status={onboarding.status}
          wizardProps={{
            onboardingId: onboarding.id,
            clientName: onboarding.client.name,
            serviceTypes: onboarding.serviceTypes,
            initialResponses: responsesMap,
            initialFiles: onboarding.files.map((f) => ({
              ...f,
              createdAt: f.createdAt.toISOString(),
            })),
            initialStep: onboarding.currentStep,
            mode: "admin" as const,
          }}
        />
      </div>
    </div>
  );
}
