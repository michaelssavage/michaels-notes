import { Anchor } from "@/components/Anchor";
import { PagePath } from "@/components/PagePath";
import { Markdown } from "@/components/atoms";
import styles from "@/styles/blog.module.scss";
import type { IPosts } from "@/types/Post";
import { useTheme } from "@emotion/react";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
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
      <motion.article
        key={blogId}
        className={styles.article}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <p className="date">{doc.date}</p>
          <div className={styles.content}>
            <PagePath page="blog" color={colors.link} />

            <div className={styles.sidebar}>
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
            </div>

            <motion.h1
              className={styles.header}
              layoutId={`blog-title-${doc.id}`}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {doc.title}
            </motion.h1>
            <Markdown content={doc} />
            {doc.github && (
              <Anchor text="GitHub Link" link={doc.github} isExternal />
            )}
          </div>
        </Suspense>
      </motion.article>
    </AnimatePresence>
  );
}
