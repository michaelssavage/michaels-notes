import { Group } from "@/components/atoms/Group";
import {
  AnswerButton,
  AnswerText,
} from "@/components/molecules/FillTheBlank/FillInTheBlank.styled";
import { useState } from "react";

interface TranslateTheSentenceProps {
  sentence: string;
  correctAnswer: string;
}

/** Trailing `(…)` at end of string, e.g. grammar hints; inner parens not supported. */
function splitTrailingParenthetical(sentence: string): {
  main: string;
  helper: string | null;
} {
  const m = sentence.match(/\s*(\([^)]+\))\s*$/);
  if (!m || m.index === undefined) return { main: sentence, helper: null };
  return {
    main: sentence.slice(0, m.index).trimEnd(),
    helper: m[1] ?? null,
  };
}

export const TranslateTheSentence = ({
  sentence,
  correctAnswer,
}: TranslateTheSentenceProps) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const { main, helper } = splitTrailingParenthetical(sentence);

  const handleShowAnswer = () => {
    setShowAnswer((prev) => !prev);
  };

  return (
    <div>
      <p>
        {helper ? (
          <>
            {main}{" "}
            <strong>
              <em>{helper}</em>
            </strong>
          </>
        ) : (
          main
        )}
      </p>

      <Group direction="row" align="center" height="30px">
        <AnswerButton onClick={handleShowAnswer}>
          {showAnswer ? "Hide Answer" : "Show Answer"}
        </AnswerButton>
        {showAnswer ? <AnswerText>{correctAnswer}</AnswerText> : null}
      </Group>
    </div>
  );
};
