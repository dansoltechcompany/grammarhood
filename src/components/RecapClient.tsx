"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { SESSION_KEY, type SessionResult } from "./PracticeClient";
import { missedSubRules } from "@/lib/progress";

type Stored = {
  topicId: string | null;
  topicTitle: string;
  results: SessionResult[];
};

const SUB_RULE_LABELS: Record<string, string> = {
  "an-before-vowel-sound": "an before a vowel sound",
  "a-before-consonant": "a before a consonant sound",
  "the-specific": "the when you both know which one",
  "first-then-the": "a first, then the",
  "no-a-with-uncountable": "no a/an with uncountable nouns",
  "i-am": "I am",
  "he-she-it-is": "he/she/it is",
  "you-we-they-are": "you/we/they are",
  "habit-vs-now": "habit vs now",
  "stative-verbs": "state verbs stay simple",
  "facts-simple": "facts use present simple",
  "temporary-now": "temporary situations around now",
  "he-she-it-s": "he/she/it + -s",
  "regular-ed": "regular past: -ed",
  irregular: "irregular past forms",
  "did-plus-base": "did + base verb",
  "subject-form": "subject pronoun",
  "object-after-verb": "object after the verb",
  "object-after-preposition": "object after a preposition",
  "on-surface": "on a surface",
  "in-space": "in a space",
  "at-point": "at a point",
  "on-day": "on + day/date",
  "in-month-year": "in + month/year/part of day",
  "at-clock": "at + clock time / night",
  "singular-is": "there is + singular",
  "plural-are": "there are + plural",
  "short-er": "short adjectives: -er",
  "more-long": "long adjectives: more",
  "than-not-that": "than, not that",
  "superlative-the": "the + superlative",
  "finished-time-past-simple": "finished time → past simple",
  "experience-present-perfect": "life experience → present perfect",
  "result-now": "result that is still true now",
  "until-now": "since/for until now",
  "third-person-s": "he/she/it + -s",
  "base-form": "I/you/we/they + base",
  "doesnt-base": "doesn't + base",
  "does-plus-base": "does + base",
  "dont-base": "don't + base",
  "do-plus-base": "do + base",
  "be-plus-ing": "am/is/are + -ing",
  "negative-ing": "isn't/aren't + -ing",
  "be-question": "invert am/is/are",
  "was-were-ing": "was/were + -ing",
  "negative-past-ing": "wasn't/weren't + -ing",
  "were-question": "were you + -ing",
  interrupt: "background vs interruption",
  "while-background": "while + past continuous",
  "have-has-pp": "have/has + past participle",
  "will-now": "will for a decision now",
  "going-to-evidence": "going to from evidence",
  "going-to-plan": "going to for a plan",
  "be-going-to": "am/is/are going to + verb",
  "general-no-article": "no article for things in general",
  institution: "go to school (no article)",
  "the-for-specific": "the for specific things",
  "some-positive": "some in positives",
  "any-negative-question": "any in questions/negatives",
  "some-offer": "some in offers",
  "many-count": "many + countable",
  "much-uncount": "much + uncountable",
  "a-lot-of": "a lot of",
  "near-singular": "this = near + one",
  "far-plural": "those = far + plural",
  "near-plural": "these = near + plural",
  "far-singular": "that = far + one",
  "adj-before-noun": "my/your before a noun",
  "pronoun-alone": "mine/yours stand alone",
  "apostrophe-s": "'s for belonging",
  "plural-apostrophe": "plural s'",
  "irregular-plural": "children's",
  "do-base": "do + base",
  "does-base": "does + base",
  "did-base": "did + base",
  "can-count": "countable nouns",
  "a-with-count": "a/an with countable",
  "no-a-uncount": "no a/an with uncountable",
  "can-ability": "can for ability/permission",
  "could-polite": "could for polite requests",
  "base-after-modal": "base verb after can/could",
  "could-past": "could as past of can",
  "have-to-rule": "have to from a rule",
  "must-speaker": "must from the speaker",
  "no-to-after-must": "no to after must",
  "dont-have-to": "don't have to = not necessary",
  "mustnt-forbidden": "mustn't = not allowed",
  "should-advice": "should for advice",
  "should-base": "should + base",
  "used-to-habit": "used to for a finished habit",
  "did-use-to": "did you use to",
  "since-point": "since + starting point",
  "for-period": "for + length of time",
  "its-contraction": "it's = it is / it has",
  "its-possessive": "its = belonging",
  "affect-verb": "affect is the verb",
  "effect-noun": "effect is the noun",
  "fewer-count": "fewer + countable",
  "less-uncount": "less + uncountable",
  "make-create": "make for creating",
  "do-task": "do for tasks",
  "tell-person": "tell someone",
  "say-words": "say something",
  "good-noun": "good + noun",
  "well-verb": "well + verb",
  "well-health": "feel well",
  "every-group": "every = the group",
  "each-one-by-one": "each = one by one",
  "singular-after": "every/each + singular",
  "another-one": "another + singular",
  "others-alone": "others stands alone",
  "the-other": "the other = the remaining one",
  "other-plus-noun": "other + noun",
  "gone-still-there": "gone = still there",
  "been-back": "been = went and came back",
  "ed-feeling": "-ed how you feel",
  "ing-cause": "-ing what causes it",
  "enjoy-ing": "enjoy/avoid/finish + -ing",
  "mind-ing": "mind/suggest/consider + -ing",
  "decide-to": "decide/hope/refuse + to",
  "want-to": "want/plan/learn + to",
  "because-reason": "because = reason",
  "although-concede": "although = concession",
  "however-contrast": "however starts a contrast",
  "despite-noun": "despite / in spite of + noun or -ing",
  "not-clause": "no full clause after despite",
  "so-adj": "so + adjective/adverb",
  "such-noun": "such + (a) + adjective + noun",
  "so-agree": "so + auxiliary + subject",
  "neither-agree": "neither + auxiliary + subject",
  "wish-past-present": "wish + past for now",
  "wish-past-perfect": "wish + past perfect for the past",
  "have-done": "have something done",
  "get-done": "get something done",
  "everyone-singular": "everyone/each/nobody + singular",
  "news-singular": "news/furniture + singular",
  "plural-plural": "plural subject + plural verb",
  "no-plural": "advice/information: no plural",
  "piece-of": "a piece of + uncountable",
  "by-deadline": "by = not later than",
  "until-continue": "until = up to that time",
  "on-time-schedule": "on time = as scheduled",
  "in-time-spare": "in time = not too late",
  "at-end-of": "at the end of + noun",
  "in-the-end-finally": "in the end = finally",
  "during-noun": "during + noun",
  "while-clause": "while + clause",
  "who-subject": "who = subject",
  "whom-object": "whom = object",
  "like-similar": "like + noun = similar to",
  "as-role": "as = role or + clause",
  "bring-here": "bring towards here",
  "take-away": "take away from here",
  "borrow-from": "borrow from someone",
  "lend-to": "lend to someone",
  "look-at": "look at = direct your eyes",
  "watch-period": "watch = look for a period",
  "see-notice": "see = notice",
  "hear-sound": "hear = sound reaches you",
  "listen-to": "listen to = pay attention",
  "particle-meaning": "verb + particle changes the meaning",
  "in-order-to": "in order to + base",
  "so-that-clause": "so that + clause",
  "rather-prefer": "would rather = preference",
  "had-better-warn": "had better = warning",
  "stop-ing-quit": "stop + -ing = quit",
  "stop-to-purpose": "stop to = pause in order to",
  "remember-to": "remember to = don't forget",
  "remember-ing": "remember + -ing = a memory",
  "who-people": "who for people",
  "which-things": "which for things",
  "that-identifying": "that in identifying clauses",
  "first-real": "first conditional = real future",
  "second-unreal": "second conditional = unreal",
  "pp-result": "present perfect = result",
  "ppc-activity": "present perfect continuous = activity",
  "if-whether": "reported yes/no: if/whether",
  "statement-order": "reported questions: statement order",
  "lay-object": "lay = put (needs an object)",
  "lie-recline": "lie = recline (no object)",
  "will-have-pp": "will have + past participle",
  "by-future-point": "by + a future point",
};

let recapRaw: string | null = null;
let recapParsed: Stored | null = null;

function getSnapshot(): Stored | null {
  const raw = sessionStorage.getItem(SESSION_KEY);
  if (raw === recapRaw) return recapParsed;
  recapRaw = raw;
  recapParsed = raw ? (JSON.parse(raw) as Stored) : null;
  return recapParsed;
}

function getServerSnapshot(): Stored | null {
  return null;
}

function subscribe(onChange: () => void): () => void {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

export function RecapClient() {
  const data = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!data) {
    return (
      <div className="space-y-4">
        <h1 className="font-[family-name:var(--font-display)] text-3xl">No session to recap yet</h1>
        <Link href="/practice" className="text-accent underline">
          Start practice
        </Link>
      </div>
    );
  }

  const right = data.results.filter((result) => result.correct).length;
  const missed = missedSubRules(
    data.results.map((result) => ({
      questionId: result.questionId,
      topicId: result.topicId,
      subRule: result.subRule,
      correct: result.correct,
      at: 0,
    })),
  );

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-sm text-muted">{data.topicTitle}</p>
        <h1 className="font-[family-name:var(--font-display)] text-4xl">
          {right}/{data.results.length} this session
        </h1>
      </header>

      {missed.length > 0 ? (
        <section className="rounded-2xl border border-line bg-card p-5">
          <h2 className="text-sm uppercase tracking-[0.16em] text-muted">Come back to these</h2>
          <ul className="mt-3 space-y-2">
            {missed.map((subRule) => (
              <li key={subRule}>{SUB_RULE_LABELS[subRule] ?? subRule}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted">Tomorrow’s 10 minutes will start with these, not a random list.</p>
        </section>
      ) : (
        <p className="text-good">Clean session. Mixed practice tomorrow will keep it honest.</p>
      )}

      <div className="flex flex-wrap gap-3">
        <Link href="/practice" className="rounded-full bg-accent px-5 py-3 text-sm text-white">
          Practice again
        </Link>
        <Link href="/" className="rounded-full border border-line px-5 py-3 text-sm">
          Home
        </Link>
      </div>
    </div>
  );
}
