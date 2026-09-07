import Link from "next/link";
import { HomeStats } from "@/components/HomeStats";
import { liveTopics } from "@/content/topics";

export default function HomePage() {
  const live = liveTopics();

  return (
    <div className="space-y-14">
      <HomeStats />

      <section>
        <div className="mb-4 flex items-end justify-between">
          <h2 className="font-[family-name:var(--font-display)] text-2xl">Live topics</h2>
          <p className="text-sm text-muted">
            {live.length === 100
              ? "100 topics ready"
              : `${live.length} ready now · ${100 - live.length} more in the map, unpublished`}
          </p>
        </div>
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
      </section>
    </div>
  );
}
