import { Group } from "@/components/atoms/Group";
import { CheckIcon } from "@/components/icons";
import { MessageHeartIcon } from "@/components/icons/MessageHeart";
import { SendIcon } from "@/components/icons/Send";
import { Button } from "@/components/molecules/Button";
import { TextArea } from "@/components/molecules/Form/TextArea";
import { useTheme } from "@/hooks/use-theme.hook";
import { submitFeedback } from "@/server/feedback.api";
import { css } from "@emotion/react";
import { useState } from "react";
import { LoaderIcon } from "react-hot-toast";
import {
  ButtonGrid,
  Card,
  Container,
  ErrorMessage,
  feedbackBtnStyles,
  FloatingButton,
  SuccessMessage,
} from "./Feedback.styled";

export const Feedback = () => {
  const { lightTheme: theme } = useTheme();
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
    <Container>
      {isExpanded ? (
        <Card>
          {isSubmitted ? (
            <SuccessMessage>
              <Group direction="row" align="center" gap="0.5rem">
                <CheckIcon size={20} />
                <p>Thanks for your feedback!</p>
              </Group>
            </SuccessMessage>
          ) : (
            <>
              <TextArea
                id="feedback"
                placeholder="Leave feedback or say hello!"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                maxLen={2000}
              />
              {error && <ErrorMessage>{error}</ErrorMessage>}
              <ButtonGrid>
                <Button
                  onClick={handleSubmit}
                  disabled={!feedback.trim() || isSubmitting}
                  styles={feedbackBtnStyles(theme)}
                  text={isSubmitting ? "Sending..." : "Send"}
                  icon={isSubmitting ? <LoaderIcon /> : <SendIcon size={16} />}
                />
                <Button
                  text="Close"
                  onClick={() => setIsExpanded(false)}
                  variant="secondary"
                  styles={css`
                    flex: 1;
                    justify-content: center;
                  `}
                />
              </ButtonGrid>
            </>
          )}
        </Card>
      ) : (
        <FloatingButton onClick={() => setIsExpanded(true)}>
          <MessageHeartIcon size={24} />
        </FloatingButton>
      )}
    </Container>
  );
};
