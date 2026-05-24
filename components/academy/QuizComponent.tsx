"use client";

import { useState, useMemo, useEffect } from "react";
import { useSession } from "next-auth/react";
import type { QuizQuestion } from "@/lib/academy-data";

interface QuizComponentProps {
  questions: QuizQuestion[];
  courseTitle: string;
  courseSlug: string;
}

export default function QuizComponent({ questions, courseTitle, courseSlug }: QuizComponentProps) {
  const { data: session } = useSession();
  const [currentQ, setCurrentQ] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [certNumber, setCertNumber] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // State for each question type
  const [mcSelected, setMcSelected] = useState<number | null>(null);
  const [tfSelected, setTfSelected] = useState<boolean | null>(null);
  const [msSelected, setMsSelected] = useState<Set<number>>(new Set());
  const [orderPool, setOrderPool] = useState<number[]>([]);
  const [orderAnswer, setOrderAnswer] = useState<number[]>([]);

  const q = questions[currentQ];
  const total = questions.length;
  const passingScore = Math.ceil(total * 0.7);

  // Shuffle ordering items on question change
  const shuffledOrderIndices = useMemo(() => {
    if (q.type !== "ordering") return [];
    const indices = q.items.map((_, i) => i);
    // Fisher-Yates shuffle
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return indices;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQ]);

  // Initialize order pool when question changes
  useMemo(() => {
    if (q.type === "ordering") {
      setOrderPool(shuffledOrderIndices);
      setOrderAnswer([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQ]);

  function checkAnswer(): boolean {
    switch (q.type) {
      case "multiple-choice":
        return mcSelected === q.correctIndex;
      case "true-false":
        return tfSelected === q.correctAnswer;
      case "multi-select":
        return (
          q.correctIndices.length === msSelected.size &&
          q.correctIndices.every((i) => msSelected.has(i))
        );
      case "ordering":
        return q.correctOrder.every((val, idx) => orderAnswer[idx] === val);
    }
  }

  function canSubmit(): boolean {
    switch (q.type) {
      case "multiple-choice":
        return mcSelected !== null;
      case "true-false":
        return tfSelected !== null;
      case "multi-select":
        return msSelected.size > 0;
      case "ordering":
        return orderAnswer.length === q.items.length;
    }
  }

  function handleSubmit() {
    if (!canSubmit()) return;
    const correct = checkAnswer();
    if (correct) setScore((s) => s + 1);
    setAnswered(true);
  }

  function handleNext() {
    if (currentQ < total - 1) {
      setCurrentQ((c) => c + 1);
      resetSelection();
    } else {
      setFinished(true);
    }
  }

  function resetSelection() {
    setAnswered(false);
    setMcSelected(null);
    setTfSelected(null);
    setMsSelected(new Set());
    setOrderPool([]);
    setOrderAnswer([]);
  }

  function handleRestart() {
    setCurrentQ(0);
    setScore(0);
    setFinished(false);
    resetSelection();
  }

  // Ordering helpers
  function addToOrder(idx: number) {
    if (answered) return;
    setOrderPool((p) => p.filter((i) => i !== idx));
    setOrderAnswer((a) => [...a, idx]);
  }

  function removeFromOrder(idx: number) {
    if (answered) return;
    setOrderAnswer((a) => a.filter((i) => i !== idx));
    setOrderPool((p) => [...p, idx]);
  }

  // Multi-select toggle
  function toggleMultiSelect(idx: number) {
    if (answered) return;
    setMsSelected((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  }

  // Get question type label
  function getTypeLabel(): string {
    switch (q.type) {
      case "multiple-choice":
        return "Choose one";
      case "true-false":
        return "True or False";
      case "multi-select":
        return "Select all that apply";
      case "ordering":
        return "Put in the correct order";
    }
  }

  // Submit results to API when quiz finishes
  useEffect(() => {
    if (!finished || submitted || !session?.user?.id) return;
    setSubmitted(true);

    const passed = score >= passingScore;
    fetch("/api/quiz/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        courseSlug,
        score,
        totalQuestions: total,
        passed,
        answers: {},
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.certificate?.number) {
          setCertNumber(data.certificate.number);
        }
      })
      .catch((err) => console.error("Failed to submit quiz:", err));
  }, [finished, submitted, session, score, passingScore, courseSlug, total]);

  // Results screen
  if (finished) {
    const passed = score >= passingScore;
    return (
      <div className="glass rounded-2xl p-6 md:p-10 text-center">
        <div className="text-4xl md:text-5xl mb-4">{passed ? "🎉" : "📚"}</div>
        <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">
          {passed ? "Congratulations!" : "Keep Learning!"}
        </h2>
        <p className="text-slate-400 mb-4">
          You scored <span className="text-emerald font-bold">{score}</span> out of{" "}
          <span className="font-bold">{total}</span>
        </p>
        <div className="w-full bg-white/5 rounded-full h-3 mb-4">
          <div
            className={`h-3 rounded-full transition-all duration-500 ${passed ? "bg-emerald" : "bg-amber"}`}
            style={{ width: `${(score / total) * 100}%` }}
          />
        </div>
        <p className="text-sm text-slate-400 mb-6">
          {passed
            ? `You passed! (${passingScore}/${total} needed)`
            : `You need ${passingScore}/${total} to pass. Review the lesson and try again.`}
        </p>

        {certNumber && (
          <div className="glass rounded-xl p-4 mb-6 max-w-sm mx-auto">
            <p className="text-xs font-display font-semibold uppercase tracking-wider text-emerald mb-1">
              Certificate Earned
            </p>
            <p className="text-sm text-slate-300">
              Certificate #{certNumber}
            </p>
            <a
              href={`/certificate/${certNumber}`}
              className="text-xs text-emerald hover:underline mt-1 inline-block"
            >
              View Certificate
            </a>
          </div>
        )}

        {!session && passed && (
          <div className="glass rounded-xl p-4 mb-6 max-w-sm mx-auto">
            <p className="text-xs text-slate-400">
              <a href="/auth/sign-in" className="text-emerald hover:underline">
                Sign in
              </a>{" "}
              to save your progress and earn a certificate.
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleRestart}
            className="px-5 py-3 rounded-lg bg-amber text-slate-950 font-display text-xs font-semibold uppercase tracking-wider hover:bg-amber-400 transition-all cursor-pointer"
          >
            {passed ? "Retake Quiz" : "Try Again"}
          </button>
          <a
            href={`/academy/${courseSlug}`}
            className="px-5 py-3 rounded-lg border border-emerald/30 text-emerald font-display text-xs font-semibold uppercase tracking-wider hover:bg-emerald/10 transition-all text-center"
          >
            Review Lesson
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-5 md:p-8">
      {/* Progress */}
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <span className="text-xs font-display font-semibold uppercase tracking-wider text-slate-400">
          Question {currentQ + 1} of {total}
        </span>
        <span className="text-xs font-display font-semibold text-emerald">
          Score: {score}/{currentQ}
        </span>
      </div>
      <div className="w-full bg-white/5 rounded-full h-1.5 mb-6">
        <div
          className="h-1.5 rounded-full bg-emerald transition-all duration-300"
          style={{ width: `${((currentQ + 1) / total) * 100}%` }}
        />
      </div>

      {/* Question type badge */}
      <div className="mb-3">
        <span className={`inline-block text-[10px] font-display font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full ${
          q.type === "multiple-choice" ? "bg-emerald/10 text-emerald" :
          q.type === "true-false" ? "bg-sky-500/10 text-sky-400" :
          q.type === "multi-select" ? "bg-amber/10 text-amber" :
          "bg-purple-500/10 text-purple-400"
        }`}>
          {getTypeLabel()}
        </span>
      </div>

      {/* Question */}
      <h3 className="font-display text-base md:text-lg font-semibold mb-4 md:mb-6">
        {q.question}
      </h3>

      {/* Render based on question type */}
      {q.type === "multiple-choice" && (
        <div className="space-y-2.5 md:space-y-3 mb-6">
          {q.options.map((option, i) => {
            let borderClass = "border-white/10 hover:border-white/20";
            if (answered) {
              if (i === q.correctIndex) borderClass = "border-emerald bg-emerald/10";
              else if (i === mcSelected) borderClass = "border-red-400 bg-red-400/10";
            } else if (i === mcSelected) {
              borderClass = "border-emerald/50 bg-emerald/5";
            }
            return (
              <button
                key={i}
                onClick={() => !answered && setMcSelected(i)}
                disabled={answered}
                className={`w-full text-left px-4 py-3 rounded-xl border ${borderClass} transition-all text-sm md:text-base cursor-pointer disabled:cursor-default`}
              >
                <span className="font-display text-xs font-semibold text-slate-500 mr-2">
                  {String.fromCharCode(65 + i)}.
                </span>
                {option}
              </button>
            );
          })}
        </div>
      )}

      {q.type === "true-false" && (
        <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6">
          {[true, false].map((value) => {
            let borderClass = "border-white/10 hover:border-white/20";
            if (answered) {
              if (value === q.correctAnswer) borderClass = "border-emerald bg-emerald/10";
              else if (value === tfSelected) borderClass = "border-red-400 bg-red-400/10";
            } else if (value === tfSelected) {
              borderClass = "border-emerald/50 bg-emerald/5";
            }
            return (
              <button
                key={String(value)}
                onClick={() => !answered && setTfSelected(value)}
                disabled={answered}
                className={`px-4 py-4 md:py-5 rounded-xl border ${borderClass} transition-all text-center cursor-pointer disabled:cursor-default`}
              >
                <span className="font-display text-base md:text-lg font-semibold">
                  {value ? "True" : "False"}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {q.type === "multi-select" && (
        <div className="space-y-2.5 md:space-y-3 mb-6">
          {q.options.map((option, i) => {
            const isSelected = msSelected.has(i);
            const isCorrect = q.correctIndices.includes(i);
            let borderClass = "border-white/10 hover:border-white/20";
            if (answered) {
              if (isCorrect && isSelected) borderClass = "border-emerald bg-emerald/10";
              else if (isCorrect && !isSelected) borderClass = "border-amber bg-amber/10";
              else if (!isCorrect && isSelected) borderClass = "border-red-400 bg-red-400/10";
            } else if (isSelected) {
              borderClass = "border-emerald/50 bg-emerald/5";
            }
            return (
              <button
                key={i}
                onClick={() => toggleMultiSelect(i)}
                disabled={answered}
                className={`w-full text-left px-4 py-3 rounded-xl border ${borderClass} transition-all text-sm md:text-base cursor-pointer disabled:cursor-default flex items-center gap-3`}
              >
                <span className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 text-xs transition-all ${
                  isSelected ? "border-emerald bg-emerald/20 text-emerald" : "border-slate-500"
                }`}>
                  {isSelected && "✓"}
                </span>
                {option}
              </button>
            );
          })}
        </div>
      )}

      {q.type === "ordering" && (
        <div className="mb-6 space-y-4">
          {/* Answer area */}
          <div className="space-y-2">
            <p className="text-[10px] font-display font-semibold uppercase tracking-wider text-emerald mb-2">
              Your Order {orderAnswer.length > 0 && `(${orderAnswer.length}/${q.items.length})`}
            </p>
            {orderAnswer.length === 0 ? (
              <div className="rounded-xl border border-dashed border-white/10 p-4 text-center text-xs text-slate-500">
                Click items below to build your order
              </div>
            ) : (
              orderAnswer.map((idx, pos) => {
                let borderClass = "border-emerald/30 bg-emerald/5";
                if (answered) {
                  borderClass = q.correctOrder[pos] === idx
                    ? "border-emerald bg-emerald/10"
                    : "border-red-400 bg-red-400/10";
                }
                return (
                  <button
                    key={`answer-${idx}`}
                    onClick={() => removeFromOrder(idx)}
                    disabled={answered}
                    className={`w-full text-left px-4 py-3 rounded-xl border ${borderClass} transition-all text-sm md:text-base cursor-pointer disabled:cursor-default flex items-center gap-3`}
                  >
                    <span className="w-6 h-6 rounded-full bg-emerald/20 text-emerald font-display text-xs font-bold flex items-center justify-center shrink-0">
                      {pos + 1}
                    </span>
                    {q.items[idx]}
                  </button>
                );
              })
            )}
          </div>

          {/* Pool of unselected items */}
          {orderPool.length > 0 && (
            <div className="space-y-2">
              <p className="text-[10px] font-display font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Available Items
              </p>
              {orderPool.map((idx) => (
                <button
                  key={`pool-${idx}`}
                  onClick={() => addToOrder(idx)}
                  disabled={answered}
                  className="w-full text-left px-4 py-3 rounded-xl border border-white/10 hover:border-white/20 transition-all text-sm md:text-base cursor-pointer disabled:cursor-default"
                >
                  {q.items[idx]}
                </button>
              ))}
            </div>
          )}

          {/* Show correct order after answering */}
          {answered && !checkAnswer() && (
            <div className="mt-3">
              <p className="text-[10px] font-display font-semibold uppercase tracking-wider text-amber mb-2">
                Correct Order
              </p>
              {q.correctOrder.map((idx, pos) => (
                <div
                  key={`correct-${idx}`}
                  className="w-full text-left px-4 py-2 text-sm text-slate-300 flex items-center gap-3"
                >
                  <span className="w-6 h-6 rounded-full bg-amber/20 text-amber font-display text-xs font-bold flex items-center justify-center shrink-0">
                    {pos + 1}
                  </span>
                  {q.items[idx]}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Explanation */}
      {answered && (
        <div className={`rounded-xl p-4 mb-4 text-sm ${
          checkAnswer() ? "bg-emerald/10 border border-emerald/20" : "bg-red-400/10 border border-red-400/20"
        }`}>
          <p className="font-display font-semibold mb-1">
            {checkAnswer() ? "✓ Correct!" : "✗ Incorrect"}
          </p>
          <p className="text-slate-300 text-xs md:text-sm">{q.explanation}</p>
        </div>
      )}

      {/* Action button */}
      {!answered ? (
        <button
          onClick={handleSubmit}
          disabled={!canSubmit()}
          className="w-full py-3 rounded-lg bg-amber text-slate-950 font-display text-xs font-semibold uppercase tracking-wider hover:bg-amber-400 transition-all disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
        >
          Submit Answer
        </button>
      ) : (
        <button
          onClick={handleNext}
          className="w-full py-3 rounded-lg bg-emerald text-slate-950 font-display text-xs font-semibold uppercase tracking-wider hover:bg-emerald-400 transition-all cursor-pointer"
        >
          {currentQ < total - 1 ? "Next Question" : "See Results"}
        </button>
      )}
    </div>
  );
}
