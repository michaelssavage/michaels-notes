import { deleteGift, getGift, updateGift } from "@/api/d1/gifts.api";
import { Anchor } from "@/components/molecules/Anchor";
import GiftForm, { defaultGift } from "@/components/molecules/Gift/GiftForm";
import { Loading } from "@/components/molecules/Loading";
import { useAppForm } from "@/context/FormProvider";
import { Header, Page, Panel } from "@/styles/routes/blog.styled";
import { PageSection } from "@/styles/routes/guide.styled";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "react-hot-toast";

export const Route = createFileRoute("/gifts_/$id")({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (!context.isAdmin) {
      throw redirect({ to: "/login" });
    }
  },
  // same query key as the component so useQuery reads from the cache
  loader: async ({ context, params }) => {
    await context.queryClient
      .ensureQueryData({
        queryKey: ["gift", params.id],
        queryFn: () => getGift({ data: { id: params.id } }),
      })
      .catch(() => undefined);
  },
});

function RouteComponent() {
  const { id } = Route.useParams();
  const fetchGift = useServerFn(getGift);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: gift, isLoading } = useQuery({
    queryKey: ["gift", id],
    queryFn: () => fetchGift({ data: { id } }),
  });

  const form = useAppForm({
    defaultValues: { ...defaultGift, ...gift },
    onSubmit: async ({ value }) => {
      const { id: _, ...updates } = value;
      try {
        await updateGift({ data: { id, updates } });
        toast.success("Gift updated");
        queryClient.invalidateQueries({ queryKey: ["gift", id] });
        await queryClient.invalidateQueries({ queryKey: ["gifts"] });
        navigate({ to: "/gifts" });
      } catch {
        toast.error("Failed to update gift");
      }
    },
  });

  const handleDelete = async () => {
    if (!window.confirm(`Delete "${gift?.name}"?`)) return;
    try {
      await deleteGift({ data: { id } });
      toast.success("Gift deleted");
      queryClient.removeQueries({ queryKey: ["gift", id] });
      await queryClient.invalidateQueries({ queryKey: ["gifts"] });
      navigate({ to: "/gifts" });
    } catch {
      toast.error("Failed to delete gift");
    }
  };

  if (isLoading) {
    return (
      <Page>
        <Panel>
          <Loading />
        </Panel>
      </Page>
    );
  }

  if (!gift) {
    return (
      <Page>
        <Panel>
          <div>Gift not found</div>
        </Panel>
      </Page>
    );
  }

  return (
    <Page>
      <Panel>
        <Header>Edit: {gift.name}</Header>
        <Anchor link="/gifts/new" text="Create New" variant="button" />

        <PageSection>
          <GiftForm form={form} isEditing onDelete={handleDelete} />
        </PageSection>
      </Panel>
    </Page>
  );
}
