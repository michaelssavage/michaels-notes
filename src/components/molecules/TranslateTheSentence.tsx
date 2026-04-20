import {
  AnswerButton,
  AnswerRow,
  AnswerText,
} from "@/components/molecules/FillTheBlank/FillInTheBlank.styled";
import { animated, useTransition } from "@react-spring/web";
import { useState } from "react";

const AnimatedAnswerText = animated(AnswerText);

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

  const answerTransitions = useTransition(showAnswer, {
    from: { opacity: 0, transform: "translateY(-6px)" },
    enter: { opacity: 1, transform: "translateY(0px)" },
    leave: { opacity: 0, transform: "translateY(-6px)" },
    config: { duration: 200 },
  });

  return (
    <div>
      <p>
        {helper ? (
          <>
            {main}{" "}
            <strong>
              <em>{helper}</em>
            </strong>
            <AnswerButton onClick={handleShowAnswer}>
              {showAnswer ? "Hide Answer" : "Show Answer"}
            </AnswerButton>
          </>
        ) : (
          main
        )}
      </p>

      <AnswerRow>
        {answerTransitions((styles, item) =>
          item ? (
            <AnimatedAnswerText style={styles}>
              {correctAnswer}
            </AnimatedAnswerText>
          ) : null,
        )}
      </AnswerRow>
    </div>
  );
};
