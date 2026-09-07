import type { Attempt, Question } from "./types";

const SESSION_SIZE = 8;

function lastAttempts(questionId: string, attempts: Attempt[], limit = 5): Attempt[] {
  return attempts.filter((attempt) => attempt.questionId === questionId).slice(-limit);
}

function priority(question: Question, attempts: Attempt[]): number {
  const history = lastAttempts(question.id, attempts);
  if (history.length === 0) return 4;

  const last = history[history.length - 1];
  const ageHours = (Date.now() - last.at) / (1000 * 60 * 60);
  const recentCorrect = [...history].reverse().findIndex((attempt) => !attempt.correct);
  const correctStreak = recentCorrect === -1 ? history.length : recentCorrect;

  if (!last.correct) {
    if (ageHours < 24) return 10;
    if (ageHours < 72) return 8;
    return 6;
  }
  if (correctStreak >= 3 && ageHours > 24) return 1;
  if (correctStreak >= 2) return 2;
  return 3;
}

export function buildSession(pool: Question[], attempts: Attempt[]): Question[] {
  const ranked = [...pool].sort((a, b) => {
    const delta = priority(b, attempts) - priority(a, attempts);
    if (delta !== 0) return delta;
    return a.id.localeCompare(b.id);
  });
  return ranked.slice(0, Math.min(SESSION_SIZE, ranked.length));
}

/** After a miss, show the same item again later in the session. */
export function requeueMiss(queue: Question[], currentIndex: number, missed: Question): Question[] {
  const alreadyAhead = queue.slice(currentIndex + 1).some((item) => item.id === missed.id);
  if (alreadyAhead) return queue;
  const insertAt = Math.min(currentIndex + 3, queue.length);
  const next = [...queue];
  next.splice(insertAt, 0, missed);
  return next;
}
