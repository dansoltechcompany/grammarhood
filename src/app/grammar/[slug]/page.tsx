import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { questionsForTopic } from "@/content/questions";
import { getLinkedLive, getTopic, liveTopics } from "@/content/topics";
import { absoluteUrl, indexableMeta, SITE_NAME, SITE_URL } from "@/lib/site";
import { SESSION_SIZE } from "@/lib/session";

type Props = { params: Promise<{ slug: string }> };

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
    ...indexableMeta(`/grammar/${topic.id}`),
  };
}

export default async function TopicPage({ params }: Props) {
  const { slug } = await params;
  const topic = getTopic(slug);
  if (!topic || topic.status !== "live") notFound();

  const related = getLinkedLive(topic);
  const worked = questionsForTopic(topic.id).slice(0, 3);
  const url = absoluteUrl(`/grammar/${topic.id}`);

  return (
    <article className="space-y-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
                { "@type": "ListItem", position: 2, name: "Topics", item: absoluteUrl("/grammar") },
                { "@type": "ListItem", position: 3, name: topic.title, item: url },
              ],
            },
            {
              "@type": "LearningResource",
              name: topic.title,
              description: topic.rule,
              url,
              inLanguage: "en",
              educationalLevel: topic.level,
              learningResourceType: "lesson",
              teaches: topic.keyword,
              isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
              provider: { "@type": "Organization", name: "Dansol Tech Pvt Ltd", url: SITE_URL },
            },
          ],
        }}
      />

      <header className="space-y-3">
        <nav aria-label="Breadcrumb" className="text-sm text-muted">
          <Link href="/" className="hover:text-ink">
            Home
          </Link>
          <span aria-hidden="true"> / </span>
          <Link href="/grammar" className="hover:text-ink">
            Topics
          </Link>
          <span aria-hidden="true"> / </span>
          <span className="text-ink">{topic.title}</span>
        </nav>
        <p className="text-sm uppercase tracking-[0.16em] text-muted">
          {topic.level} · {SESSION_SIZE} questions
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-4xl">{topic.title}</h1>
      </header>

      <section className="rounded-2xl border border-line bg-card p-5 sm:p-7">
        <h2 className="text-sm uppercase tracking-[0.16em] text-muted">The rule</h2>
        <p className="mt-3 text-lg leading-relaxed">{topic.rule}</p>
        <ul className="mt-5 space-y-4">
          {topic.examples.map((example) => (
            <li key={`${example.yes}-${example.no}`}>
              <p className="text-sm">
                <span className="text-good">Yes:</span> {example.yes}
              </p>
              <p className="mt-1 text-sm">
                <span className="text-bad">No:</span> {example.no}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-5 border-t border-line pt-4 text-sm leading-relaxed text-copy">
          <span className="font-medium text-ink">Watch for:</span> {topic.watchFor}
        </p>
      </section>

      {worked.length > 0 ? (
        <section className="space-y-3">
          <h2 className="font-[family-name:var(--font-display)] text-2xl">Worked examples</h2>
          <p className="text-sm text-muted">
            Three from this topic. The practice session still mixes in the rest.
          </p>
          <ol className="space-y-3">
            {worked.map((question, index) => (
              <li key={question.id} className="rounded-2xl border border-line bg-card p-5">
                <p className="text-xs uppercase tracking-[0.16em] text-muted">Example {index + 1}</p>
                <p className="mt-2 font-[family-name:var(--font-display)] text-xl leading-snug">{question.prompt}</p>
                <p className="mt-3 text-sm">
                  <span className="text-good">Answer:</span> {question.answer}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-copy">{question.explanation}</p>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      <Link
        href={`/practice?topic=${topic.id}`}
        className="inline-flex rounded-lg bg-accent px-6 py-3 text-sm font-medium text-white hover:bg-accent-dark"
      >
        Practice this · {SESSION_SIZE} questions
      </Link>

      {related.length > 0 ? (
        <section>
          <h2 className="mb-3 text-sm uppercase tracking-[0.16em] text-muted">Related</h2>
          <ul className="flex flex-wrap gap-2">
            {related.map((item) => (
              <li key={item.id}>
                <Link href={`/grammar/${item.id}`} className="rounded-md border border-line px-3 py-1 text-sm">
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
