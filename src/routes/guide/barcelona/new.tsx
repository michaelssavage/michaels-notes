import GuideForm from "@/components/molecules/Guide/GuideForm";
import { useAppForm } from "@/context/FormProvider";
import { checkAuthFn } from "@/server/auth/check.api";
import { createGuideItem } from "@/server/mongo/get-guide.api";
import { Header, Page, Panel } from "@/styles/routes/blog.styled";
import { PageSection } from "@/styles/routes/guide.styled";
import { GuideTableItem } from "@/types/Guide";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";

export const Route = createFileRoute("/guide/barcelona/new")({
  component: RouteComponent,
  loader: async () => {
    const { authenticated } = await checkAuthFn();
    if (!authenticated) {
      throw redirect({ to: "/login" });
    }
  },
});

const defaultValues: GuideTableItem = {
  id: "",
  title: "",
  location: "",
  link: "",
  price: "",
  image: "",
  description: "",
  tags: [],
  type: "place",
  coordinates: { lat: 0, lng: 0 },
};

function RouteComponent() {
  const navigate = useNavigate();

  const form = useAppForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      const result = await createGuideItem({
        data: { name: "barcelona-guide", item: value },
      });

      if (result) {
        toast.success("Guide created successfully");
        navigate({ to: `/guide/barcelona/${value.id}` });
      } else {
        toast.error("Failed to create guide");
      }
    },
  });

  return (
    <Page>
      <Panel>
        <Header>New Guide</Header>
        <PageSection>
          <GuideForm form={form} />
        </PageSection>
      </Panel>
    </Page>
  );
}
