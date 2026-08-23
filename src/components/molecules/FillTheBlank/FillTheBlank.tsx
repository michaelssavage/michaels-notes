import { CheckIcon, CopyIcon, XIcon } from "@/components/icons";
import { ChangeEvent, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  AnswerButton,
  BlankContainer,
  IconButton,
  InputWrapper,
} from "./FillInTheBlank.styled";
import {
  buildFillInTheBlankSentence,
  getAnswerValidation,
  stripParentheticalVerbHints,
} from "./fillInTheBlank.util";

interface FillInTheBlankProps {
  beforeText: string;
  afterText: string;
  correctAnswer: string | string[];
  promptText?: string;
  heading?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

export const FillInTheBlank = ({
  heading,
  beforeText,
  afterText,
  correctAnswer,
  promptText,
  value,
  onValueChange,
}: FillInTheBlankProps) => {
  const [internalAnswer, setInternalAnswer] = useState("");
  const isControlled = value !== undefined;
  const userAnswer = isControlled ? value : internalAnswer;
  const correctAnswers = useMemo(
    () => (Array.isArray(correctAnswer) ? correctAnswer : [correctAnswer]),
    [correctAnswer],
  );
  const firstCorrectAnswer = correctAnswers[0] ?? "";
  const { isCorrect, isPartiallyCorrect } = useMemo(
    () => getAnswerValidation(userAnswer, correctAnswers, true),
    [userAnswer, correctAnswers],
  );

  const setUserAnswer = (next: string) => {
    if (isControlled) {
      onValueChange?.(next);
    } else {
      setInternalAnswer(next);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(e.target.value);
  };

  const clearAnswer = () => {
    setUserAnswer("");
  };

  const showAnswer = () => {
    setUserAnswer(firstCorrectAnswer);
  };

  const getSentenceText = () => {
    const filled = promptText
      ? buildFillInTheBlankSentence(promptText, userAnswer)
      : `${beforeText}${userAnswer}${afterText}`;
    if (promptText || !userAnswer.trim()) return filled;
    return stripParentheticalVerbHints(filled);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getSentenceText());
      toast.success("Sentence copied to clipboard");
    } catch {
      toast.error("Could not copy sentence");
    }
  };

  const inputCharWidth = Math.max(userAnswer.length, 12);

  return (
    <>
      {heading && <h3>{heading}</h3>}
      <BlankContainer>
        <span>{beforeText}</span>

        <InputWrapper
          isCorrect={isCorrect}
          isPartiallyCorrect={isPartiallyCorrect}
          chars={inputCharWidth}
        >
          <input
            type="text"
            name="fill-in-the-blank"
            value={userAnswer}
            onChange={handleInputChange}
            placeholder="_______________"
            autoComplete="off"
          />

          {isCorrect === true && (
            <IconButton
              type="button"
              aria-label="Clear answer"
              onClick={clearAnswer}
            >
              <CheckIcon />
            </IconButton>
          )}

          {isCorrect === false && !isPartiallyCorrect && (
            <IconButton
              type="button"
              aria-label="Clear answer"
              onClick={clearAnswer}
            >
              <XIcon />
            </IconButton>
          )}
        </InputWrapper>

        <span>{afterText}</span>

        <IconButton
          type="button"
          title="Copy sentence"
          aria-label="Copy sentence"
          onClick={handleCopy}
          inline
        >
          <CopyIcon />
        </IconButton>

        {!isCorrect && userAnswer.length > 0 && (
          <AnswerButton onClick={showAnswer}>Show Answer</AnswerButton>
        )}
      </BlankContainer>
    </>
  );
};
