import type { Metadata } from "next";
import { Figtree, Fraunces } from "next/font/google";
import Link from "next/link";
import { COMPANY_NAME, CONTACT_EMAIL, SITE_NAME } from "@/lib/site";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
});

const sans = Figtree({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s · ${SITE_NAME}`,
  },
  description:
    "Ten-minute English grammar practice for adult learners. A short rule, mixed questions, and a recap of what you missed.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${sans.variable} min-h-screen antialiased`}>
        <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-4 pb-16 pt-6">
          <header className="mb-10 flex items-baseline justify-between gap-4">
            <Link href="/" className="font-[family-name:var(--font-display)] text-xl tracking-tight">
              {SITE_NAME}
            </Link>
            <nav className="flex gap-4 text-sm text-muted">
              <Link href="/practice" className="hover:text-ink">
                Practice
              </Link>
              <Link href="/grammar" className="hover:text-ink">
                Topics
              </Link>
            </nav>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="mt-16 border-t border-line pt-6 text-sm text-muted">
            <p>
              {SITE_NAME} is a product of {COMPANY_NAME}.
            </p>
            <p className="mt-1">
              <a className="hover:text-ink" href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </a>
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
