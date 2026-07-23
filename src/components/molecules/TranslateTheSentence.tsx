import { CheckIcon, XIcon } from "@/components/icons";
import {
  AnswerButton,
  BlankContainer,
  IconButton,
  TranslateTextArea,
} from "@/components/molecules/FillTheBlank/FillInTheBlank.styled";
import { getAnswerValidation } from "@/components/molecules/FillTheBlank/fillInTheBlank.util";
import { ChangeEvent, useMemo, useState } from "react";

interface TranslateTheSentenceProps {
  sentence: string;
  correctAnswer: string | string[];
  value?: string;
  onValueChange?: (value: string) => void;
}

export const TranslateTheSentence = ({
  sentence,
  correctAnswer,
  value,
  onValueChange,
}: TranslateTheSentenceProps) => {
  const [internalAnswer, setInternalAnswer] = useState("");
  const isControlled = value !== undefined;
  const userAnswer = isControlled ? value : internalAnswer;

  const correctAnswers = useMemo(
    () => (Array.isArray(correctAnswer) ? correctAnswer : [correctAnswer]),
    [correctAnswer],
  );
  const firstCorrectAnswer = correctAnswers[0] ?? "";
  const { isCorrect, isPartiallyCorrect } = useMemo(
    () => getAnswerValidation(userAnswer, correctAnswers),
    [userAnswer, correctAnswers],
  );

  const setUserAnswer = (next: string) => {
    if (isControlled) {
      onValueChange?.(next);
    } else {
      setInternalAnswer(next);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setUserAnswer(e.target.value);
  };

  const clearAnswer = () => {
    setUserAnswer("");
  };

  const showAnswer = () => {
    setUserAnswer(firstCorrectAnswer);
  };

  return (
    <BlankContainer>
      <p>{sentence}</p>
      <TranslateTextArea
        isCorrect={isCorrect}
        isPartiallyCorrect={isPartiallyCorrect}
      >
        <textarea
          name="translate-the-sentence"
          value={userAnswer}
          onChange={handleInputChange}
          placeholder="Escribe la traducción..."
          autoComplete="off"
          rows={1}
        />

        {isCorrect === true && (
          <IconButton
            type="button"
            aria-label="Clear answer"
            onClick={clearAnswer}
            height="auto"
          >
            <CheckIcon />
          </IconButton>
        )}

        {isCorrect === false && !isPartiallyCorrect && (
          <IconButton
            type="button"
            aria-label="Clear answer"
            onClick={clearAnswer}
            height="auto"
          >
            <XIcon />
          </IconButton>
        )}
      </TranslateTextArea>

      {!isCorrect && userAnswer.length > 0 && (
        <AnswerButton onClick={showAnswer}>Show Answer</AnswerButton>
      )}
    </BlankContainer>
  );
};
