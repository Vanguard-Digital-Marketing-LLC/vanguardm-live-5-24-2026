import { SITE_URL } from "@/lib/site-config";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { COURSES, getCourse } from "@/lib/academy-data";
import { getLessonContent } from "@/lib/lessons";
import CourseAccessGate from "@/components/academy/CourseAccessGate";
import Button from "@/components/ui/Button";
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
    title: course.title,
    description: course.longDescription.slice(0, 155),
    alternates: { canonical: `/academy/${slug}` },
    openGraph: {
      title: `${course.title} | Vanguard Academy`,
      description: course.longDescription.slice(0, 155),
      url: `/academy/${slug}`,
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: `${course.title} - Vanguard Academy` }],
    },
    twitter: {
      card: "summary_large_image" as const,
      title: `${course.title} | Vanguard Academy`,
      description: course.longDescription.slice(0, 155),
    },
  };
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  const LessonComponent = getLessonContent(slug);

  const courseIndex = COURSES.findIndex((c) => c.slug === slug);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
      { "@type": "ListItem", "position": 2, "name": "Academy", "item": `${SITE_URL}/academy` },
      { "@type": "ListItem", "position": 3, "name": course.title }
    ]
  };

  return (
    <main className="pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <section className="py-10 md:py-16 px-5 md:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-2 text-xs text-slate-500 mb-6 md:mb-8">
            <Link
              href="/academy"
              className="hover:text-emerald transition-colors"
            >
              Academy
            </Link>
            <span>/</span>
            <span className="text-slate-300">{course.category}</span>
          </div>

          {/* Header */}
          <div className="mb-10 md:mb-14 text-center">
            <div className="flex flex-wrap items-center justify-center gap-3 mb-3">
              <span className="text-2xl md:text-3xl">{course.icon}</span>
              {course.tier === "paid" && (
                <span className="text-[10px] font-display font-semibold uppercase px-2 py-0.5 rounded-full bg-amber/10 text-amber">
                  Premium
                </span>
              )}
              <span
                className={`text-[10px] font-display font-semibold uppercase px-2 py-0.5 rounded-full ${
                  course.difficulty === "Beginner"
                    ? "bg-emerald/10 text-emerald"
                    : course.difficulty === "Intermediate"
                      ? "bg-amber/10 text-amber"
                      : "bg-red-500/10 text-red-400"
                }`}
              >
                {course.difficulty}
              </span>
              <span className="text-[10px] font-display text-slate-500">
                {course.duration}
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-[10px] font-display text-slate-500">
                {course.lessonCount} lessons
              </span>
            </div>
            <h1 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-5">
              {course.title}
            </h1>
            <p className="text-sm md:text-base text-slate-400 leading-relaxed mb-6 md:mb-8 max-w-3xl mx-auto">
              {course.longDescription}
            </p>

            {/* What You'll Learn + Prerequisites sidebar */}
            <div className="grid md:grid-cols-2 gap-5 md:gap-6">
              <div className="glass rounded-xl p-5 md:p-6">
                <h3 className="font-display text-sm font-semibold text-emerald mb-3">
                  What You&apos;ll Learn
                </h3>
                <ul className="space-y-2">
                  {course.whatYouWillLearn.slice(0, 5).map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs md:text-sm text-slate-300">
                      <span className="text-emerald mt-0.5 shrink-0">&#10003;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                  {course.whatYouWillLearn.length > 5 && (
                    <li className="text-xs text-slate-500">
                      +{course.whatYouWillLearn.length - 5} more covered in the lesson below
                    </li>
                  )}
                </ul>
              </div>

              <div className="space-y-4">
                <div className="glass rounded-xl p-5 md:p-6">
                  <h3 className="font-display text-sm font-semibold text-amber mb-3">
                    Topics Covered
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {course.topics.map((topic) => (
                      <span key={topic} className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-slate-400">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="glass rounded-xl p-5 md:p-6">
                  <h3 className="font-display text-sm font-semibold text-slate-300 mb-2">
                    Prerequisites
                  </h3>
                  <ul className="space-y-1">
                    {course.prerequisites.map((prereq) => (
                      <li key={prereq} className="text-xs md:text-sm text-slate-400">
                        &rarr; {prereq}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/5 mb-10 md:mb-14" />

          {/* Lesson content — gated for paid courses */}
          <CourseAccessGate course={course}>
            <article className="prose-custom space-y-6 md:space-y-8">
              {LessonComponent ? (
                <LessonComponent />
              ) : (
                <p className="text-slate-400">Lesson content coming soon.</p>
              )}
            </article>

            {/* Quiz CTA — inside gate, only visible when content is accessible */}
            <div className="mt-16 md:mt-20 section-bg rounded-2xl p-6 md:p-8 text-center">
              <h2 className="font-display text-xl md:text-2xl font-bold mb-2">
                Ready to Test Your Knowledge?
              </h2>
              <p className="text-sm text-slate-400 mb-4 md:mb-6">
                Take the {course.title} {course.tier === "paid" ? "exam" : "quiz"} &mdash;{" "}
                {course.examQuestionCount} questions, 70% to pass
                {course.certificate ? ", earn a certificate" : ""}.
              </p>
              <Button href={`/academy/${course.slug}/quiz`} dataTrack="quiz_cta_click" dataTrackCategory="academy">
                {course.tier === "paid" ? "Take the Exam" : "Take the Quiz"}
              </Button>
            </div>
          </CourseAccessGate>

          {/* Navigation */}
          <div className="mt-10 md:mt-12 flex justify-center gap-6 md:gap-10 flex-wrap">
            {courseIndex > 0 && (
              <Link
                href={`/academy/${COURSES[courseIndex - 1].slug}`}
                className="text-sm text-slate-400 hover:text-emerald transition-colors"
              >
                &larr; {COURSES[courseIndex - 1].title}
              </Link>
            )}
            {courseIndex < COURSES.length - 1 && (
              <Link
                href={`/academy/${COURSES[courseIndex + 1].slug}`}
                className="text-sm text-slate-400 hover:text-emerald transition-colors"
              >
                {COURSES[courseIndex + 1].title} &rarr;
              </Link>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
