/** Lowercase ASCII letters + strip combining marks (accents) for lenient matching. */
export function normalizeText(s: string): string {
  return s.toLowerCase().normalize("NFD").replace(/\p{M}/gu, "");
}

/** Splits at the first run of two or more underscores (e.g. `___`). */
export function splitFillInTheBlankPrompt(prompt: string): {
  beforeText: string;
  afterText: string;
} | null {
  const match = /_{2,}/.exec(prompt);
  if (!match) return null;
  return {
    beforeText: prompt.slice(0, match.index),
    afterText: prompt.slice(match.index + match[0].length),
  };
}
