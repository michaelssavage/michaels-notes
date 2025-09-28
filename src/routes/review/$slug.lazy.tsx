import { Anchor } from "@/components/molecules/Anchor";
import { Loading } from "@/components/molecules/Loading";
import { Menu } from "@/components/molecules/Menu/Menu";
import { usePostContent, usePostsByCategory } from "@/hooks/use-posts.hook";
import {
  Article,
  Content,
  Header,
  MovieInfo,
} from "@/styles/routes/blog.styled";
import type { IReview } from "@/types/Post";
import { css } from "@emotion/react";
import { useSpring } from "@react-spring/web";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useHead, useSeoMeta } from "@unhead/react";
import "highlight.js/styles/monokai.css";
import { lazy, Suspense, useState } from "react";

const Markdown = lazy(() => import("@/components/atoms/Markdown"));

export const Route = createLazyFileRoute("/review/$slug")({
  component: Slug,
});

function Slug() {
  const { slug } = Route.useParams();

  const {
    data: doc,
    isLoading,
    isError,
    error,
  } = usePostContent<IReview>("reviews", slug);

  useHead({
    link: [
      { rel: "canonical", href: `https://www.michaelsavage.ie/review/${slug}` },
    ],
  });

  useSeoMeta({
    ogType: "article",
    ogUrl: `https://www.michaelsavage.ie/review/${slug}`,
    articleAuthor: ["Michael Savage"],
    articlePublishedTime: doc?.date,
    title: doc?.title,
    description: doc?.description,
  });

  const [open, setOpen] = useState(false);
  const posts = usePostsByCategory("reviews");

  const spring = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: { tension: 300, friction: 30 },
  });

  if (!doc || isLoading)
    return (
      <Article height="90vh">
        <Loading />
      </Article>
    );
  if (isError) {
    return (
      <Article height="90vh">
        Error loading blog: {error?.message || "Unknown error"}
      </Article>
    );
  }

  const sidebar = posts.filter(({ slug }) => slug !== doc.slug);

  return (
    <Article>
      <Suspense fallback={<Loading />}>
        <Menu<IReview>
          target="review"
          items={sidebar}
          open={open}
          setOpen={setOpen}
        />
        <p className="date">{doc.date}</p>
        <Content>
          <Header style={spring}>{doc.title}</Header>
          <MovieInfo>
            Directed by {doc.director} ({doc.releaseYear})
          </MovieInfo>
          <section>
            <Markdown content={doc} />
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
