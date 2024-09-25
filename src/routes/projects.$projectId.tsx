import { joinTags } from "@/assets/utils";
import { Anchor } from "@/components/Anchor";
import { PagePath } from "@/components/PagePath";
import { Picture } from "@/components/Picture";
import { Markdown } from "@/components/atoms";
import {
  Article,
  Content,
  ProjectImage,
  Tags,
} from "@/styles/routes/projects.styled";
import type { IPosts } from "@/types/Post";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence } from "framer-motion";
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
      <Article
        key={projectId}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <p className="date">{doc.date}</p>
          <Content>
            <PagePath page="projects" />

            <ProjectImage
              layoutId={`project-image-${doc.id}`}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <Picture src={imageSrc} alt={doc.title} loading="eager" />
            </ProjectImage>

            <Markdown content={doc} />
            <Tags>{joinTags(doc.technology)}</Tags>
            {doc.github && (
              <Anchor text="GitHub Link" link={doc.github} isExternal />
            )}
          </Content>
        </Suspense>
      </Article>
    </AnimatePresence>
  );
}
