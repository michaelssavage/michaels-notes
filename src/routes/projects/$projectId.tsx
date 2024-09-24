import { joinTags } from "@/assets/utils";
import { Anchor } from "@/components/Anchor";
import { PagePath } from "@/components/PagePath";
import { Picture } from "@/components/Picture";
import { Markdown } from "@/components/atoms";
import styles from "@/styles/projects.module.scss";
import type { IPosts } from "@/types/Post";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Suspense } from "react";

export const Route = createFileRoute("/projects/$projectId")({
  component: Slug,
});

function Slug() {
  const { projectId } = Route.useParams();
  const { projects }: IPosts = import.meta.env.POSTS;
  const doc = projects.find((post) => post.slug === projectId);

  if (!doc) {
    return <div>Project post not found</div>;
  }

  const imageSrc = new URL(`../../assets/${doc.image}`, import.meta.url).href;

  return (
    <AnimatePresence mode="wait">
      <motion.article
        key={projectId}
        className={styles.article}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <p className="date">{doc.date}</p>
          <div className={styles.content}>
            <PagePath page="projects" />

            <motion.div
              layoutId={`project-image-${doc.id}`}
              className={styles.projectDetailImage}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <Picture src={imageSrc} alt={doc.title} loading="eager" />
            </motion.div>

            <Markdown content={doc} />
            <p className={styles.tags}>{joinTags(doc.technology)}</p>
            {doc.github && (
              <Anchor text="GitHub Link" link={doc.github} isExternal />
            )}
          </div>
        </Suspense>
      </motion.article>
    </AnimatePresence>
  );
}
