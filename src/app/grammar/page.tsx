import type { Metadata } from "next";
import { TopicList } from "@/components/TopicList";
import { liveTopics } from "@/content/topics";
import type { Level } from "@/lib/types";

export const metadata: Metadata = {
  title: "Grammar topics",
  robots: { index: true, follow: true },
};

const LEVELS: Level[] = ["A1", "A2", "B1", "B2"];

export default function GrammarIndexPage() {
  const live = liveTopics();

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <h1 className="font-[family-name:var(--font-display)] text-4xl">Grammar topics</h1>
        <p className="max-w-xl text-copy">
          One page per topic: a short rule, then eight questions. {live.length} live now.
        </p>
      </header>
      {LEVELS.map((level) => {
        const topics = live.filter((topic) => topic.level === level);
        if (topics.length === 0) return null;
        return (
          <section key={level} id={level.toLowerCase()} className="scroll-mt-8 space-y-3">
            <div className="flex items-baseline justify-between">
              <h2 className="font-[family-name:var(--font-display)] text-2xl">{level}</h2>
              <p className="text-sm text-muted">{topics.length} topics</p>
            </div>
            <TopicList topics={topics} />
          </section>
        );
      })}
    </div>
  );
}
