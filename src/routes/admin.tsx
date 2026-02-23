import { getFeedback } from "@/api/mongo/feedback.api";
import { Group } from "@/components/atoms/Group/Group";
import {
  Card,
  IpAddress,
} from "@/components/molecules/Feedback/Feedback.styled";
import { formatDate } from "@/lib/utils";
import { Heading, Page, Panel } from "@/styles/routes/blog.styled";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { checkAuthFn } from "../api/auth/check.api";

export const Route = createFileRoute("/admin")({
  beforeLoad: async () => {
    const { authenticated } = await checkAuthFn();
    if (!authenticated) {
      throw redirect({ to: "/login" });
    }
  },
  component: AdminPage,
});

function AdminPage() {
  const fetchFeedback = useServerFn(getFeedback);

  const { data } = useQuery({
    queryKey: ["feedback"],
    queryFn: () => fetchFeedback(),
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
              <Card>
                <Group direction="column" gap="0.5rem">
                  <IpAddress>IP: {ip}</IpAddress>
                  <p>{text}</p>
                </Group>
              </Card>
            </Group>
          ))}
        </Group>
      </Panel>
    </Page>
  );
}
