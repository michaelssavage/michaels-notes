import { getFullPost } from "@/api/posts.api";
import { Group } from "@/components/atoms/Group";
import Markdown from "@/components/atoms/Markdown";
import { Anchor } from "@/components/molecules/Anchor";
import { Loading } from "@/components/molecules/Loading";
import { Menu } from "@/components/molecules/Menu/Menu";
import { usePosts } from "@/hooks/use-posts.hook";
import { joinTags } from "@/lib/utils";
import { Article } from "@/styles/routes/blog.styled";
import { Content, Tags, Title } from "@/styles/routes/projects.styled";
import { createFileRoute, useHydrated } from "@tanstack/react-router";
import "highlight.js/styles/monokai.css";
import { Suspense, useState } from "react";
import type { IProject } from "../../types/Post";

const title = "Projects | Michael Savage";
const description =
  "My personal development, work, code challenges, and university projects";
const url = "https://michaelsavage.com/projects";

export const Route = createFileRoute("/projects/$slug")({
  component: Slug,
  loader: async ({ params }) => {
    const post = await getFullPost({
      data: {
        category: "projects",
        slug: params.slug,
      },
    });
    return post;
  },
  head: ({ loaderData: d }) => ({
    link: [{ rel: "canonical", href: `${url}/${d?.slug}` }],
    meta: [
      { title: d?.title || title },
      { property: "og:title", content: d?.title || title },
      { property: "og:url", content: `${url}/${d?.slug}` },
      { name: "description", content: d?.description || description },
      { property: "og:description", content: d?.description || description },
      { property: "og:type", content: "article" },
      { property: "article:published_time", content: d?.date || "" },
      { property: "article:author", content: "Michael Savage" },
    ],
  }),
  pendingComponent: () => (
    <Article height="90vh">
      <Loading />
    </Article>
  ),
});

function Slug() {
  const hydrated = useHydrated();
  const [open, setOpen] = useState(false);

  const post = Route.useLoaderData();
  const posts = usePosts("projects");

  if (!hydrated) return <Loading />;

  return (
    <Article>
      <Suspense fallback={<Loading />}>
        <Menu<IProject>
          target="projects"
          items={posts.filter(({ id }) => id !== post.id)}
          open={open}
          setOpen={setOpen}
        />
        <Content>
          <Title>{post.title}</Title>
          <p className="date">{post.date}</p>

          <Markdown content={post} />
          <Tags>{joinTags(post.technology)}</Tags>
          <Group justify="flex-end">
            {post.github && (
              <Anchor
                text="Project Link"
                variant="header"
                link={post.github}
                isExternal
              />
            )}
          </Group>
        </Content>
      </Suspense>
    </Article>
  );
}
