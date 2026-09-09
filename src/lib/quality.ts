import { QUESTIONS } from "../content/questions";
import { TOPICS } from "../content/topics";
import { COPY_SIMILARITY_LIMIT, ruleSimilarity } from "./similarity";

type Issue = { level: "error" | "warn"; message: string };

export function checkTopics(): Issue[] {
  const issues: Issue[] = [];
  const ids = TOPICS.map((topic) => topic.id);

  if (TOPICS.length !== 100) {
    issues.push({
      level: "error",
      message: `Expected 100 topics in the map, found ${TOPICS.length}.`,
    });
  }

  const idSet = new Set<string>();
  for (const topic of TOPICS) {
    if (idSet.has(topic.id)) {
      issues.push({ level: "error", message: `Duplicate topic id: ${topic.id}` });
    }
    idSet.add(topic.id);
    for (const sister of topic.sisters) {
      if (!ids.includes(sister)) {
        issues.push({
          level: "error",
          message: `${topic.id} lists unknown sister "${sister}".`,
        });
      }
    }
  }

  const promptSet = new Set<string>();
  const questionIds = new Set<string>();

  for (const question of QUESTIONS) {
    if (questionIds.has(question.id)) {
      issues.push({ level: "error", message: `Duplicate question id: ${question.id}` });
    }
    questionIds.add(question.id);

    const topic = TOPICS.find((item) => item.id === question.topicId);
    if (!topic) {
      issues.push({
        level: "error",
        message: `Question ${question.id} points at unknown topic ${question.topicId}.`,
      });
      continue;
    }

    if (!question.hint?.trim()) {
      issues.push({ level: "error", message: `${question.id} is missing a hint.` });
    }
    if (!question.explanation?.trim()) {
      issues.push({ level: "error", message: `${question.id} is missing an explanation.` });
    }
    if (!question.subRule?.trim()) {
      issues.push({ level: "error", message: `${question.id} is missing subRule.` });
    }
    if (!question.prompt?.trim() || !question.answer?.trim()) {
      issues.push({ level: "error", message: `${question.id} is missing prompt or answer.` });
    }

    const promptKey = `${question.topicId}::${question.prompt.trim().toLowerCase()}`;
    if (promptSet.has(promptKey)) {
      issues.push({ level: "error", message: `Duplicate prompt in ${question.topicId}: "${question.prompt}"` });
    }
    promptSet.add(promptKey);
  }

  const live = TOPICS.filter((topic) => topic.status === "live");
  for (const topic of live) {
    if (!topic.ruleReviewed) {
      issues.push({
        level: "error",
        message: `${topic.id} is live but ruleReviewed is false. Conceptual distinctness is your skim, not the script.`,
      });
    }
    if (!topic.rule.trim() || !topic.exampleGood.trim() || !topic.exampleBad.trim()) {
      issues.push({
        level: "error",
        message: `${topic.id} is live but missing rule or examples.`,
      });
    }
    if (topic.examples.length < 2 || topic.examples.length > 4) {
      issues.push({
        level: "error",
        message: `${topic.id} needs 2–4 example pairs (found ${topic.examples.length}).`,
      });
    }
    if (topic.examples.some((example) => !example.yes.trim() || !example.no.trim())) {
      issues.push({
        level: "error",
        message: `${topic.id} has an empty Yes/No example.`,
      });
    }
    if (!topic.watchFor.trim()) {
      issues.push({
        level: "error",
        message: `${topic.id} is live but missing a watch-for line.`,
      });
    }

    const bank = QUESTIONS.filter((question) => question.topicId === topic.id);
    if (bank.length < 8) {
      issues.push({
        level: "error",
        message: `${topic.id} is live with ${bank.length} questions (need 8+).`,
      });
    }

    for (const sisterId of topic.sisters) {
      const sister = TOPICS.find((item) => item.id === sisterId);
      if (!sister?.rule.trim()) continue;
      const score = ruleSimilarity(topic.rule, sister.rule);
      if (score >= COPY_SIMILARITY_LIMIT) {
        issues.push({
          level: "error",
          message: `${topic.id} rule looks copied from sister ${sisterId} (similarity ${score.toFixed(2)}). Script only detects copy-paste — you still skim for distinct ideas.`,
        });
      }
    }
  }

  for (let i = 0; i < live.length; i += 1) {
    for (let j = i + 1; j < live.length; j += 1) {
      const score = ruleSimilarity(live[i].rule, live[j].rule);
      if (score >= COPY_SIMILARITY_LIMIT) {
        issues.push({
          level: "error",
          message: `Live rules too similar: ${live[i].id} vs ${live[j].id} (${score.toFixed(2)}).`,
        });
      }
    }
  }

  return issues;
}
