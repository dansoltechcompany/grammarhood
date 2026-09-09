export type Level = "A1" | "A2" | "B1" | "B2";
export type Phase = 1 | 2 | 3 | 4;
export type TopicStatus = "live" | "draft";
export type QuestionType = "mcq" | "gap" | "fix";

export type RuleExample = {
  yes: string;
  no: string;
};

export type Topic = {
  id: string;
  title: string;
  level: Level;
  phase: Phase;
  status: TopicStatus;
  /** Human skim: is this conceptually distinct from its sisters? */
  ruleReviewed: boolean;
  keyword: string;
  rule: string;
  exampleGood: string;
  exampleBad: string;
  examples: RuleExample[];
  watchFor: string;
  sisters: string[];
  related: string[];
};

export type Question = {
  id: string;
  topicId: string;
  level: Level;
  type: QuestionType;
  prompt: string;
  answer: string;
  options?: string[];
  explanation: string;
  subRule: string;
  hint: string;
};

export type Attempt = {
  questionId: string;
  topicId: string;
  subRule: string;
  correct: boolean;
  at: number;
};

export type Progress = {
  deviceId: string;
  userId?: string;
  streakDays: number;
  lastPracticeDate: string | null;
  attempts: Attempt[];
};
