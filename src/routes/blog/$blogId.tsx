import { Anchor } from "@/components/Anchor";
import { Markdown } from "@/components/Markdown";
import { PagePath } from "@/components/PagePath";
import styles from "@/styles/blog.module.scss";
import type { IPosts } from "@/types/Post";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Suspense } from "react";

export const Route = createFileRoute("/blog/$blogId")({
  component: Slug,
});

function Slug() {
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
            <PagePath page="blog" style={styles.paths} />

            <motion.h1
              className={styles.header}
              layoutId={`blog-title-${doc.id}`}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {doc.title}
            </motion.h1>
            <Markdown content={doc} />
            {doc.github && (
              <Anchor text="GitHub Link" link={doc.github} external />
            )}
          </div>
        </Suspense>
      </motion.article>
    </AnimatePresence>
  );
}
