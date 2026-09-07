"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { Question, Topic } from "@/lib/types";
import { recordAttempts } from "@/lib/progress";
import { buildSession, requeueMiss } from "@/lib/session";
import { useProgress } from "@/hooks/useProgress";
import type { Attempt } from "@/lib/types";

export type SessionResult = {
  questionId: string;
  topicId: string;
  subRule: string;
  prompt: string;
  answer: string;
  given: string;
  explanation: string;
  correct: boolean;
};

export const SESSION_KEY = "grammarhood-last-session";

function normalize(value: string): string {
  return value.trim().toLowerCase().replace(/[’']/g, "'").replace(/\s+/g, " ");
}

function isCorrect(question: Question, given: string): boolean {
  const expected = normalize(question.answer);
  const got = normalize(given);
  if (got === expected) return true;
  const expectedParts = expected.split("/").map((part) => part.trim());
  const gotParts = got.split("/").map((part) => part.trim());
  return expectedParts.length > 1 && expectedParts.join(" ") === gotParts.join(" ");
}

export function PracticeClient({ questions, topic }: { questions: Question[]; topic: Topic | null }) {
  const router = useRouter();
  const progress = useProgress();
  const baseQueue = useMemo(
    () => (progress.deviceId ? buildSession(questions, progress.attempts) : []),
    [progress.deviceId, progress.attempts, questions],
  );
  const [queueOverride, setQueueOverride] = useState<Question[] | null>(null);
  const [index, setIndex] = useState(0);
  const [step, setStep] = useState<"question" | "feedback">("question");
  const [given, setGiven] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [results, setResults] = useState<SessionResult[]>([]);

  const currentQueue = queueOverride ?? baseQueue;
  const question = currentQueue[index];
  const last = results[results.length - 1];

  if (!progress.deviceId || currentQueue.length === 0) {
    return <p className="text-muted">Preparing your session…</p>;
  }

  if (!question) {
    return (
      <div className="space-y-4">
        <p>No questions available.</p>
        <Link href="/" className="text-accent underline">
          Home
        </Link>
      </div>
    );
  }

  function submit(choice?: string) {
    const value = choice ?? given;
    if (!value.trim()) return;
    const ok = isCorrect(question, value);
    setResults((current) => [
      ...current,
      {
        questionId: question.id,
        topicId: question.topicId,
        subRule: question.subRule,
        prompt: question.prompt,
        answer: question.answer,
        given: value,
        explanation: question.explanation,
        correct: ok,
      },
    ]);
    if (!ok) {
      setQueueOverride((current) => requeueMiss(current ?? currentQueue, index, question));
    }
    setStep("feedback");
  }

  function next() {
    const finished = index + 1 >= currentQueue.length;
    if (finished) {
      const toStore: Attempt[] = results.map((result) => ({
        questionId: result.questionId,
        topicId: result.topicId,
        subRule: result.subRule,
        correct: result.correct,
        at: Date.now(),
      }));
      recordAttempts(toStore);
      sessionStorage.setItem(
        SESSION_KEY,
        JSON.stringify({
          topicId: topic?.id ?? null,
          topicTitle: topic?.title ?? "Mixed practice",
          results,
        }),
      );
      router.push("/recap");
      return;
    }
    setIndex((current) => current + 1);
    setStep("question");
    setGiven("");
    setShowHint(false);
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between text-sm text-muted">
        <span>{topic ? topic.title : "10-minute practice"}</span>
        <span>
          {index + 1} / {currentQueue.length}
        </span>
      </div>

      {step === "question" ? (
        <section className="rounded-2xl border border-line bg-card p-5 shadow-[0_8px_30px_rgba(28,23,18,0.04)] sm:p-8">
          <p className="mb-2 text-xs uppercase tracking-[0.16em] text-muted">
            {question.type === "fix" ? "Fix the sentence" : question.type === "gap" ? "Fill the gap" : "Choose"}
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-2xl leading-snug sm:text-3xl">
            {question.prompt}
          </h1>

          {question.options && question.options.length > 0 ? (
            <div className="mt-6 grid gap-3">
              {question.options.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => submit(option)}
                  className="rounded-xl border border-line bg-paper px-4 py-3 text-left text-base transition hover:border-accent hover:bg-white"
                >
                  {option}
                </button>
              ))}
            </div>
          ) : (
            <form
              className="mt-6 flex flex-col gap-3"
              onSubmit={(event) => {
                event.preventDefault();
                submit();
              }}
            >
              <input
                value={given}
                onChange={(event) => setGiven(event.target.value)}
                className="rounded-xl border border-line bg-paper px-4 py-3 outline-none ring-accent focus:ring-2"
                placeholder="Type your answer"
                autoComplete="off"
                autoFocus
              />
              <button type="submit" className="rounded-lg bg-ink px-5 py-3 text-sm font-medium text-paper">
                Check
              </button>
            </form>
          )}

          <button
            type="button"
            onClick={() => setShowHint(true)}
            className="mt-5 text-sm text-muted underline-offset-4 hover:text-ink hover:underline"
          >
            Hint
          </button>
          {showHint ? <p className="mt-2 text-sm text-muted">{question.hint}</p> : null}
        </section>
      ) : (
        <section className="rounded-2xl border border-line bg-card p-5 sm:p-8">
          <p className={`text-sm font-medium ${last?.correct ? "text-good" : "text-bad"}`}>
            {last?.correct ? "Right" : "Not quite"}
          </p>
          {!last?.correct ? (
            <p className="mt-2 text-copy">
              You chose <span className="text-ink">{last?.given}</span>. Answer:{" "}
              <span className="text-ink">{question.answer}</span>.
            </p>
          ) : null}
          <p className="mt-4 text-lg leading-relaxed">{question.explanation}</p>
          <button
            type="button"
            onClick={next}
            className="mt-8 rounded-lg bg-accent px-6 py-3 text-sm font-medium text-white hover:bg-accent-dark"
          >
            {index + 1 >= currentQueue.length ? "See recap" : "Next"}
          </button>
        </section>
      )}
    </div>
  );
}
