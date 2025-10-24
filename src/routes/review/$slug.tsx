import Markdown from "@/components/atoms/Markdown";
import { Anchor } from "@/components/molecules/Anchor";
import { Loading } from "@/components/molecules/Loading";
import { Menu } from "@/components/molecules/Menu/Menu";
import { usePosts } from "@/hooks/posts.hook";
import { getFullPost } from "@/server/posts";
import {
  Article,
  Content,
  Header,
  MovieInfo,
} from "@/styles/routes/blog.styled";
import type { IReview } from "@/types/Post";
import { css } from "@emotion/react";
import { useSpring } from "@react-spring/web";
import { createFileRoute } from "@tanstack/react-router";
import "highlight.js/styles/monokai.css";
import { Suspense, useState } from "react";

const title = "Review | Michael Savage";
const description =
  "Movie reviews, critiques, and general ramblings of new media I watch.";
const url = "https://michaelsavage.com/review";

export const Route = createFileRoute("/review/$slug")({
  component: Slug,
  loader: async ({ params }) => {
    const post = await getFullPost({
      data: {
        category: "reviews",
        slug: params.slug,
      },
    });

    return post;
  },
  head: ({ loaderData: d }) => ({
    title: d?.title || title,
    link: [{ rel: "canonical", href: `${url}/${d?.slug}` }],
    meta: [
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
  const posts = usePosts("reviews");

  const spring = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: { tension: 300, friction: 30 },
  });

  const sidebar = posts.filter(({ slug }) => slug !== post.slug);

  return (
    <Article>
      <Suspense fallback={<Loading />}>
        <Menu<IReview>
          target="review"
          items={sidebar}
          open={open}
          setOpen={setOpen}
        />
        <p className="date">{post.date}</p>
        <Content>
          <Header style={spring}>{post.title}</Header>
          <MovieInfo>
            Directed by {post.director} ({post.releaseYear})
          </MovieInfo>
          <section>
            <Markdown content={post} />
          </section>
          <Anchor
            text="Letterboxd Link"
            link="https://letterboxd.com/ottobio"
            style={css`
              width: fit-content;
            `}
            isExternal
          />
        </Content>
      </Suspense>
    </Article>
  );
}
