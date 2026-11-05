import { useMemo, useState } from "react";
import { getAnswerValidation } from "./fillInTheBlank.util";

/**
 * - unanswered: empty, or too short to judge
 * - incorrect / partial / correct: the result of checking what was typed
 * - revealed: the answer was filled in with "Show Answer"
 */
export type AnswerStatus =
  | "unanswered"
  | "incorrect"
  | "partial"
  | "correct"
  | "revealed";

interface UseAnswerStateOptions {
  correctAnswer: string | string[];
  /** Controlled value. Leave undefined to let the hook own the answer. */
  value?: string;
  onValueChange?: (value: string) => void;
  ignorePronouns?: boolean;
}

export function useAnswerState({
  correctAnswer,
  value,
  onValueChange,
  ignorePronouns = false,
}: UseAnswerStateOptions) {
  const [internalAnswer, setInternalAnswer] = useState("");
  // The text "Show Answer" filled in. The answer only counts as revealed while
  // the input still holds exactly this, so if a controlled `value` is changed
  // by the parent, the revealed state can't get stuck.
  const [revealedAnswer, setRevealedAnswer] = useState<string | null>(null);

  const isControlled = value !== undefined;
  const userAnswer = isControlled ? value : internalAnswer;

  const correctAnswers = useMemo(
    () => (Array.isArray(correctAnswer) ? correctAnswer : [correctAnswer]),
    [correctAnswer],
  );

  const status = useMemo((): AnswerStatus => {
    if (revealedAnswer !== null && userAnswer === revealedAnswer) {
      return "revealed";
    }
    const { isCorrect, isPartiallyCorrect } = getAnswerValidation(
      userAnswer,
      correctAnswers,
      ignorePronouns,
    );
    if (isCorrect === true) return "correct";
    if (isPartiallyCorrect) return "partial";
    if (isCorrect === false) return "incorrect";
    return "unanswered";
  }, [revealedAnswer, userAnswer, correctAnswers, ignorePronouns]);

  const setUserAnswer = (next: string) => {
    if (isControlled) {
      onValueChange?.(next);
    } else {
      setInternalAnswer(next);
    }
  };

  const change = (next: string) => {
    setRevealedAnswer(null);
    setUserAnswer(next);
  };

  const clear = () => change("");

  const reveal = () => {
    const answer = correctAnswers[0] ?? "";
    setRevealedAnswer(answer);
    setUserAnswer(answer);
  };

  return { userAnswer, status, change, clear, reveal };
}
