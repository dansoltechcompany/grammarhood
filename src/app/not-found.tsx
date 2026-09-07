import Link from "next/link";

export default function NotFound() {
  return (
    <div className="space-y-4">
      <h1 className="font-[family-name:var(--font-display)] text-3xl">Page not found</h1>
      <p className="text-copy">That topic is not live yet, or the link is wrong.</p>
      <Link href="/grammar" className="text-accent underline-offset-4 hover:underline">
        Browse live topics
      </Link>
    </div>
  );
}
