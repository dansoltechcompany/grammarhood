import Link from "next/link";
import { HomeSampleQuestion } from "@/components/HomeSampleQuestion";
import { HomeStats } from "@/components/HomeStats";
import { TopicList } from "@/components/TopicList";
import { QUESTIONS } from "@/content/questions";
import { liveTopics } from "@/content/topics";
import type { Topic } from "@/lib/types";

const SAMPLE_QUESTION_ID = "art-01";

const START_HERE_IDS = [
  "a-an-the",
  "am-is-are",
  "present-simple",
  "past-simple",
  "there-is-there-are",
  "prepositions-of-place",
  "prepositions-of-time",
  "subject-object-pronouns",
] as const;

const STEPS = [
  {
    n: "01",
    title: "Eight questions",
    body: "A short mixed session. Not a forty-item worksheet.",
  },
  {
    n: "02",
    title: "A plain rule",
    body: "If you miss one, you see why — in one sentence, not a lecture.",
  },
  {
    n: "03",
    title: "A recap",
    body: "Weak points come back in the next session. That is the loop.",
  },
] as const;

export default function HomePage() {
  const live = liveTopics();
  const startHere = START_HERE_IDS.map((id) => live.find((topic) => topic.id === id)).filter(
    (topic): topic is Topic => topic !== undefined,
  );
  const sample = QUESTIONS.find((question) => question.id === SAMPLE_QUESTION_ID);

  return (
    <div className="space-y-16">
      <HomeStats />

      <section>
        <h2 className="mb-4 font-[family-name:var(--font-display)] text-2xl">How a session works</h2>
        <ol className="grid gap-3 sm:grid-cols-3">
          {STEPS.map((step) => (
            <li key={step.n} className="rounded-2xl border border-line bg-card p-5">
              <p className="font-[family-name:var(--font-display)] text-sm text-accent">{step.n}</p>
              <h3 className="mt-2 font-medium">{step.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-copy">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {sample ? (
        <section>
          <div className="mb-4">
            <h2 className="font-[family-name:var(--font-display)] text-2xl">A question looks like this</h2>
            <p className="mt-1 text-sm text-muted">One real item. Miss it, and you get the rule in one line.</p>
          </div>
          <HomeSampleQuestion question={sample} />
        </section>
      ) : null}

      <section>
        <div className="mb-4">
          <h2 className="font-[family-name:var(--font-display)] text-2xl">Start here</h2>
          <p className="mt-1 text-sm text-muted">
            Eight foundations. Then{" "}
            <Link href="/grammar" className="text-accent hover:text-accent-dark">
              browse all {live.length} topics.
            </Link>
          </p>
        </div>
        <TopicList topics={startHere} />
        <Link
          href="/practice"
          className="mt-6 inline-flex rounded-lg bg-accent px-6 py-3 text-sm font-medium text-white hover:bg-accent-dark"
        >
          Practice 10 minutes
        </Link>
      </section>
    </div>
  );
}
