import { joinTags } from "@/assets/utils";
import { Button } from "@/components/Button";
import { Markdown } from "@/components/Markdown";
import { PagePath } from "@/components/PagePath";
import styles from "@/styles/projects.module.scss";
import type { IPosts } from "@/types/Post";
import { createFileRoute } from "@tanstack/react-router";
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

  const handleClick = () => {
    if (doc.github) {
      window.open(doc.github, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <article key={postId} className={styles.container}>
      <Suspense fallback={<div>Loading...</div>}>
        <p className="date">{doc.date}</p>
        <div className={styles.content}>
          <PagePath page="projects" style={styles.paths} />
          <Markdown content={doc.code} />
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
    </article>
  );
}
