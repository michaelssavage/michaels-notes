import { getGuideItem, updateGuideItem } from "@/api/d1/city-guide.api";
import { Anchor } from "@/components/molecules/Anchor";
import GuideForm from "@/components/molecules/Guide/GuideForm";
import { Loading } from "@/components/molecules/Loading";
import { useAppForm } from "@/context/FormProvider";
import { Header, Page, Panel } from "@/styles/routes/blog.styled";
import { PageSection } from "@/styles/routes/guide.styled";
import { GuideTableItem } from "@/types/Guide";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "react-hot-toast";

const title = "Barcelona Guide | Michael Savage";
const description =
  "Barcelona guide with places to visit, activities, and entertainment options.";
const url = "https://michaelsavage.com/guide/barcelona";

export const Route = createFileRoute("/guide/barcelona/$slug")({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (!context.isAdmin) {
      throw redirect({ to: "/login" });
    }
  },
  // same query key as the component so useQuery reads from the cache
  loader: async ({ context, params }) => {
    const item = await context.queryClient
      .ensureQueryData({
        queryKey: ["guide-item", params.slug],
        queryFn: () =>
          getGuideItem({
            data: { name: "barcelona-guide", slug: params.slug },
          }),
      })
      .catch(() => undefined);
    return { item };
  },
  head: ({ loaderData: d, params }) => ({
    link: [{ rel: "canonical", href: `${url}/${params.slug}` }],
    meta: [
      { title: d?.item?.title || title },
      { property: "og:title", content: d?.item?.title || title },
      { property: "og:url", content: `${url}/${params.slug}` },
      { name: "description", content: d?.item?.description || description },
      {
        property: "og:description",
        content: d?.item?.description || description,
      },
      {
        property: "og:image",
        content: d?.item?.image || "/media/portrait.png",
      },
    ],
  }),
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
  const navigate = useNavigate();

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
        await queryClient.invalidateQueries({ queryKey: ["guide"] });
        navigate({ to: "/guide/barcelona" });
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

  if (!item && !isLoading) {
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
