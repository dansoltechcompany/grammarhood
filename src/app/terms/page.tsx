import type { Metadata } from "next";
import { COMPANY_NAME, CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms",
  description: `Terms of use for ${SITE_NAME}.`,
};

export default function TermsPage() {
  return (
    <article className="space-y-6">
      <header className="space-y-2">
        <h1 className="font-[family-name:var(--font-display)] text-4xl">Terms of use</h1>
        <p className="text-sm text-muted">Last updated 7 September 2026</p>
      </header>

      <p className="text-lg leading-relaxed text-copy">
        These terms apply when you use {SITE_NAME}. The site is operated by {COMPANY_NAME}.
      </p>

      <section className="space-y-3">
        <h2 className="text-xl font-medium">The service</h2>
        <p className="leading-relaxed">
          {SITE_NAME} offers free grammar practice and short explanations. It is a learning aid, not
          a school, exam, or professional language service. Content can change as we improve the
          site.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-medium">Your use</h2>
        <p className="leading-relaxed">
          Use the site for your own learning. Do not copy the questions or explanations to run
          another service, and do not try to break or overload the site.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-medium">Progress on your device</h2>
        <p className="leading-relaxed">
          Streaks and missed rules are stored in your browser. We do not promise that this record
          will last forever or work on every device.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-medium">Content</h2>
        <p className="leading-relaxed">
          The site, questions, and explanations belong to {COMPANY_NAME}. You may not republish them
          as your own product.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-medium">No warranty</h2>
        <p className="leading-relaxed">
          We provide the site as it is. We are not liable for learning outcomes, exam results, or
          loss of progress stored on your device.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-medium">Contact</h2>
        <p className="leading-relaxed">
          Questions about these terms:{" "}
          <a className="text-accent underline-offset-4 hover:underline" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
        </p>
      </section>
    </article>
  );
}
