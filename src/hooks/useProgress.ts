"use client";

import { useSyncExternalStore } from "react";
import { loadProgress } from "@/lib/progress";
import type { Progress } from "@/lib/types";

const EVENT = "grammar-progress";
let snapshot: Progress | null = null;

export function notifyProgress(): void {
  snapshot = null;
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(onChange: () => void): () => void {
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function getSnapshot(): Progress {
  const next = loadProgress();
  if (snapshot && JSON.stringify(snapshot) === JSON.stringify(next)) {
    return snapshot;
  }
  snapshot = next;
  return next;
}

const SERVER_PROGRESS: Progress = {
  deviceId: "",
  streakDays: 0,
  lastPracticeDate: null,
  attempts: [],
};

function getServerSnapshot(): Progress {
  return SERVER_PROGRESS;
}

export function useProgress(): Progress {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
