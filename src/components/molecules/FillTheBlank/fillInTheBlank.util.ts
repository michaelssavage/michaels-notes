/** Lowercase ASCII letters + strip combining marks (accents) for lenient matching. */
export function normalizeText(s: string): string {
  return s.toLowerCase().normalize("NFD").replace(/\p{M}/gu, "");
}

/** Removes spaced parenthetical verb hints like `(despertarse)`. */
export function stripParentheticalVerbHints(sentence: string): string {
  return sentence
    .replace(/\s*\([^)]+\)/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

/** Replaces the blank (`___`) in a fill-in-the-blank prompt with the given answer. */
export function buildFillInTheBlankSentence(
  prompt: string,
  answer: string,
): string {
  const filled = prompt.replace(/_{2,}/, answer);
  return answer.trim() ? stripParentheticalVerbHints(filled) : filled;
}

/** Splits at the first run of two or more underscores (e.g. `___`). */
export function splitFillInTheBlankPrompt(prompt: string):
  | {
      type: "fill-in-the-blank";
      beforeText: string;
      afterText: string;
    }
  | {
      type: "translation";
      text: string;
    } {
  const match = /_{2,}/.exec(prompt);
  if (!match) return { type: "translation", text: prompt };
  return {
    type: "fill-in-the-blank",
    beforeText: prompt.slice(0, match.index),
    afterText: prompt.slice(match.index + match[0].length),
  };
}
