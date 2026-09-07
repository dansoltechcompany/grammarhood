"use client";

import { useState } from "react";
import type { Question } from "@/lib/types";

export function HomeSampleQuestion({ question }: { question: Question }) {
  const [picked, setPicked] = useState<string | null>(null);
  const correct = picked !== null && picked === question.answer;

  return (
    <section className="rounded-2xl border border-line bg-card p-5 sm:p-7">
      <p className="mb-2 text-xs uppercase tracking-[0.16em] text-muted">Fill the gap</p>
      <p className="font-[family-name:var(--font-display)] text-2xl leading-snug">{question.prompt}</p>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {(question.options ?? []).map((option) => {
          const chosen = picked === option;
          const showResult = picked !== null;
          const isAnswer = option === question.answer;
          let tone = "border-line bg-paper hover:border-accent hover:bg-white";
          if (showResult && isAnswer) tone = "border-good bg-white text-good";
          if (showResult && chosen && !isAnswer) tone = "border-bad bg-white text-bad";

          return (
            <button
              key={option}
              type="button"
              onClick={() => setPicked(option)}
              disabled={picked !== null}
              className={`rounded-xl border px-4 py-3 text-left text-base transition disabled:cursor-default ${tone}`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {picked ? (
        <div className="mt-5 space-y-3">
          <p className={`text-sm font-medium ${correct ? "text-good" : "text-bad"}`}>
            {correct ? "Right" : "Not quite"}
          </p>
          {!correct ? (
            <p className="text-sm text-copy">
              You chose {picked}. Answer: {question.answer}.
            </p>
          ) : null}
          <p className="leading-relaxed text-copy">{question.explanation}</p>
          <button
            type="button"
            onClick={() => setPicked(null)}
            className="text-sm text-muted underline-offset-4 hover:text-ink hover:underline"
          >
            Try again
          </button>
        </div>
      ) : (
        <p className="mt-4 text-sm text-muted">Pick one. A session is eight of these, then a recap.</p>
      )}
    </section>
  );
}
