import { getFeedback } from "@/api/d1/feedback.api";
import { Group } from "@/components/atoms/Group/Group";
import {
  FeedbackCard,
  IpAddress,
} from "@/components/molecules/Feedback/Feedback.styled";
import { formatDate } from "@/lib/utils";
import { Heading, Page, Panel } from "@/styles/routes/blog.styled";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  beforeLoad: ({ context }) => {
    if (!context.isAdmin) {
      throw redirect({ to: "/login" });
    }
  },
});

function AdminPage() {
  const fetchFeedback = useServerFn(getFeedback);

  const { data } = useQuery({
    queryKey: ["feedback"],
    queryFn: fetchFeedback,
    refetchOnWindowFocus: false,
  });
  return (
    <Page>
      <Panel>
        <Heading>Feedback</Heading>
        <Group direction="column" gap="2rem">
          {data?.map(({ createdAt, text, ip }) => (
            <Group key={createdAt} direction="column" gap="0.5rem">
              <p>
                {formatDate({
                  value: createdAt,
                  dateStyle: "medium",
                  timeStyle: "medium",
                })}
              </p>
              <FeedbackCard>
                <Group direction="column" gap="0.5rem">
                  <IpAddress>IP: {ip}</IpAddress>
                  <p>{text}</p>
                </Group>
              </FeedbackCard>
            </Group>
          ))}
        </Group>
      </Panel>
    </Page>
  );
}
