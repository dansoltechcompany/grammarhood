import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
import { FOOTER_NAV, SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-line pt-10 text-sm">
      <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
        <div className="max-w-xs space-y-2">
          <p className="flex items-center gap-2 font-[family-name:var(--font-display)] text-lg text-ink">
            <BrandMark className="h-7 w-7 shrink-0" />
            {SITE_NAME}
          </p>
          <p className="leading-relaxed text-copy">{SITE_TAGLINE}</p>
        </div>
        <div className="flex gap-16">
          <nav aria-label="Learn" className="space-y-2">
            <p className="text-xs uppercase tracking-[0.16em] text-muted">Learn</p>
            {FOOTER_NAV.learn.map((item) => (
              <Link key={item.href} href={item.href} className="block text-ink hover:text-accent">
                {item.label}
              </Link>
            ))}
          </nav>
          <nav aria-label="Site" className="space-y-2">
            <p className="text-xs uppercase tracking-[0.16em] text-muted">Site</p>
            {FOOTER_NAV.site.map((item) => (
              <Link key={item.href} href={item.href} className="block text-ink hover:text-accent">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <p className="mt-10 border-t border-line pt-6 text-muted">
        © {new Date().getFullYear()} {SITE_NAME}
      </p>
    </footer>
  );
}
