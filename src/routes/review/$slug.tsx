import { getViews, recordView } from "@/api/d1/views.api";
import { getFullPost } from "@/api/posts.api";
import { Group } from "@/components/atoms/Group";
import { Markdown } from "@/components/atoms/Markdown";
import { EyeIcon } from "@/components/icons";
import { Anchor } from "@/components/molecules/Anchor";
import { Loading } from "@/components/molecules/Loading";
import { Menu } from "@/components/molecules/Menu/Menu";
import { usePosts } from "@/hooks/use-posts.hook";
import {
  Article,
  Content,
  Header,
  MovieInfo,
} from "@/styles/routes/blog.styled";
import type { IReview } from "@/types/Post";
import { css } from "@emotion/react";
import { ClientOnly, createFileRoute } from "@tanstack/react-router";
import "highlight.js/styles/monokai.css";
import { Suspense, useEffect, useState } from "react";

const title = "Review | Michael Savage";
const description =
  "Movie reviews, critiques, and general ramblings of new media I watch.";
const url = "https://michaelsavage.com/review";

export const Route = createFileRoute("/review/$slug")({
  component: Slug,
  loader: async ({ params }) => {
    const [post, { count }] = await Promise.all([
      getFullPost({ data: { category: "reviews", slug: params.slug } }),
      getViews({ data: { slug: params.slug, category: "reviews" } }),
    ]);
    return { post: post as IReview, views: count };
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
  const posts = usePosts("reviews");

  const sidebar = posts.filter((p) => p.slug !== post.slug);

  useEffect(() => {
    recordView({ data: { slug, category: "reviews" } });
  }, [slug]);

  return (
    <Article>
      <Suspense fallback={<Loading />}>
        <Menu<IReview>
          target="review"
          items={sidebar}
          open={open}
          setOpen={setOpen}
        />
        <Group justify="space-between" align="center">
          <p className="date">{post.date}</p>
          <p className="views">
            <EyeIcon /> {views} {views === 1 ? "view" : "views"}
          </p>
        </Group>
        <Content>
          <Header>{post.title}</Header>
          <MovieInfo>
            Directed by {post.director} ({post.releaseYear})
          </MovieInfo>
          <section>
            <ClientOnly>
              <Markdown content={post} />
            </ClientOnly>
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
