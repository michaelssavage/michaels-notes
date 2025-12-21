import Markdown from "@/components/atoms/Markdown";
import { GithubIcon } from "@/components/icons";
import { Anchor } from "@/components/molecules/Anchor";
import { Loading } from "@/components/molecules/Loading";
import { Menu } from "@/components/molecules/Menu/Menu";
import { useClient } from "@/hooks/use-client.hook";
import { usePosts } from "@/hooks/use-posts.hook";
import { getFullPost } from "@/server/posts.api";
import { Article, Content, Header } from "@/styles/routes/blog.styled";
import type { IBlog } from "@/types/Post";
import { css } from "@emotion/react";
import { useSpring } from "@react-spring/web";
import { createFileRoute } from "@tanstack/react-router";
import "highlight.js/styles/monokai.css";
import { Suspense, useState } from "react";

const title = "Blog | Michael Savage";
const description = "Learnings, mishaps, and articles about random things.";
const url = "https://michaelsavage.com/blog";

export const Route = createFileRoute("/blog/$slug")({
  component: Slug,
  loader: async ({ params }) => {
    const post = await getFullPost({
      data: {
        category: "blogs",
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
  const isClient = useClient();
  const [open, setOpen] = useState(false);

  const { slug } = Route.useParams();
  const post = Route.useLoaderData();
  const posts = usePosts("blogs");

  const spring = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: { tension: 300, friction: 30 },
  });

  if (!isClient) return <Loading />;

  const sidebar = posts
    .filter(({ isExternal }) => !isExternal)
    .filter(({ slug }) => slug !== post.slug);

  return (
    <Article>
      <Suspense fallback={<Loading />}>
        <Menu<IBlog>
          target="blog"
          items={sidebar}
          open={open}
          setOpen={setOpen}
        />
        <p className="date">{post.date}</p>
        <Content>
          <Header style={spring} aria-labelledby={`post-title-${slug}`}>
            {post.title}
          </Header>
          <Markdown content={post} />
          {post.github && (
            <Anchor
              text="Project Link"
              link={post.github}
              icon={<GithubIcon />}
              variant="header"
              style={css`
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                width: fit-content;
              `}
              isExternal
            />
          )}
        </Content>
      </Suspense>
    </Article>
  );
}
