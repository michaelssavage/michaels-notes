import { createFileRoute } from "@tanstack/react-router";
import { PagePath } from "@/components/PagePath";
import { Button } from "@/components/Button";
import { ProjectContent } from "@/types/Post";
import { joinTags } from "@/assets/utils";
import styles from "@/styles/projects.module.scss";
import { Suspense } from "react";
import { Markdown } from "@/components/Markdown";

export const Route = createFileRoute("/projects/$postId")({
  component: Slug,
});

function Slug() {
  const { postId } = Route.useParams();
  const doc: ProjectContent = import.meta.env.BLOG_POSTS.find(
    (post: ProjectContent) => post.slug === postId
  );

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
