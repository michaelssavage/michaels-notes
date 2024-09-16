import { joinTags } from "@/assets/utils";
import { Button } from "@/components/Button";
import { Markdown } from "@/components/Markdown";
import { PagePath } from "@/components/PagePath";
import { Picture } from "@/components/Picture";
import styles from "@/styles/projects.module.scss";
import type { IPosts } from "@/types/Post";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Suspense } from "react";

export const Route = createFileRoute("/projects/$postId")({
  component: Slug,
});

function Slug() {
  const { postId } = Route.useParams();
  const { projects }: IPosts = import.meta.env.POSTS;
  const doc = projects.find((post) => post.slug === postId);

  if (!doc) {
    return <div>Blog post not found</div>;
  }

  const imageSrc = new URL(`../../assets/${doc.image}`, import.meta.url).href;

  const handleClick = () => {
    if (doc.github) {
      window.open(doc.github, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.article
        key={postId}
        className={styles.container}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <p className="date">{doc.date}</p>
          <div className={styles.content}>
            <PagePath page="projects" style={styles.paths} />

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
              <Button
                text="GitHub Link"
                variant="primary"
                onClick={handleClick}
              />
            )}
          </div>
        </Suspense>
      </motion.article>
    </AnimatePresence>
  );
}
