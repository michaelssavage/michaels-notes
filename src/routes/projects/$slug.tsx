import { Anchor } from "@/components/Anchor";
import { PagePath } from "@/components/PagePath";
import { Markdown } from "@/components/atoms";
import { Group } from "@/components/atoms/Group";
import { joinTags } from "@/lib/utils";
import { Article, Content, Tags, Title } from "@/styles/routes/projects.styled";
import type { IPosts } from "@/types/Post";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence } from "framer-motion";
import { Suspense } from "react";

export const Route = createFileRoute("/projects/$slug")({
  component: Slug,
});

function Slug() {
  const { slug } = Route.useParams();
  const { projects }: IPosts = import.meta.env.POSTS;
  const doc = projects.find((post) => post.slug === slug);

  if (!doc) {
    return <div>Project post not found</div>;
  }

  return (
    <AnimatePresence mode="wait">
      <Article
        key={slug}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <p className="date">{doc.date}</p>
          <Content>
            <PagePath page="projects" />

            <Title
              layoutId={`project-title-${doc.id}`}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              main={doc.colors.main}
              bg={doc.colors.bg}
            >
              {doc.title}
            </Title>

            <Markdown content={doc} />
            <Tags>{joinTags(doc.technology)}</Tags>
            <Group justify="flex-end">
              {doc.github && (
                <Anchor text="GitHub Link" link={doc.github} isExternal />
              )}
            </Group>
          </Content>
        </Suspense>
      </Article>
    </AnimatePresence>
  );
}
