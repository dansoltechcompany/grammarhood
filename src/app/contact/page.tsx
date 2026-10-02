import type { Metadata } from "next";
import { CONTACT_EMAIL, indexableMeta, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${SITE_NAME}.`,
  ...indexableMeta("/contact"),
};

export default function ContactPage() {
  return (
    <article className="space-y-6">
      <header className="space-y-2">
        <h1 className="font-[family-name:var(--font-display)] text-4xl">Contact</h1>
        <p className="text-lg leading-relaxed text-copy">
          Questions about {SITE_NAME}? Send an email. We read it.
        </p>
      </header>

      <a
        href={`mailto:${CONTACT_EMAIL}`}
        className="inline-flex rounded-lg bg-accent px-6 py-3 text-sm font-medium text-white hover:bg-accent-dark"
      >
        {CONTACT_EMAIL}
      </a>
    </article>
  );
}
