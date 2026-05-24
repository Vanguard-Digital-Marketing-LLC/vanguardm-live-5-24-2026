import { redirect } from "next/navigation";
import { Suspense } from "react";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { resolveAgencyId } from "@/lib/resolve-agency";
import type { Prisma } from "@/lib/generated/prisma/client";
import { GraduationCap, Target, BarChart3, Award } from "lucide-react";
import MetricCard from "@/components/admin/shared/MetricCard";
import SearchFilter from "@/components/shared/SearchFilter";
import Pagination from "@/components/shared/Pagination";

export const metadata = { title: "Academy Analytics" };

export default async function AcademyPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; limit?: string; q?: string; status?: string }>;
}) {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/sign-in");

  const agencyId = await resolveAgencyId();
  if (!agencyId) redirect("/auth/sign-in");

  const { page: pageStr, limit: limitStr, q } = await searchParams;
  const page = Math.max(1, parseInt(pageStr || "1"));
  const limit = Math.max(1, Math.min(100, parseInt(limitStr || "20")));

  const where: Prisma.QuizAttemptWhereInput = { user: { agencyId } };
  if (q) {
    where.user = {
      agencyId,
      OR: [
        { name: { contains: q, mode: "insensitive" } },
        { email: { contains: q, mode: "insensitive" } },
      ],
    };
  }

  let totalAttempts = 0, passedAttempts = 0, certificates = 0, filteredCount = 0;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let allScores: any[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let recentAttempts: any[] = [];
  let pageError = false;

  try {
    [totalAttempts, passedAttempts, certificates, allScores, filteredCount, recentAttempts] = await Promise.all([
      prisma.quizAttempt.count({ where: { user: { agencyId } } }),
      prisma.quizAttempt.count({ where: { user: { agencyId }, passed: true } }),
      prisma.certificate.count({ where: { user: { agencyId } } }),
      prisma.quizAttempt.findMany({ where: { user: { agencyId } }, select: { score: true, totalQuestions: true } }),
      prisma.quizAttempt.count({ where }),
      prisma.quizAttempt.findMany({
        where,
        orderBy: { attemptedAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          user: { select: { id: true, name: true, email: true } },
          certificate: { select: { id: true, certificateNumber: true } },
        },
      }),
    ]);
  } catch {
    pageError = true;
  }

  const passRate = totalAttempts > 0 ? Math.round((passedAttempts / totalAttempts) * 100) : 0;
  const avgScore = allScores.length > 0
    ? Math.round(allScores.reduce((sum: number, a: { score: number; totalQuestions: number }) => sum + (a.score / a.totalQuestions) * 100, 0) / allScores.length)
    : 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">Academy Analytics</h1>
        <p className="text-sm text-slate-400 mt-1">Course completions, scores, and certificates</p>
      </div>

      {pageError && (
        <div className="p-4 rounded-xl bg-red-400/10 border border-red-400/20 text-sm text-red-400">
          Failed to load academy data. Try refreshing the page.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Total Attempts" value={totalAttempts} icon={GraduationCap} accent="emerald" />
        <MetricCard label="Pass Rate" value={`${passRate}%`} icon={Target} accent="emerald" />
        <MetricCard label="Avg Score" value={`${avgScore}%`} icon={BarChart3} accent="cyan" />
        <MetricCard label="Certificates Issued" value={certificates} icon={Award} accent="amber" />
      </div>

      <Suspense>
        <SearchFilter placeholder="Search by student name or email..." />
      </Suspense>

      <div className="bg-[#111827] border border-white/6 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/6">
          <h2 className="font-display text-base font-semibold text-white">All Quiz Attempts ({filteredCount})</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/6">
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Student</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Course</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Score</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Certificate</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentAttempts.map((attempt) => (
                <tr key={attempt.id} className="border-b border-white/4 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3">
                    <p className="text-sm text-white">{attempt.user.name || "—"}</p>
                    <p className="text-xs text-slate-500">{attempt.user.email}</p>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-300">{attempt.courseSlug}</td>
                  <td className="px-4 py-3 text-sm font-medium text-white">
                    {attempt.score}/{attempt.totalQuestions} ({Math.round((attempt.score / attempt.totalQuestions) * 100)}%)
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${
                      attempt.passed ? "bg-emerald/10 text-emerald" : "bg-red-400/10 text-red-400"
                    }`}>
                      {attempt.passed ? "Passed" : "Failed"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-400">
                    {attempt.certificate ? attempt.certificate.certificateNumber : "—"}
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-500">{new Date(attempt.attemptedAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Suspense>
          <Pagination totalCount={filteredCount} page={page} limit={limit} />
        </Suspense>
      </div>
    </div>
  );
}
