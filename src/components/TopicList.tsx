import Link from "next/link";
import type { Topic } from "@/lib/types";

export function TopicList({ topics }: { topics: Topic[] }) {
  return (
    <ul className="divide-y divide-line rounded-2xl border border-line bg-card">
      {topics.map((topic) => (
        <li key={topic.id}>
          <Link
            href={`/grammar/${topic.id}`}
            className="flex items-center justify-between gap-4 px-4 py-3 hover:bg-paper"
          >
            <span>{topic.title}</span>
            <span className="shrink-0 text-sm text-muted">{topic.level}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
