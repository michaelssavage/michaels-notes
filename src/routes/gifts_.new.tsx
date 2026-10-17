import { createGift } from "@/api/d1/gifts.api";
import GiftForm, { defaultGift } from "@/components/molecules/Gift/GiftForm";
import { useAppForm } from "@/context/FormProvider";
import { Header, Page, Panel } from "@/styles/routes/blog.styled";
import { PageSection } from "@/styles/routes/guide.styled";
import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";

export const Route = createFileRoute("/gifts_/new")({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (!context.isAdmin) {
      throw redirect({ to: "/login" });
    }
  },
});

function RouteComponent() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const form = useAppForm({
    defaultValues: defaultGift,
    onSubmit: async ({ value }) => {
      try {
        await createGift({ data: value });
        toast.success("Gift created");
        await queryClient.invalidateQueries({ queryKey: ["gifts"] });
        navigate({ to: "/gifts" });
      } catch {
        toast.error("Failed to create gift");
      }
    },
  });

  return (
    <Page>
      <Panel>
        <Header>New Gift</Header>
        <PageSection>
          <GiftForm form={form} />
        </PageSection>
      </Panel>
    </Page>
  );
}
