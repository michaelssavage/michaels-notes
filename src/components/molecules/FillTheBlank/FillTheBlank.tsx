import { CheckIcon, XIcon } from "@/components/icons";
import { ChangeEvent, MouseEvent, useState } from "react";
import toast from "react-hot-toast";
import {
  AnswerButton,
  BlankContainer,
  IconWrapper,
  InputWrapper,
} from "./FillInTheBlank.styled";
import {
  buildFillInTheBlankSentence,
  normalizeText,
  stripParentheticalVerbHints,
} from "./fillInTheBlank.util";

interface FillInTheBlankProps {
  beforeText: string;
  afterText: string;
  correctAnswer: string | string[];
  promptText?: string;
  heading?: string;
}

export const FillInTheBlank = ({
  heading,
  beforeText,
  afterText,
  correctAnswer,
  promptText,
}: FillInTheBlankProps) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isPartiallyCorrect, setIsPartiallyCorrect] = useState(false);
  const correctAnswers = Array.isArray(correctAnswer)
    ? correctAnswer
    : [correctAnswer];
  const firstCorrectAnswer = correctAnswers[0] ?? "";

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserAnswer(value);

    const trimmedUser = value.trim();
    const trimmedCorrectAnswers = correctAnswers.map((answer) => answer.trim());

    if (
      trimmedCorrectAnswers.some(
        (answer) => trimmedUser.toLowerCase() === answer.toLowerCase(),
      )
    ) {
      setIsCorrect(true);
      setIsPartiallyCorrect(false);
    } else if (trimmedUser.length > 1) {
      const userBase = normalizeText(trimmedUser);
      const hasPartiallyCorrectAnswer = trimmedCorrectAnswers.some(
        (answer) => userBase === normalizeText(answer),
      );
      if (hasPartiallyCorrectAnswer) {
        setIsCorrect(false);
        setIsPartiallyCorrect(true);
      } else {
        setIsCorrect(false);
        setIsPartiallyCorrect(false);
      }
    } else {
      setIsCorrect(null);
      setIsPartiallyCorrect(false);
    }
  };

  const clearAnswer = () => {
    setUserAnswer("");
    setIsCorrect(null);
    setIsPartiallyCorrect(false);
  };

  const showAnswer = () => {
    setUserAnswer(firstCorrectAnswer);
    setIsCorrect(true);
    setIsPartiallyCorrect(false);
  };

  const getSentenceText = () => {
    const filled = promptText
      ? buildFillInTheBlankSentence(promptText, userAnswer)
      : `${beforeText}${userAnswer}${afterText}`;
    if (promptText || !userAnswer.trim()) return filled;
    return stripParentheticalVerbHints(filled);
  };

  const handleSentenceClick = async (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest("input, button, [data-fill-blank-action]")) return;

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
      <BlankContainer
        onClick={handleSentenceClick}
        title="Click to copy sentence"
      >
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
            <IconWrapper data-fill-blank-action onClick={clearAnswer}>
              <CheckIcon />
            </IconWrapper>
          )}

          {isCorrect === false && !isPartiallyCorrect && (
            <IconWrapper data-fill-blank-action onClick={clearAnswer}>
              <XIcon />
            </IconWrapper>
          )}
        </InputWrapper>

        <span>{afterText}</span>

        {!isCorrect && userAnswer.length > 0 && (
          <AnswerButton onClick={showAnswer}>Show Answer</AnswerButton>
        )}
      </BlankContainer>
    </>
  );
};
