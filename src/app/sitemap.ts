import type { MetadataRoute } from "next";
import { liveTopics } from "@/content/topics";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_URL;
  const live = liveTopics().map((topic) => ({
    url: `${base}/grammar/${topic.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/grammar`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
    { url: `${base}/practice`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    ...live,
  ];
}
