import type { Metadata, Viewport } from "next";
import { Figtree, Fraunces } from "next/font/google";
import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
import { SiteFooter } from "@/components/SiteFooter";
import { SITE_NAME } from "@/lib/site";
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

export const viewport: Viewport = {
  themeColor: "#f3eee4",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${sans.variable} min-h-screen antialiased`}>
        <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-4 pb-12 pt-6">
          <header className="mb-12 flex items-center justify-between gap-4 border-b border-line pb-5">
            <Link href="/" className="flex items-center gap-2.5">
              <BrandMark className="h-8 w-8 shrink-0" />
              <span className="font-[family-name:var(--font-display)] text-xl tracking-tight">{SITE_NAME}</span>
            </Link>
            <nav className="flex gap-5 text-sm text-muted">
              <Link href="/practice" className="hover:text-ink">
                Practice
              </Link>
              <Link href="/grammar" className="hover:text-ink">
                Topics
              </Link>
            </nav>
          </header>
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
