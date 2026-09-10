"use client";

import Link from "next/link";
import { liveTopics } from "@/content/topics";
import { weakestTopicId } from "@/lib/progress";
import { useProgress } from "@/hooks/useProgress";

export function HomeStats() {
  const live = liveTopics();
  const progress = useProgress();
  const ready = progress.deviceId.length > 0;
  const focusId = ready
    ? (weakestTopicId(progress, live.map((topic) => topic.id)) ?? live[0]?.id ?? "")
    : (live[0]?.id ?? "");
  const focus = live.find((topic) => topic.id === focusId);

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <p className="text-sm uppercase tracking-[0.18em] text-muted">Adult English · A1–B1</p>
        <h1 className="font-[family-name:var(--font-display)] text-4xl leading-tight sm:text-5xl">
          Ten minutes. Then you know what you missed.
        </h1>
        <p className="max-w-xl text-lg leading-relaxed text-copy">
          You already know the rule. You still miss it when you write.
        </p>
        <p className="max-w-xl leading-relaxed text-copy">
          Not a catalogue of quizzes. A short session, a plain rule when you are wrong, and those weak points
          come back tomorrow.
        </p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-2">
          <Link
            href="/practice"
            className="rounded-lg bg-accent px-6 py-3 text-sm font-medium text-white hover:bg-accent-dark"
          >
            Practice 10 minutes
          </Link>
          {focus ? (
            <Link href={`/practice?topic=${focus.id}`} className="text-sm text-muted hover:text-ink">
              Today&apos;s focus: {focus.title}
            </Link>
          ) : null}
        </div>
        <p className="text-sm text-muted">
          100 topics · progress stays on this device
          {ready && progress.streakDays > 0 ? ` · ${progress.streakDays}-day streak` : ""}
        </p>
      </section>
    </div>
  );
}
