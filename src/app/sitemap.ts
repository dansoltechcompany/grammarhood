import type { MetadataRoute } from "next";
import { liveTopics } from "@/content/topics";
import { SITE_URL } from "@/lib/site";

/**
 * lastmod is omitted on purpose. These pages are static lessons; stamping
 * `new Date()` on every request made Google treat the sitemap as constantly
 * changing, which is a reason to leave URLs in "Discovered - currently not indexed".
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; changeFrequency: "weekly" | "yearly"; priority: number }[] = [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/grammar", changeFrequency: "weekly", priority: 0.7 },
    { path: "/contact", changeFrequency: "yearly", priority: 0.3 },
    { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
    { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
  ];

  return [
    ...pages.map((page) => ({
      url: page.path === "/" ? SITE_URL : `${SITE_URL}${page.path}`,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...liveTopics().map((topic) => ({
      url: `${SITE_URL}/grammar/${topic.id}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
