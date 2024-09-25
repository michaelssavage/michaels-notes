import { Anchor } from "@/components/Anchor";
import { PagePath } from "@/components/PagePath";
import { Markdown } from "@/components/atoms";
import { Article, Content, Header, Sidebar } from "@/styles/routes/blog.styled";
import type { IPosts } from "@/types/Post";
import { useTheme } from "@emotion/react";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence } from "framer-motion";
import { Suspense } from "react";

export const Route = createFileRoute("/blog/$blogId")({
  component: Slug,
});

function Slug() {
  const { colors } = useTheme();
  const { blogId } = Route.useParams();
  const { blog }: IPosts = import.meta.env.POSTS;
  const doc = blog.find((post) => post.slug === blogId);

  if (!doc) {
    return <div>Blog post not found</div>;
  }

  return (
    <AnimatePresence mode="wait">
      <Article
        key={1}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <p className="date">{doc.date}</p>
          <Content>
            <PagePath page="blog" color={colors.link} />

            <Sidebar>
              {blog
                .filter((item) => !item.isExternal)
                .filter((current) => current.id !== doc.id)
                .map(({ title, id, slug }) => {
                  return (
                    <Anchor
                      key={id}
                      text={title}
                      link={`../${slug}`}
                      variant="link"
                    />
                  );
                })}
            </Sidebar>

            <Header
              layoutId={`blog-title-${doc.id}`}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {doc.title}
            </Header>
            <Markdown content={doc} />
            {doc.github && (
              <Anchor text="GitHub Link" link={doc.github} isExternal />
            )}
          </Content>
        </Suspense>
      </Article>
    </AnimatePresence>
  );
}
