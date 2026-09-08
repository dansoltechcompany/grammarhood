import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PracticeClient } from "@/components/PracticeClient";
import { QUESTIONS, questionsForTopic } from "@/content/questions";
import { getTopic, liveTopics } from "@/content/topics";
import { SITE_URL } from "@/lib/site";

type Props = { searchParams: Promise<{ topic?: string }> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { topic: topicId } = await searchParams;
  const topic = topicId ? getTopic(topicId) : null;
  const liveTopic = topic?.status === "live" ? topic : null;

  return {
    title: liveTopic ? `Practice: ${liveTopic.title}` : "Practice",
    description: liveTopic
      ? `Eight questions on ${liveTopic.title}. A plain rule when you miss, then a recap.`
      : "A ten-minute mixed session. Eight questions, a plain rule when you miss, then a recap.",
    robots: { index: false, follow: false },
    alternates: {
      canonical: liveTopic ? `${SITE_URL}/grammar/${liveTopic.id}` : `${SITE_URL}/practice`,
    },
  };
}

export default async function PracticePage({ searchParams }: Props) {
  const { topic: topicId } = await searchParams;
  if (topicId) {
    const topic = getTopic(topicId);
    if (!topic || topic.status !== "live") notFound();
    return <PracticeClient questions={questionsForTopic(topic.id)} topic={topic} />;
  }
  const liveIds = new Set(liveTopics().map((topic) => topic.id));
  const mixed = QUESTIONS.filter((question) => liveIds.has(question.topicId));
  return <PracticeClient questions={mixed} topic={null} />;
}
