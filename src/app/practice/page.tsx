import { notFound } from "next/navigation";
import { PracticeClient } from "@/components/PracticeClient";
import { QUESTIONS, questionsForTopic } from "@/content/questions";
import { getTopic, liveTopics } from "@/content/topics";

type Props = { searchParams: Promise<{ topic?: string }> };

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
