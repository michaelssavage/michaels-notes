import { Group } from "@/components/atoms/Group/Group";
import { Card } from "@/components/molecules/Feedback/Feedback.styled";
import { formatDate } from "@/lib/utils";
import { getFeedback } from "@/server/feedback.api";
import { Page, Panel } from "@/styles/routes/blog.styled";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { checkAuthFn } from "../server/auth/check.api";

export const Route = createFileRoute("/admin")({
  beforeLoad: async () => {
    try {
      await checkAuthFn();
    } catch {
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
        <h1>Feedback</h1>
        {data?.map(({ createdAt, text, ip }) => (
          <Card key={createdAt}>
            <Group direction="row" align="center" gap="0.5rem">
              <p>
                {formatDate({
                  value: createdAt,
                  dateStyle: "medium",
                  timeStyle: "medium",
                })}
              </p>
              <p>{ip}</p>
            </Group>

            <p>{text}</p>
          </Card>
        ))}
      </Panel>
    </Page>
  );
}
