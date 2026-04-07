import { CheckIcon, XIcon } from "@/components/icons";
import { ChangeEvent, useState } from "react";
import {
  AnswerButton,
  BlankContainer,
  IconWrapper,
  InputWrapper,
} from "./FillInTheBlank.styled";
import { normalizeText } from "./fillInTheBlank.util";

interface FillInTheBlankProps {
  beforeText: string;
  afterText: string;
  correctAnswer: string;
  heading?: string;
}

export const FillInTheBlank = ({
  heading,
  beforeText,
  afterText,
  correctAnswer,
}: FillInTheBlankProps) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isPartiallyCorrect, setIsPartiallyCorrect] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserAnswer(value);

    const trimmedUser = value.trim();
    const trimmedCorrect = correctAnswer.trim();

    if (trimmedUser.toLowerCase() === trimmedCorrect.toLowerCase()) {
      setIsCorrect(true);
      setIsPartiallyCorrect(false);
    } else if (trimmedUser.length > 1) {
      const userBase = normalizeText(trimmedUser);
      const correctBase = normalizeText(trimmedCorrect);
      if (userBase === correctBase) {
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
    setUserAnswer(correctAnswer);
    setIsCorrect(true);
    setIsPartiallyCorrect(false);
  };

  return (
    <>
      {heading && <h3>{heading}</h3>}
      <BlankContainer>
        <span>{beforeText}</span>

        <InputWrapper
          isCorrect={isCorrect}
          isPartiallyCorrect={isPartiallyCorrect}
          chars={Math.max(userAnswer.length, 12)}
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
            <IconWrapper onClick={clearAnswer}>
              <CheckIcon />
            </IconWrapper>
          )}

          {isCorrect === false && !isPartiallyCorrect && (
            <IconWrapper onClick={clearAnswer}>
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
