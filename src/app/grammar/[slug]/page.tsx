import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { questionsForTopic } from "@/content/questions";
import { getRelatedLive, getTopic, liveTopics } from "@/content/topics";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return liveTopics().map((topic) => ({ slug: topic.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const topic = getTopic(slug);
  if (!topic || topic.status !== "live") {
    return { title: "Not found", robots: { index: false, follow: false } };
  }
  return {
    title: topic.title,
    description: topic.rule,
    robots: { index: true, follow: true },
  };
}

export default async function TopicPage({ params }: Props) {
  const { slug } = await params;
  const topic = getTopic(slug);
  if (!topic || topic.status !== "live") notFound();

  const related = getRelatedLive(topic);
  const count = questionsForTopic(topic.id).length;

  return (
    <article className="space-y-8">
      <header className="space-y-3">
        <p className="text-sm uppercase tracking-[0.16em] text-muted">
          {topic.level} · {count} questions
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-4xl">{topic.title}</h1>
      </header>

      <section className="rounded-2xl border border-line bg-card p-5 sm:p-7">
        <h2 className="text-sm uppercase tracking-[0.16em] text-muted">The rule</h2>
        <p className="mt-3 text-lg leading-relaxed">{topic.rule}</p>
        <p className="mt-4 text-sm">
          <span className="text-good">Yes:</span> {topic.exampleGood}
        </p>
        <p className="mt-1 text-sm">
          <span className="text-bad">No:</span> {topic.exampleBad}
        </p>
      </section>

      <Link
        href={`/practice?topic=${topic.id}`}
        className="inline-flex rounded-full bg-accent px-6 py-3 text-sm font-medium text-white hover:bg-accent-dark"
      >
        Practice this · 8 questions
      </Link>

      {related.length > 0 ? (
        <section>
          <h2 className="mb-3 text-sm uppercase tracking-[0.16em] text-muted">Related</h2>
          <ul className="flex flex-wrap gap-2">
            {related.map((item) => (
              <li key={item.id}>
                <Link href={`/grammar/${item.id}`} className="rounded-full border border-line px-3 py-1 text-sm">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
