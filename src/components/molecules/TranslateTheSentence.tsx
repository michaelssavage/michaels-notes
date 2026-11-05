import { CheckIcon, XIcon } from "@/components/icons";
import {
  AnswerButton,
  BlankContainer,
  IconButton,
  TranslateTextArea,
} from "@/components/molecules/FillTheBlank/FillInTheBlank.styled";
import { useAnswerState } from "@/components/molecules/FillTheBlank/useAnswerState";
import { ChangeEvent } from "react";

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
  const { userAnswer, status, change, clear, reveal } = useAnswerState({
    correctAnswer,
    value,
    onValueChange,
  });

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    change(e.target.value);

  return (
    <BlankContainer>
      <p>{sentence}</p>
      <TranslateTextArea $status={status}>
        <textarea
          name="translate-the-sentence"
          value={userAnswer}
          onChange={handleInputChange}
          placeholder="Escribe la traducción..."
          autoComplete="off"
          rows={1}
        />

        {(status === "correct" || status === "revealed") && (
          <IconButton
            type="button"
            aria-label="Clear answer"
            onClick={clear}
            height="auto"
          >
            <CheckIcon />
          </IconButton>
        )}

        {status === "incorrect" && (
          <IconButton
            type="button"
            aria-label="Clear answer"
            onClick={clear}
            height="auto"
          >
            <XIcon />
          </IconButton>
        )}
      </TranslateTextArea>

      {status !== "correct" &&
        status !== "revealed" &&
        userAnswer.length > 0 && (
          <AnswerButton onClick={reveal}>Show Answer</AnswerButton>
        )}
    </BlankContainer>
  );
};
