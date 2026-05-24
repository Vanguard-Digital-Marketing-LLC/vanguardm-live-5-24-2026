"use client";

import { useState } from "react";
import Link from "next/link";
import { COURSES, CATEGORIES } from "@/lib/academy-data";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";

export default function AcademyPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const displayCourses = selectedCategory
    ? COURSES.filter((c) => c.category === selectedCategory)
    : COURSES;

  const totalFree = COURSES.filter((c) => c.tier === "free").length;
  const totalPaid = COURSES.filter((c) => c.tier === "paid").length;

  return (
    <main className="pt-24 space-y-10 md:space-y-16">
      {/* Hero */}
      <section className="py-14 md:py-24 px-5 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-display font-semibold uppercase tracking-widest text-emerald mb-2 md:mb-3">
            Vanguard Academy
          </p>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
            Master Digital <span className="text-amber">Marketing</span>
          </h1>
          <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto mb-6 md:mb-8">
            {COURSES.length} comprehensive courses covering SEO, PPC, social
            media, content marketing, branding, analytics, and growth
            strategies. Start with {totalFree} free courses, then level up with
            our premium content.
          </p>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald/20 bg-emerald/5">
              <span className="text-emerald text-sm">{totalFree}</span>
              <span className="text-xs font-display font-semibold uppercase tracking-wider text-slate-400">
                Free Courses
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber/20 bg-amber/5">
              <span className="text-amber text-sm">{totalPaid}</span>
              <span className="text-xs font-display font-semibold uppercase tracking-wider text-slate-400">
                Premium Courses
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald/20 bg-emerald/5">
              <span className="text-emerald text-sm">
                {COURSES.reduce((sum, c) => sum + c.examQuestionCount, 0).toLocaleString()}
              </span>
              <span className="text-xs font-display font-semibold uppercase tracking-wider text-slate-400">
                Quiz Questions
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="px-5 md:px-6 -mt-6 md:-mt-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-xs md:text-sm font-display font-semibold transition-colors duration-200 ${
                selectedCategory === null
                  ? "bg-emerald text-slate-900"
                  : "bg-white/5 text-slate-400 hover:bg-white/10"
              }`}
            >
              All Courses
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs md:text-sm font-display font-semibold transition-colors duration-200 ${
                  selectedCategory === cat
                    ? "bg-emerald text-slate-900"
                    : "bg-white/5 text-slate-400 hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Course Cards */}
      <section className="pb-20 md:pb-32 px-5 md:px-6">
        <div className="max-w-5xl mx-auto space-y-8 md:space-y-12">
          {displayCourses.map((course) => (
            <GlassCard key={course.slug} className="p-6 md:p-8 lg:p-10">
              {/* Header row */}
              <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-5 md:mb-6">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-emerald/10 flex items-center justify-center text-2xl md:text-3xl shrink-0">
                  {course.icon}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span
                      className={`text-[10px] font-display font-semibold uppercase px-2 py-0.5 rounded-full ${
                        course.tier === "free"
                          ? "bg-emerald/10 text-emerald"
                          : "bg-amber/10 text-amber"
                      }`}
                    >
                      {course.tier === "free"
                        ? "Free"
                        : `$${((course.price ?? 0) / 100).toFixed(0)}`}
                    </span>
                    <span className="text-slate-600">|</span>
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
                    {course.certificate && (
                      <>
                        <span className="text-slate-600">|</span>
                        <span className="text-[10px] font-display text-amber">
                          Certificate
                        </span>
                      </>
                    )}
                  </div>
                  <h2 className="font-display text-xl md:text-2xl font-bold">
                    <Link
                      href={`/academy/${course.slug}`}
                      className="hover:text-emerald transition-colors"
                    >
                      {course.title}
                    </Link>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {course.category}
                  </p>
                </div>
              </div>

              {/* Long description */}
              <p className="text-sm md:text-base text-slate-400 leading-relaxed mb-6 md:mb-8">
                {course.longDescription}
              </p>

              {/* Two-column: What You'll Learn + Topics/Prerequisites */}
              <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
                <div>
                  <h3 className="font-display text-sm md:text-base font-semibold text-emerald mb-3 md:mb-4">
                    What You&apos;ll Learn
                  </h3>
                  <ul className="space-y-2">
                    {course.whatYouWillLearn.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-xs md:text-sm text-slate-300"
                      >
                        <span className="text-emerald mt-0.5 shrink-0">
                          &#10003;
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-display text-sm md:text-base font-semibold text-amber mb-3 md:mb-4">
                      Topics Covered
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {course.topics.map((topic) => (
                        <span
                          key={topic}
                          className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-slate-400 border border-white/5"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-display text-sm md:text-base font-semibold text-slate-300 mb-3">
                      Prerequisites
                    </h3>
                    <ul className="space-y-1.5">
                      {course.prerequisites.map((prereq) => (
                        <li
                          key={prereq}
                          className="flex items-start gap-2 text-xs md:text-sm text-slate-400"
                        >
                          <span className="text-slate-500 mt-0.5 shrink-0">
                            &rarr;
                          </span>
                          <span>{prereq}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <Button href={`/academy/${course.slug}`}>
                  {course.tier === "paid" ? "View Course" : "Start Course"}
                </Button>
                <Button
                  href={`/academy/${course.slug}/quiz`}
                  variant="outline"
                >
                  {course.tier === "paid" ? "View Exam" : "Take the Quiz"}
                </Button>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>
    </main>
  );
}
