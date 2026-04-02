import { getFullPost } from "@/api/posts.api";
import { Group } from "@/components/atoms/Group";
import { Markdown } from "@/components/atoms/Markdown";
import { GithubIcon } from "@/components/icons";
import { Anchor } from "@/components/molecules/Anchor";
import { applyButtonColors } from "@/components/molecules/Button/Button.styled";
import { Loading } from "@/components/molecules/Loading";
import { Menu } from "@/components/molecules/Menu/Menu";
import { usePosts } from "@/hooks/use-posts.hook";
import { joinTags } from "@/lib/utils";
import { Article } from "@/styles/routes/blog.styled";
import { Content, Tags, Title } from "@/styles/routes/projects.styled";
import { ClientOnly, createFileRoute } from "@tanstack/react-router";
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
    return post as IProject;
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
  const [open, setOpen] = useState(false);

  const post = Route.useLoaderData();
  const posts = usePosts("projects");

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
          <p className="date">{post.date}</p>
          <Title>{post.title}</Title>
          {post.description}

          <Group justify="flex-start">
            {post.live && (
              <Anchor
                text="Live Link"
                variant="button"
                style={applyButtonColors({
                  color: post.colors.main,
                })}
                link={post.live}
                isExternal
              />
            )}

            {post.github && (
              <Anchor
                text="Github Link"
                variant="outline"
                style={applyButtonColors({
                  backgroundColor: post.colors.bg,
                })}
                link={post.github}
                icon={<GithubIcon />}
                isExternal
              />
            )}
          </Group>
          <Tags>{joinTags(post.technology)}</Tags>

          <div
            style={{
              backgroundColor: post.colors.bg,
              height: "4px",
              width: "100%",
              marginBottom: "-1rem",
            }}
          />

          <div
            style={{
              backgroundColor: post.colors.main,
              height: "4px",
              width: "100%",
            }}
          />

          <ClientOnly>
            <Markdown content={post} />
          </ClientOnly>
        </Content>
      </Suspense>
    </Article>
  );
}
