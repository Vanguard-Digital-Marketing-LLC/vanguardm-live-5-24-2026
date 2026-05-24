import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { COURSES, getCourse } from "@/lib/academy-data";
import { getQuizQuestions } from "@/lib/quizzes";
import QuizComponent from "@/components/academy/QuizComponent";
import CourseAccessGate from "@/components/academy/CourseAccessGate";
import Link from "next/link";

export function generateStaticParams() {
  return COURSES.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) return {};
  return {
    title: `${course.tier === "paid" ? "Exam" : "Quiz"}: ${course.title}`,
    description: `Test your knowledge of ${course.title}. ${course.tier === "paid" ? "Certification exam" : "Practice quiz"} from Vanguard Academy.`,
    alternates: { canonical: `/academy/${slug}/quiz` },
    robots: { index: false, follow: true },
  };
}

export default async function QuizPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  const questions = getQuizQuestions(slug);

  return (
    <main className="pt-24">
      <section className="py-8 md:py-12 px-5 md:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
            <Link
              href="/academy"
              className="hover:text-emerald transition-colors"
            >
              Academy
            </Link>
            <span>/</span>
            <Link
              href={`/academy/${course.slug}`}
              className="hover:text-emerald transition-colors"
            >
              {course.title}
            </Link>
            <span>/</span>
            <span className="text-slate-300">
              {course.tier === "paid" ? "Exam" : "Quiz"}
            </span>
          </div>

          <div className="text-center mb-8">
            <h1 className="font-display text-2xl md:text-3xl font-bold mb-2">
              {course.icon} {course.title}{" "}
              {course.tier === "paid" ? "Exam" : "Quiz"}
            </h1>
            <p className="text-sm text-slate-400">
              {course.examQuestionCount} questions &middot; 70% to pass
              {course.certificate && " \u00B7 Earn a certificate"}
            </p>
          </div>

          <CourseAccessGate course={course}>
            {questions.length > 0 ? (
              <QuizComponent
                questions={questions}
                courseTitle={course.title}
                courseSlug={course.slug}
              />
            ) : (
              <div className="glass rounded-2xl p-8 text-center">
                <p className="text-slate-400">
                  {course.tier === "paid" ? "Exam" : "Quiz"} coming soon.
                </p>
              </div>
            )}
          </CourseAccessGate>
        </div>
      </section>
    </main>
  );
}
