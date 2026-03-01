import { submitFeedback } from "@/api/d1/feedback.api";
import { Group } from "@/components/atoms/Group";
import { TextArea } from "@/components/form/TextArea";
import { CheckIcon } from "@/components/icons";
import { MessageHeartIcon } from "@/components/icons/MessageHeart";
import { SendIcon } from "@/components/icons/Send";
import { Button } from "@/components/molecules/Button";
import { css } from "@emotion/react";
import { lazy, useState } from "react";
import {
  ButtonGrid,
  Card,
  ErrorMessage,
  feedbackBtnStyles,
  HeartContainer,
  SuccessMessage,
} from "./Feedback.styled";

const LoaderIcon = lazy(() =>
  import("react-hot-toast").then((mod) => ({ default: mod.LoaderIcon }))
);

export const Feedback = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!feedback.trim()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await submitFeedback({ data: { text: feedback } });
      if (res.ok) {
        setIsSubmitted(true);
        setFeedback("");
        setError(null);

        setTimeout(() => {
          setIsSubmitted(false);
          setIsExpanded(false);
        }, 2000);
      }
    } catch (err: unknown) {
      if (err instanceof Response && err.status === 429) {
        setError("Please wait before submitting again");
      } else {
        setError("Failed to submit feedback. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {isExpanded ? (
        <Card>
          {isSubmitted ? (
            <SuccessMessage>
              <Group direction="row" align="center" gap="0.5rem">
                <CheckIcon size={24} />
                <p>Thanks for your feedback!</p>
              </Group>
            </SuccessMessage>
          ) : (
            <>
              <TextArea
                id="feedback"
                name="feedback"
                placeholder="Leave feedback or say hello!"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                maxLen={2000}
              />
              {error && <ErrorMessage>{error}</ErrorMessage>}
              <ButtonGrid>
                <Button
                  text="Close"
                  onClick={() => setIsExpanded(false)}
                  variant="secondary"
                  styles={css`
                    flex: 1;
                    justify-content: center;
                  `}
                />
                <Button
                  onClick={handleSubmit}
                  disabled={!feedback.trim() || isSubmitting}
                  styles={feedbackBtnStyles}
                  text={isSubmitting ? "Sending..." : "Send"}
                  icon={isSubmitting ? <LoaderIcon /> : <SendIcon size={16} />}
                />
              </ButtonGrid>
            </>
          )}
        </Card>
      ) : null}
      <Button
        onClick={() => setIsExpanded(true)}
        icon={
          <HeartContainer>
            <MessageHeartIcon size={24} />
          </HeartContainer>
        }
        text="Feedback"
        variant="ghost"
      />
    </>
  );
};
