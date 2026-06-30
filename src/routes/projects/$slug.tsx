import { getViews, recordView } from "@/api/d1/views.api";
import { getFullPost } from "@/api/posts.api";
import { Group } from "@/components/atoms/Group";
import { Markdown } from "@/components/atoms/Markdown";
import { EyeIcon, GithubIcon } from "@/components/icons";
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
import { Suspense, useEffect, useState } from "react";
import type { IProject } from "../../types/Post";

const title = "Projects | Michael Savage";
const description =
  "My personal development, work, code challenges, and university projects";
const url = "https://michaelsavage.com/projects";

export const Route = createFileRoute("/projects/$slug")({
  component: Slug,
  loader: async ({ params }) => {
    const [post, { count }] = await Promise.all([
      getFullPost({ data: { category: "projects", slug: params.slug } }),
      getViews({ data: { slug: params.slug, category: "projects" } }),
    ]);
    return { post: post as IProject, views: count };
  },
  head: ({ loaderData: d }) => ({
    link: [{ rel: "canonical", href: `${url}/${d?.post?.slug}` }],
    meta: [
      { title: d?.post?.title || title },
      { property: "og:title", content: d?.post?.title || title },
      { property: "og:url", content: `${url}/${d?.post?.slug}` },
      { name: "description", content: d?.post?.description || description },
      { property: "og:description", content: d?.post?.description || description },
      { property: "og:type", content: "article" },
      { property: "article:published_time", content: d?.post?.date || "" },
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

  const { slug } = Route.useParams();
  const { post, views } = Route.useLoaderData();
  const posts = usePosts("projects");

  useEffect(() => {
    recordView({ data: { slug, category: "projects" } });
  }, [slug]);

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
          <Group justify="space-between" align="center">
            <p className="date">{post.date}</p>
            <p className="views">
              <EyeIcon /> {views} {views === 1 ? "view" : "views"}
            </p>
          </Group>
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
