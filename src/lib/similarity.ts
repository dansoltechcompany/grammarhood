/** Token Jaccard + character-trigram Dice. Used only as copy detection, not conceptual judgment. */

export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokens(text: string): Set<string> {
  return new Set(normalizeText(text).split(" ").filter((token) => token.length > 2));
}

function trigrams(text: string): Set<string> {
  const compact = normalizeText(text).replace(/\s/g, "");
  const grams = new Set<string>();
  for (let i = 0; i < compact.length - 2; i += 1) {
    grams.add(compact.slice(i, i + 3));
  }
  return grams;
}

function jaccard(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 || b.size === 0) return 0;
  let intersection = 0;
  for (const item of a) {
    if (b.has(item)) intersection += 1;
  }
  const union = a.size + b.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

export function ruleSimilarity(a: string, b: string): number {
  if (!a.trim() || !b.trim()) return 0;
  if (normalizeText(a) === normalizeText(b)) return 1;
  const tokenScore = jaccard(tokens(a), tokens(b));
  const gramScore = jaccard(trigrams(a), trigrams(b));
  return Math.max(tokenScore, gramScore);
}

/** Fail copy-paste. Does not decide whether two topics teach different ideas. */
export const COPY_SIMILARITY_LIMIT = 0.78;
