import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { getCourse, getFreeCourses, getPaidCourses } from "@/lib/academy-data";

export const metadata: Metadata = {
  title: "My Courses",
  description: "Your purchased courses.",
};

export default async function MyCoursesPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/sign-in");

  const [purchases, certificates, quizAttempts] = await Promise.all([
    prisma.coursePurchase.findMany({
      where: { userId: session.user.id },
      orderBy: { purchasedAt: "desc" },
    }),
    prisma.certificate.findMany({
      where: { userId: session.user.id },
    }),
    prisma.quizAttempt.findMany({
      where: { userId: session.user.id, passed: true },
      select: { courseSlug: true },
      distinct: ["courseSlug"],
    }),
  ]);

  const certSlugs = new Set(certificates.map((c) => c.courseSlug));
  const passedSlugs = new Set(quizAttempts.map((a) => a.courseSlug));
  const freeCourses = getFreeCourses();

  const user = session.user as Record<string, unknown>;
  const isTeamOrAdmin =
    user?.role === "ADMIN" || user?.role === "TEAM" || user?.isAdmin === true;

  return (
    <main className="pt-24">
      <section className="py-10 md:py-16 px-5 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
            <Link
              href="/dashboard"
              className="hover:text-emerald transition-colors"
            >
              Dashboard
            </Link>
            <span>/</span>
            <span className="text-slate-300">My Courses</span>
          </div>

          <h1 className="font-display text-2xl md:text-3xl font-bold mb-8">
            My Courses
          </h1>

          {/* Premium Courses — TEAM/ADMIN see all, others see purchases */}
          {isTeamOrAdmin ? (
            <div className="mb-10">
              <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-emerald mb-4">
                Premium Courses (Team Access)
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {getPaidCourses().map((course) => {
                  const hasCert = certSlugs.has(course.slug);
                  const hasPassed = passedSlugs.has(course.slug);

                  return (
                    <div key={course.slug} className="glass rounded-xl p-5">
                      <div className="flex items-start justify-between mb-3">
                        <span className="text-2xl">{course.icon}</span>
                        {hasCert ? (
                          <span className="text-[10px] font-display font-semibold uppercase px-2 py-0.5 rounded-full bg-emerald/10 text-emerald">
                            Certified
                          </span>
                        ) : hasPassed ? (
                          <span className="text-[10px] font-display font-semibold uppercase px-2 py-0.5 rounded-full bg-amber/10 text-amber">
                            Passed
                          </span>
                        ) : (
                          <span className="text-[10px] font-display font-semibold uppercase px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400">
                            Team Access
                          </span>
                        )}
                      </div>
                      <h3 className="font-display text-sm font-semibold mb-1">
                        {course.title}
                      </h3>
                      <p className="text-xs text-slate-400 mb-3 line-clamp-2">
                        {course.description}
                      </p>
                      <div className="flex gap-2">
                        <Link
                          href={`/academy/${course.slug}`}
                          className="text-xs text-emerald hover:underline"
                        >
                          View Course
                        </Link>
                        <Link
                          href={`/academy/${course.slug}/quiz`}
                          className="text-xs text-amber hover:underline"
                        >
                          {hasPassed ? "Retake Quiz" : "Take Quiz"}
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : purchases.length > 0 ? (
            <div className="mb-10">
              <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-emerald mb-4">
                Purchased Courses
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {purchases.map((purchase) => {
                  const course = getCourse(purchase.courseSlug);
                  if (!course) return null;
                  const hasCert = certSlugs.has(course.slug);
                  const hasPassed = passedSlugs.has(course.slug);

                  return (
                    <div key={purchase.id} className="glass rounded-xl p-5">
                      <div className="flex items-start justify-between mb-3">
                        <span className="text-2xl">{course.icon}</span>
                        {hasCert ? (
                          <span className="text-[10px] font-display font-semibold uppercase px-2 py-0.5 rounded-full bg-emerald/10 text-emerald">
                            Certified
                          </span>
                        ) : hasPassed ? (
                          <span className="text-[10px] font-display font-semibold uppercase px-2 py-0.5 rounded-full bg-amber/10 text-amber">
                            Passed
                          </span>
                        ) : (
                          <span className="text-[10px] font-display font-semibold uppercase px-2 py-0.5 rounded-full bg-white/5 text-slate-400">
                            In Progress
                          </span>
                        )}
                      </div>
                      <h3 className="font-display text-sm font-semibold mb-1">
                        {course.title}
                      </h3>
                      <p className="text-xs text-slate-400 mb-3 line-clamp-2">
                        {course.description}
                      </p>
                      <div className="flex gap-2">
                        <Link
                          href={`/academy/${course.slug}`}
                          className="text-xs text-emerald hover:underline"
                        >
                          View Course
                        </Link>
                        <Link
                          href={`/academy/${course.slug}/quiz`}
                          className="text-xs text-amber hover:underline"
                        >
                          {hasPassed ? "Retake Quiz" : "Take Quiz"}
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}

          {/* Free Courses */}
          <div>
            <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">
              Free Courses ({freeCourses.length} available)
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {freeCourses.map((course) => {
                const hasPassed = passedSlugs.has(course.slug);
                return (
                  <div key={course.slug} className="glass rounded-xl p-5">
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-2xl">{course.icon}</span>
                      <span className="text-[10px] font-display font-semibold uppercase px-2 py-0.5 rounded-full bg-emerald/10 text-emerald">
                        Free
                      </span>
                    </div>
                    <h3 className="font-display text-sm font-semibold mb-1">
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-400 mb-3 line-clamp-2">
                      {course.description}
                    </p>
                    <div className="flex gap-2">
                      <Link
                        href={`/academy/${course.slug}`}
                        className="text-xs text-emerald hover:underline"
                      >
                        View Course
                      </Link>
                      <Link
                        href={`/academy/${course.slug}/quiz`}
                        className="text-xs text-amber hover:underline"
                      >
                        {hasPassed ? "Retake Quiz" : "Take Quiz"}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {!isTeamOrAdmin && purchases.length === 0 && (
            <div className="glass rounded-xl p-8 text-center mt-6">
              <p className="text-sm text-slate-400 mb-4">
                You haven&apos;t purchased any premium courses yet.
              </p>
              <Link
                href="/academy"
                className="inline-block px-5 py-2.5 rounded-lg bg-emerald text-slate-950 font-display text-xs font-semibold uppercase tracking-wider hover:bg-emerald-400 transition-all"
              >
                Browse Academy
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
