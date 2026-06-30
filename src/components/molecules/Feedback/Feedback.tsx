import { submitFeedback } from "@/api/d1/feedback.api";
import { Group } from "@/components/atoms/Group";
import { TextArea } from "@/components/form/TextArea";
import { CheckIcon } from "@/components/icons";
import { SendIcon } from "@/components/icons/Send";
import { Button } from "@/components/molecules/Button";
import { lazy, useState } from "react";
import {
  Card,
  ErrorMessage,
  feedbackBtnStyles,
  SuccessMessage,
} from "./Feedback.styled";

const LoaderIcon = lazy(() =>
  import("react-hot-toast").then((mod) => ({ default: mod.LoaderIcon })),
);

export const Feedback = () => {
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
        }, 5000);
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
    <Card>
      {isSubmitted ? (
        <SuccessMessage>
          <Group direction="row" align="center" gap="0.5rem">
            <CheckIcon size={24} />
            <p>Thank you!</p>
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
          <Button
            onClick={handleSubmit}
            disabled={!feedback.trim() || isSubmitting}
            styles={feedbackBtnStyles}
            text={isSubmitting ? "Sending..." : "Send"}
            icon={isSubmitting ? <LoaderIcon /> : <SendIcon size={16} />}
          />
        </>
      )}
    </Card>
  );
};
