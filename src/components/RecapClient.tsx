"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { SESSION_KEY, type SessionResult } from "./PracticeClient";
import { missedSubRules } from "@/lib/progress";
import { SUB_RULE_LABELS } from "@/lib/sub-rule-labels";

type Stored = {
  topicId: string | null;
  topicTitle: string;
  results: SessionResult[];
};

let recapRaw: string | null = null;
let recapParsed: Stored | null = null;

function getSnapshot(): Stored | null {
  const raw = sessionStorage.getItem(SESSION_KEY);
  if (raw === recapRaw) return recapParsed;
  recapRaw = raw;
  recapParsed = raw ? (JSON.parse(raw) as Stored) : null;
  return recapParsed;
}

function getServerSnapshot(): Stored | null {
  return null;
}

function subscribe(onChange: () => void): () => void {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

export function RecapClient() {
  const data = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!data) {
    return (
      <div className="space-y-4">
        <h1 className="font-[family-name:var(--font-display)] text-3xl">No session to recap yet</h1>
        <Link href="/practice" className="text-accent underline">
          Start practice
        </Link>
      </div>
    );
  }

  const right = data.results.filter((result) => result.correct).length;
  const missed = missedSubRules(
    data.results.map((result) => ({
      questionId: result.questionId,
      topicId: result.topicId,
      subRule: result.subRule,
      correct: result.correct,
      at: 0,
    })),
  );

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-sm text-muted">{data.topicTitle}</p>
        <h1 className="font-[family-name:var(--font-display)] text-4xl">
          {right}/{data.results.length} this session
        </h1>
      </header>

      {missed.length > 0 ? (
        <section className="rounded-2xl border border-line bg-card p-5">
          <h2 className="text-sm uppercase tracking-[0.16em] text-muted">Come back to these</h2>
          <ul className="mt-3 space-y-2">
            {missed.map((subRule) => (
              <li key={subRule}>{SUB_RULE_LABELS[subRule] ?? subRule}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-copy">Tomorrow’s 10 minutes will start with these, not a random list.</p>
        </section>
      ) : (
        <p className="text-good">Clean session. Mixed practice tomorrow will keep it honest.</p>
      )}

      <div className="flex flex-wrap gap-3">
        <Link href="/practice" className="rounded-lg bg-accent px-5 py-3 text-sm text-white">
          Practice again
        </Link>
        <Link href="/" className="rounded-lg border border-line px-5 py-3 text-sm">
          Home
        </Link>
      </div>
    </div>
  );
}
