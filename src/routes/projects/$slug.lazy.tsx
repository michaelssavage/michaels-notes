import { Group } from "@/components/atoms/Group";
import { Anchor } from "@/components/molecules/Anchor";
import { Loading } from "@/components/molecules/Loading";
import { Menu } from "@/components/molecules/Menu/Menu";
import { usePostContent, usePostsByCategory } from "@/hooks/use-posts.hook";
import { joinTags } from "@/lib/utils";
import { Article, Content, Tags, Title } from "@/styles/routes/projects.styled";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useHead, useSeoMeta } from "@unhead/react";
import "highlight.js/styles/monokai.css";
import { lazy, Suspense, useState } from "react";
import type { IProject } from "../../types/Post";

const Markdown = lazy(() => import("@/components/atoms/Markdown"));

export const Route = createLazyFileRoute("/projects/$slug")({
  component: Slug,
});

function Slug() {
  const { slug } = Route.useParams();

  const {
    data: doc,
    isLoading,
    isError,
    error,
  } = usePostContent<IProject>("projects", slug);

  useHead({
    link: [
      {
        rel: "canonical",
        href: `https://www.michaelsavage.ie/projects/${slug}`,
      },
    ],
  });

  useSeoMeta({
    ogType: "article",
    ogUrl: `https://www.michaelsavage.ie/projects/${slug}`,
    articleAuthor: ["Michael Savage"],
    articlePublishedTime: doc?.date,
    title: doc?.title,
    description: doc?.description,
  });

  const [open, setOpen] = useState(false);
  const posts = usePostsByCategory("projects");

  if (!doc || isLoading)
    return (
      <Article height="90vh">
        <Loading />
      </Article>
    );
  if (isError) {
    return (
      <Article height="90vh">
        Error loading project: {error?.message || "Unknown error"}
      </Article>
    );
  }

  return (
    <Article>
      <Suspense fallback={<Loading />}>
        <Menu<IProject>
          target="projects"
          items={posts.filter(({ id }) => id !== doc.id)}
          open={open}
          setOpen={setOpen}
        />
        <Content>
          <Title>{doc.title}</Title>
          <p className="date">{doc.date}</p>

          <Markdown content={doc} />
          <Tags>{joinTags(doc.technology)}</Tags>
          <Group justify="flex-end">
            {doc.github && (
              <Anchor text="GitHub Link" link={doc.github} isExternal />
            )}
          </Group>
        </Content>
      </Suspense>
    </Article>
  );
}
