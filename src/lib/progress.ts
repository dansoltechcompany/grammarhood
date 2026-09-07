import type { Attempt, Progress } from "./types";

const STORAGE_KEY = "grammarhood-progress-v1";
const LEGACY_STORAGE_KEY = "grammar-coach-progress-v1";

function todayStamp(): string {
  return new Date().toISOString().slice(0, 10);
}

function createDeviceId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `dev-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function emptyProgress(): Progress {
  return {
    deviceId: createDeviceId(),
    streakDays: 0,
    lastPracticeDate: null,
    attempts: [],
  };
}

export function loadProgress(): Progress {
  if (typeof window === "undefined") return emptyProgress();
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const raw = stored ?? localStorage.getItem(LEGACY_STORAGE_KEY);
    if (!raw) {
      const fresh = emptyProgress();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
      return fresh;
    }
    const parsed = JSON.parse(raw) as Progress;
    if (!parsed.deviceId || !Array.isArray(parsed.attempts)) {
      return emptyProgress();
    }
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, raw);
    }
    return parsed;
  } catch {
    return emptyProgress();
  }
}

export function saveProgress(progress: Progress): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  window.dispatchEvent(new Event("grammar-progress"));
}

export function recordAttempts(newAttempts: Attempt[]): Progress {
  const progress = loadProgress();
  const today = todayStamp();
  let streakDays = progress.streakDays;
  if (progress.lastPracticeDate !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStamp = yesterday.toISOString().slice(0, 10);
    streakDays = progress.lastPracticeDate === yesterdayStamp ? progress.streakDays + 1 : 1;
  }
  const next: Progress = {
    ...progress,
    streakDays,
    lastPracticeDate: today,
    attempts: [...progress.attempts, ...newAttempts],
  };
  saveProgress(next);
  return next;
}

export function weakestTopicId(progress: Progress, liveIds: string[]): string | null {
  const relevant = progress.attempts.filter((attempt) => liveIds.includes(attempt.topicId));
  if (relevant.length === 0) return liveIds[0] ?? null;

  const byTopic = new Map<string, { wrong: number; total: number }>();
  for (const attempt of relevant) {
    const current = byTopic.get(attempt.topicId) ?? { wrong: 0, total: 0 };
    current.total += 1;
    if (!attempt.correct) current.wrong += 1;
    byTopic.set(attempt.topicId, current);
  }

  let worst: { id: string; rate: number } | null = null;
  for (const [id, stats] of byTopic) {
    const rate = stats.wrong / stats.total;
    if (!worst || rate > worst.rate) worst = { id, rate };
  }
  return worst?.id ?? liveIds[0] ?? null;
}

export function missedSubRules(attempts: Attempt[]): string[] {
  const counts = new Map<string, number>();
  for (const attempt of attempts) {
    if (!attempt.correct) {
      counts.set(attempt.subRule, (counts.get(attempt.subRule) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([subRule]) => subRule);
}
