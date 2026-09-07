import type { Metadata } from "next";
import Link from "next/link";
import { liveTopics } from "@/content/topics";

export const metadata: Metadata = {
  title: "Grammar topics",
  robots: { index: true, follow: true },
};

export default function GrammarIndexPage() {
  const live = liveTopics();
  return (
    <div className="space-y-6">
      <h1 className="font-[family-name:var(--font-display)] text-4xl">Grammar topics</h1>
      <p className="max-w-xl text-muted">
        Only live topics are listed. Drafts are not routed, not in the sitemap, and return 404.
      </p>
      <ul className="divide-y divide-line rounded-2xl border border-line bg-card">
        {live.map((topic) => (
          <li key={topic.id}>
            <Link href={`/grammar/${topic.id}`} className="flex items-center justify-between px-4 py-3 hover:bg-paper">
              <span>{topic.title}</span>
              <span className="text-sm text-muted">{topic.level}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
