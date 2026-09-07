import type { Metadata } from "next";
import { COMPANY_NAME, CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: `How ${SITE_NAME} handles your information.`,
};

export default function PrivacyPage() {
  return (
    <article className="space-y-6">
      <header className="space-y-2">
        <h1 className="font-[family-name:var(--font-display)] text-4xl">Privacy</h1>
        <p className="text-sm text-muted">Last updated 7 September 2026</p>
      </header>

      <p className="text-lg leading-relaxed text-copy">
        {SITE_NAME} is an English grammar practice site. It is operated by {COMPANY_NAME}.
      </p>

      <section className="space-y-3">
        <h2 className="text-xl font-medium">What stays on your device</h2>
        <p className="leading-relaxed">
          Practice progress (streak, answers, and which rules you missed) is saved in your browser
          using local storage. We do not have an account system. That record is not sent to our
          servers.
        </p>
        <p className="leading-relaxed">
          If you clear this site’s data, switch browsers, or use another phone, that progress is
          gone or is a different record.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-medium">What we do not collect</h2>
        <p className="leading-relaxed">
          We do not ask for your name, and we do not sell your information. This site does not use
          advertising cookies or a third-party analytics tool today. If that changes, we will update
          this page.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-medium">Email</h2>
        <p className="leading-relaxed">
          If you write to us, we keep that message so we can reply. We use it only to handle your
          request.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-medium">Contact</h2>
        <p className="leading-relaxed">
          Privacy questions:{" "}
          <a className="text-accent underline-offset-4 hover:underline" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
        </p>
      </section>
    </article>
  );
}
