import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { COURSES } from "@/lib/academy-data";
import AdminPanel from "./AdminPanel";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Manage users, leads, and course access.",
};

export default async function AdminPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/sign-in");
  if (!session.user.isAdmin) redirect("/dashboard");

  const [
    userCount,
    purchaseCount,
    certificateCount,
    contactCount,
    unreadContactCount,
    recentUsers,
    recentContacts,
    recentQuizAttempts,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.coursePurchase.count(),
    prisma.certificate.count(),
    prisma.contactSubmission.count(),
    prisma.contactSubmission.count({ where: { read: false } }),
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
      select: {
        id: true,
        name: true,
        email: true,
        isAdmin: true,
        createdAt: true,
        _count: { select: { coursePurchases: true, quizAttempts: true, certificates: true } },
      },
    }),
    prisma.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
      take: 15,
    }),
    prisma.quizAttempt.findMany({
      orderBy: { attemptedAt: "desc" },
      take: 10,
      include: { user: { select: { name: true, email: true } } },
    }),
  ]);

  const totalQuizAttempts = recentQuizAttempts.length;
  const passedQuizAttempts = recentQuizAttempts.filter((a) => a.passed).length;

  return (
    <main className="pt-24">
      <section className="py-10 md:py-16 px-5 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-2xl md:text-3xl font-bold">
                Admin Dashboard
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                Manage leads, users, and course access
              </p>
            </div>
            <Link
              href="/dashboard"
              className="text-xs text-slate-400 hover:text-emerald transition-colors"
            >
              Back to Dashboard
            </Link>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
            <div className="glass rounded-xl p-5 text-center">
              <div className="text-2xl font-display font-bold text-emerald">
                {userCount}
              </div>
              <p className="text-xs text-slate-400 mt-1">Total Users</p>
            </div>
            <div className="glass rounded-xl p-5 text-center relative">
              <div className="text-2xl font-display font-bold text-amber">
                {contactCount}
              </div>
              <p className="text-xs text-slate-400 mt-1">Contact Leads</p>
              {unreadContactCount > 0 && (
                <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {unreadContactCount} new
                </span>
              )}
            </div>
            <div className="glass rounded-xl p-5 text-center">
              <div className="text-2xl font-display font-bold text-cyan-400">
                {purchaseCount}
              </div>
              <p className="text-xs text-slate-400 mt-1">Course Grants</p>
            </div>
            <div className="glass rounded-xl p-5 text-center">
              <div className="text-2xl font-display font-bold text-purple-400">
                {certificateCount}
              </div>
              <p className="text-xs text-slate-400 mt-1">Certificates</p>
            </div>
            <div className="glass rounded-xl p-5 text-center">
              <div className="text-2xl font-display font-bold text-emerald">
                {totalQuizAttempts > 0
                  ? Math.round((passedQuizAttempts / totalQuizAttempts) * 100)
                  : 0}
                %
              </div>
              <p className="text-xs text-slate-400 mt-1">Quiz Pass Rate</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-8">
              {/* Contact Submissions / Leads */}
              <div className="glass rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display text-lg font-semibold">
                    Recent Leads
                    {unreadContactCount > 0 && (
                      <span className="ml-2 text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full">
                        {unreadContactCount} unread
                      </span>
                    )}
                  </h2>
                </div>
                {recentContacts.length === 0 ? (
                  <p className="text-sm text-slate-500">No contact submissions yet.</p>
                ) : (
                  <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                    {recentContacts.map((contact) => (
                      <div
                        key={contact.id}
                        className={`p-3 rounded-lg transition-colors ${
                          contact.read
                            ? "bg-white/5"
                            : "bg-amber/5 border border-amber/20"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-slate-200 truncate">
                              {contact.name}
                              {!contact.read && (
                                <span className="ml-1.5 inline-block w-2 h-2 bg-amber rounded-full" />
                              )}
                            </p>
                            <p className="text-xs text-slate-400 truncate">
                              {contact.email}
                              {contact.phone && ` · ${contact.phone}`}
                            </p>
                            {contact.company && (
                              <p className="text-xs text-slate-500">{contact.company}</p>
                            )}
                          </div>
                          <div className="text-right flex-shrink-0">
                            {contact.service && (
                              <span className="text-[10px] bg-emerald/10 text-emerald px-1.5 py-0.5 rounded">
                                {contact.service}
                              </span>
                            )}
                            <p className="text-[10px] text-slate-600 mt-1">
                              {new Date(contact.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                          {contact.message}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Grant Course Access */}
              <AdminPanel courses={COURSES} />
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Recent Users */}
              <div className="glass rounded-xl p-6">
                <h2 className="font-display text-lg font-semibold mb-4">
                  Recent Users
                </h2>
                <div className="space-y-2">
                  {recentUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-white/5"
                    >
                      <div className="min-w-0">
                        <p className="text-sm text-slate-200 truncate">
                          {user.name || "—"}{" "}
                          {user.isAdmin && (
                            <span className="text-[10px] bg-emerald/20 text-emerald px-1.5 py-0.5 rounded">
                              Admin
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-slate-500 truncate">{user.email}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-xs text-slate-400">
                          {user._count.coursePurchases} courses · {user._count.quizAttempts} quizzes · {user._count.certificates} certs
                        </p>
                        <p className="text-[10px] text-slate-600">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Quiz Attempts */}
              <div className="glass rounded-xl p-6">
                <h2 className="font-display text-lg font-semibold mb-4">
                  Recent Quiz Attempts
                </h2>
                {recentQuizAttempts.length === 0 ? (
                  <p className="text-sm text-slate-500">No quiz attempts yet.</p>
                ) : (
                  <div className="space-y-2">
                    {recentQuizAttempts.map((attempt) => (
                      <div
                        key={attempt.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-white/5"
                      >
                        <div className="min-w-0">
                          <p className="text-sm text-slate-200 truncate">
                            {attempt.user.name || attempt.user.email}
                          </p>
                          <p className="text-xs text-slate-500">{attempt.courseSlug}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <span
                            className={`text-sm font-bold ${
                              attempt.passed ? "text-emerald" : "text-red-400"
                            }`}
                          >
                            {attempt.score}/{attempt.totalQuestions}
                          </span>
                          <p className="text-[10px] text-slate-600">
                            {attempt.passed ? "Passed" : "Failed"} ·{" "}
                            {new Date(attempt.attemptedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
