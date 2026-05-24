"use client";

import { useState } from "react";
import type { Course } from "@/lib/academy-data";

export default function AdminPanel({ courses }: { courses: Course[] }) {
  const [email, setEmail] = useState("");
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const paidCourses = courses.filter((c) => c.tier === "paid");

  function toggleCourse(slug: string) {
    setSelectedCourses((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    );
  }

  function selectAll() {
    setSelectedCourses(paidCourses.map((c) => c.slug));
  }

  async function grantAccess() {
    if (!email || selectedCourses.length === 0) {
      setStatus("Please enter an email and select at least one course.");
      return;
    }

    setLoading(true);
    setStatus(null);

    const results: string[] = [];
    for (const courseSlug of selectedCourses) {
      const res = await fetch("/api/admin/grant-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, courseSlug }),
      });
      const data = await res.json();
      if (res.ok) {
        results.push(`${courseSlug}: granted`);
      } else {
        results.push(`${courseSlug}: ${data.error}`);
      }
    }

    setStatus(results.join("\n"));
    setLoading(false);
    setSelectedCourses([]);
  }

  return (
    <div className="space-y-6">
      {/* Grant Access */}
      <div className="glass rounded-xl p-6">
        <h2 className="font-display text-lg font-semibold mb-4">
          Grant Course Access
        </h2>

        <div className="space-y-4">
          <div>
            <label htmlFor="grant-user-email" className="text-xs text-slate-400 block mb-1">
              User Email
            </label>
            <input
              id="grant-user-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 focus:border-emerald/40 focus:outline-none"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400">Select Courses</span>
              <button
                onClick={selectAll}
                className="text-xs text-emerald hover:underline"
              >
                Select All Paid ({paidCourses.length})
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-2">
              {paidCourses.map((course) => (
                <label
                  key={course.slug}
                  className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer transition-colors ${
                    selectedCourses.includes(course.slug)
                      ? "border-emerald/40 bg-emerald/10"
                      : "border-white/10 hover:border-white/20"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedCourses.includes(course.slug)}
                    onChange={() => toggleCourse(course.slug)}
                    className="accent-emerald"
                  />
                  <span className="text-xs text-slate-200">
                    {course.icon} {course.title}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={grantAccess}
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-emerald text-white font-display text-sm font-semibold uppercase tracking-wider hover:bg-emerald/80 transition-colors disabled:opacity-50"
          >
            {loading
              ? "Granting..."
              : `Grant Access (${selectedCourses.length} courses)`}
          </button>

          {status && (
            <pre className="text-xs bg-black/30 rounded-lg p-3 text-slate-300 whitespace-pre-wrap">
              {status}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
