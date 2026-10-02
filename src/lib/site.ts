export const SITE_NAME = "Grammarhood";
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://grammarhood.com").replace(/\/$/, "");
export const SITE_TAGLINE = "Ten-minute English grammar practice for adult learners.";
export const COMPANY_NAME = "Dansol Tech Pvt Ltd";
export const CONTACT_EMAIL = "info@dansoltech.com";

export function absoluteUrl(path: string): string {
  if (path === "/" || path === "") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Self-canonical for an indexable path. Absolute, so http/www copies point at one URL. */
export function indexableMeta(path: string) {
  const url = absoluteUrl(path);
  return {
    alternates: { canonical: url },
    openGraph: { url },
    robots: { index: true, follow: true },
  } as const;
}

export const FOOTER_NAV = {
  learn: [
    { href: "/practice", label: "Practice" },
    { href: "/grammar", label: "Topics" },
  ],
  site: [
    { href: "/contact", label: "Contact" },
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
  ],
} as const;
