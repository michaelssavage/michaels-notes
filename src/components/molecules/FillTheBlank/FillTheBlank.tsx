import { CheckIcon, XIcon } from "@/components/icons";
import {
  BlankContainer,
  IconWrapper,
  InputWrapper,
} from "@/components/molecules/FillTheBlank/FillInTheBlank.styled";

import { ChangeEvent, useState } from "react";

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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserAnswer(value);

    if (value.trim().toLowerCase() === correctAnswer.trim().toLowerCase()) {
      setIsCorrect(true);
    } else if (value.length > 1) {
      setIsCorrect(false);
    } else {
      setIsCorrect(null);
    }
  };

  const clearAnswer = () => {
    setUserAnswer("");
    setIsCorrect(null);
  };

  return (
    <>
      {heading && <h3>{heading}</h3>}
      <BlankContainer>
        <span>{beforeText}</span>

        <InputWrapper
          isCorrect={isCorrect}
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

          {isCorrect === false && (
            <IconWrapper onClick={clearAnswer}>
              <XIcon />
            </IconWrapper>
          )}
        </InputWrapper>

        <span>{afterText}</span>
      </BlankContainer>
    </>
  );
};
