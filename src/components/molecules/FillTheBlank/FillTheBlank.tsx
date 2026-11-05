import { CheckIcon, CopyIcon, XIcon } from "@/components/icons";
import { ChangeEvent } from "react";
import toast from "react-hot-toast";
import {
  AnswerButton,
  BlankContainer,
  IconButton,
  InputWrapper,
} from "./FillInTheBlank.styled";
import {
  buildFillInTheBlankSentence,
  stripParentheticalVerbHints,
} from "./fillInTheBlank.util";
import { useAnswerState } from "./useAnswerState";

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
  const { userAnswer, status, change, clear, reveal } = useAnswerState({
    correctAnswer,
    value,
    onValueChange,
    ignorePronouns: true,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    change(e.target.value);

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

        <InputWrapper $status={status} chars={inputCharWidth}>
          <input
            type="text"
            name="fill-in-the-blank"
            value={userAnswer}
            onChange={handleInputChange}
            placeholder="_______________"
            autoComplete="off"
          />

          {(status === "correct" || status === "revealed") && (
            <IconButton type="button" aria-label="Clear answer" onClick={clear}>
              <CheckIcon />
            </IconButton>
          )}

          {status === "incorrect" && (
            <IconButton type="button" aria-label="Clear answer" onClick={clear}>
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

        {status !== "correct" &&
          status !== "revealed" &&
          userAnswer.length > 0 && (
            <AnswerButton onClick={reveal}>Show Answer</AnswerButton>
          )}
      </BlankContainer>
    </>
  );
};
