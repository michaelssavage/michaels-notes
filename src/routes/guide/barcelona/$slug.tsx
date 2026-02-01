import { Anchor } from "@/components/molecules/Anchor";
import GuideForm from "@/components/molecules/Guide/GuideForm";
import { Loading } from "@/components/molecules/Loading";
import { useAppForm } from "@/context/FormProvider";
import { checkAuthFn } from "@/server/auth/check.api";
import { getGuideItem, updateGuideItem } from "@/server/mongo/get-guide.api";
import { Header, Page, Panel } from "@/styles/routes/blog.styled";
import { PageSection } from "@/styles/routes/guide.styled";
import { GuideTableItem } from "@/types/Guide";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "react-hot-toast";

export const Route = createFileRoute("/guide/barcelona/$slug")({
  component: RouteComponent,
  loader: async () => {
    try {
      await checkAuthFn();
    } catch {
      throw redirect({ to: "/login" });
    }
  },
});

const defaultValues: GuideTableItem = {
  title: "",
  id: "",
  description: "",
  link: "",
  location: "",
  coordinates: { lat: 0, lng: 0 },
  price: "",
  type: "place",
  image: "",
  tags: [],
};

function RouteComponent() {
  const { slug } = Route.useParams();
  const getItem = useServerFn(getGuideItem);
  const queryClient = useQueryClient();

  const { data: item, isLoading } = useQuery({
    queryKey: ["guide-item", slug],
    queryFn: () => getItem({ data: { name: "barcelona-guide", slug } }),
  });

  const form = useAppForm({
    defaultValues: {
      ...defaultValues,
      ...item,
    },
    onSubmit: async ({ value }) => {
      const result = await updateGuideItem({
        data: { name: "barcelona-guide", slug, updates: value },
      });

      if (result) {
        toast.success("Guide updated successfully");
        queryClient.invalidateQueries({ queryKey: ["guide-item", slug] });
      } else {
        toast.error("Failed to update guide");
      }
    },
  });

  if (isLoading) {
    return (
      <Page>
        <Panel>
          <Loading />
        </Panel>
      </Page>
    );
  }

  if (!item) {
    return (
      <Page>
        <Panel>
          <div>Item not found</div>
        </Panel>
      </Page>
    );
  }

  return (
    <Page>
      <Panel>
        <Header>Edit: {item?.title}</Header>
        <Anchor
          link="/guide/barcelona/new"
          text="Create New"
          variant="button"
        />

        <PageSection>
          <GuideForm form={form} />
        </PageSection>
      </Panel>
    </Page>
  );
}
