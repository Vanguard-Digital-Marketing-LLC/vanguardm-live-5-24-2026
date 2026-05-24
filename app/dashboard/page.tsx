import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { getCourse } from "@/lib/academy-data";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your Vanguard Academy dashboard.",
};

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/sign-in");

  const [purchases, recentAttempts, certificates] = await Promise.all([
    prisma.coursePurchase.findMany({
      where: { userId: session.user.id },
      orderBy: { purchasedAt: "desc" },
    }),
    prisma.quizAttempt.findMany({
      where: { userId: session.user.id },
      orderBy: { attemptedAt: "desc" },
      take: 5,
    }),
    prisma.certificate.findMany({
      where: { userId: session.user.id },
      orderBy: { issuedAt: "desc" },
    }),
  ]);

  return (
    <main className="pt-24">
      <section className="py-10 md:py-16 px-5 md:px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="font-display text-2xl md:text-3xl font-bold mb-2">
            Welcome back, {session.user.name || "Student"}
          </h1>
          <p className="text-sm text-slate-400 mb-10">
            Your learning dashboard at a glance.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            <div className="glass rounded-xl p-5 text-center">
              <div className="text-2xl font-display font-bold text-emerald">
                {purchases.length}
              </div>
              <p className="text-xs text-slate-400 mt-1">Courses Purchased</p>
            </div>
            <div className="glass rounded-xl p-5 text-center">
              <div className="text-2xl font-display font-bold text-amber">
                {recentAttempts.length}
              </div>
              <p className="text-xs text-slate-400 mt-1">Quiz Attempts</p>
            </div>
            <div className="glass rounded-xl p-5 text-center">
              <div className="text-2xl font-display font-bold text-cyan-400">
                {certificates.length}
              </div>
              <p className="text-xs text-slate-400 mt-1">Certificates</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Recent Quiz Attempts */}
            <div>
              <h2 className="font-display text-lg font-semibold mb-4">
                Recent Quiz Attempts
              </h2>
              {recentAttempts.length === 0 ? (
                <div className="glass rounded-xl p-6 text-center">
                  <p className="text-sm text-slate-400">
                    No quiz attempts yet.{" "}
                    <Link
                      href="/academy"
                      className="text-emerald hover:underline"
                    >
                      Browse courses
                    </Link>
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentAttempts.map((attempt) => {
                    const course = getCourse(attempt.courseSlug);
                    return (
                      <div
                        key={attempt.id}
                        className="glass rounded-xl p-4 flex items-center justify-between"
                      >
                        <div>
                          <p className="text-sm font-semibold text-slate-200">
                            {course?.icon} {course?.title || attempt.courseSlug}
                          </p>
                          <p className="text-xs text-slate-500">
                            {new Date(attempt.attemptedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <span
                            className={`text-sm font-bold ${attempt.passed ? "text-emerald" : "text-amber"}`}
                          >
                            {attempt.score}/{attempt.totalQuestions}
                          </span>
                          <p className="text-[10px] text-slate-500">
                            {attempt.passed ? "Passed" : "Not passed"}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Certificates */}
            <div>
              <h2 className="font-display text-lg font-semibold mb-4">
                Certificates
              </h2>
              {certificates.length === 0 ? (
                <div className="glass rounded-xl p-6 text-center">
                  <p className="text-sm text-slate-400">
                    Pass a quiz to earn your first certificate.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {certificates.map((cert) => {
                    const course = getCourse(cert.courseSlug);
                    return (
                      <Link
                        key={cert.id}
                        href={`/certificate/${cert.certificateNumber}`}
                        className="glass rounded-xl p-4 flex items-center justify-between block hover:border-emerald/20 transition-colors"
                      >
                        <div>
                          <p className="text-sm font-semibold text-slate-200">
                            {course?.icon} {course?.title || cert.courseSlug}
                          </p>
                          <p className="text-xs text-slate-500">
                            Issued{" "}
                            {new Date(cert.issuedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <span className="text-xs text-emerald font-display font-semibold">
                          View
                        </span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-10 flex flex-wrap gap-3 justify-center">
            <Link
              href="/dashboard/courses"
              className="px-5 py-2.5 rounded-lg border border-emerald/30 text-emerald font-display text-xs font-semibold uppercase tracking-wider hover:bg-emerald/10 transition-all"
            >
              My Courses
            </Link>
            <Link
              href="/academy"
              className="px-5 py-2.5 rounded-lg border border-white/10 text-slate-300 font-display text-xs font-semibold uppercase tracking-wider hover:bg-white/5 transition-all"
            >
              Browse Academy
            </Link>
            {session.user.isAdmin && (
              <Link
                href="/dashboard/admin"
                className="px-5 py-2.5 rounded-lg border border-amber/30 text-amber font-display text-xs font-semibold uppercase tracking-wider hover:bg-amber/10 transition-all"
              >
                Admin Panel
              </Link>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
