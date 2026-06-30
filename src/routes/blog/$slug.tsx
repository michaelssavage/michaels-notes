import { getViews, recordView } from "@/api/d1/views.api";
import { getFullPost } from "@/api/posts.api";
import { Group } from "@/components/atoms/Group";
import { Markdown } from "@/components/atoms/Markdown";
import { EyeIcon, GithubIcon } from "@/components/icons";
import { Anchor } from "@/components/molecules/Anchor";
import { buttonWithIconStyles } from "@/components/molecules/Button/Button.styled";
import { Loading } from "@/components/molecules/Loading";
import { Menu } from "@/components/molecules/Menu/Menu";
import { usePosts } from "@/hooks/use-posts.hook";
import { Article, Content, Header } from "@/styles/routes/blog.styled";
import type { IBlog } from "@/types/Post";
import { ClientOnly, createFileRoute } from "@tanstack/react-router";
import "highlight.js/styles/monokai.css";
import { Suspense, useEffect, useState } from "react";

const title = "Blog | Michael Savage";
const description = "Learnings, mishaps, and articles about random things.";
const url = "https://michaelsavage.com/blog";

export const Route = createFileRoute("/blog/$slug")({
  component: Slug,
  loader: async ({ params }) => {
    const [post, { count }] = await Promise.all([
      getFullPost({
        data: {
          category: "blogs",
          slug: params.slug,
        },
      }),
      getViews({
        data: {
          slug: params.slug,
          category: "blogs",
        },
      }),
    ]);

    return { post: post as IBlog, views: count };
  },
  head: ({ loaderData: d }) => ({
    link: [{ rel: "canonical", href: `${url}/${d?.post?.slug}` }],
    meta: [
      { title: d?.post?.title || title },
      { property: "og:title", content: d?.post?.title || title },
      { property: "og:url", content: `${url}/${d?.post?.slug}` },
      { name: "description", content: d?.post?.description || description },
      {
        property: "og:description",
        content: d?.post?.description || description,
      },
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
  const posts = usePosts("blogs");

  const sidebar = posts
    .filter(({ isExternal }) => !isExternal)
    .filter(({ slug }) => slug !== post.slug);

  useEffect(() => {
    recordView({ data: { slug, category: "blogs" } });
  }, [slug]);

  return (
    <Article>
      <Suspense fallback={<Loading />}>
        <Menu<IBlog>
          target="blog"
          items={sidebar}
          open={open}
          setOpen={setOpen}
        />

        <Group justify="space-between" align="center">
          <p className="date">
            {post.date}{" "}
            {post.lastUpdated ? `(Updated ${post.lastUpdated})` : ""}
          </p>

          <p className="views">
            <EyeIcon /> {views} {views === 1 ? "view" : "views"}
          </p>
        </Group>

        <Content>
          {post.header !== false && (
            <Header aria-labelledby={`post-title-${slug}`}>{post.title}</Header>
          )}
          <ClientOnly>
            <Markdown content={post} />
          </ClientOnly>
          {post.github && (
            <Anchor
              text="Project Link"
              link={post.github}
              icon={<GithubIcon />}
              variant="header"
              style={buttonWithIconStyles}
              isExternal
            />
          )}
        </Content>
      </Suspense>
    </Article>
  );
}
