import { GithubIcon } from "@/components/icons";
import { Anchor } from "@/components/molecules/Anchor";
import { Loading } from "@/components/molecules/Loading";
import { Menu } from "@/components/molecules/Menu/Menu";
import { usePostContent, usePostsByCategory } from "@/hooks/use-posts.hook";
import { Article, Content, Header } from "@/styles/routes/blog.styled";
import type { IBlog } from "@/types/Post";
import { useSpring } from "@react-spring/web";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useHead, useSeoMeta } from "@unhead/react";
import "highlight.js/styles/monokai.css";
import { lazy, Suspense, useState } from "react";

const Markdown = lazy(() => import("@/components/atoms/Markdown"));

export const Route = createLazyFileRoute("/blog/$slug")({
  component: Slug,
});

function Slug() {
  const { slug } = Route.useParams();
  const {
    data: doc,
    isLoading,
    isError,
    error,
  } = usePostContent<IBlog>("blogs", slug);

  useHead({
    link: [
      { rel: "canonical", href: `https://www.michaelsavage.ie/blog/${slug}` },
    ],
  });

  useSeoMeta({
    ogType: "article",
    ogUrl: `https://www.michaelsavage.ie/blog/${slug}`,
    articleAuthor: ["Michael Savage"],
    articlePublishedTime: doc?.date,
    title: doc?.title,
    description: doc?.description,
  });
  const [open, setOpen] = useState(false);
  const posts = usePostsByCategory("blogs");

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

  const sidebar = posts
    .filter(({ isExternal }) => !isExternal)
    .filter(({ slug }) => slug !== doc.slug);

  return (
    <Article>
      <Suspense fallback={<Loading />}>
        <Menu<IBlog>
          target="blog"
          items={sidebar}
          open={open}
          setOpen={setOpen}
        />
        <p className="date">{doc.date}</p>
        <Content>
          <Header style={spring} aria-labelledby={`post-title-${slug}`}>
            {doc.title}
          </Header>
          <Markdown content={doc} />
          {doc.github && (
            <div>
              <Anchor
                text="GitHub Link"
                link={doc.github}
                icon={<GithubIcon />}
                isExternal
              />
            </div>
          )}
        </Content>
      </Suspense>
    </Article>
  );
}
