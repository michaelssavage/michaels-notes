import { sortById } from "@/assets/utils";
import { Picture } from "@/components/Picture";
import { Container, MotionCol, Row } from "@/styles/abstracts/layout.styled";
import { View, Wrap } from "@/styles/routes/projects.styled";
import type { IPosts } from "@/types/Post";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/projects/")({
  component: Projects,
});

const { projects }: IPosts = import.meta.env.POSTS;

function Projects() {
  return (
    <Container>
      <Row>
        {projects.sort(sortById).map((project) => (
          <MotionCol
            size="md"
            key={project.id}
            layoutId={`project-image-${project.id}`}
          >
            <Wrap to={project.slug}>
              <Picture
                src={
                  new URL(`../../assets/${project.image}`, import.meta.url).href
                }
                alt={project.title}
                loading="eager"
              />
              <View>
                <span>{project.title}</span>
                <span>{project.description}</span>
              </View>
            </Wrap>
          </MotionCol>
        ))}
      </Row>
    </Container>
  );
}
