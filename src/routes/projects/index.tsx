import { sortById } from "@/assets/utils";
import { Picture } from "@/components/Picture";
import { View, Wrap } from "@/styles/routes/projects.styled";
import type { IPosts } from "@/types/Post";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

export const Route = createFileRoute("/projects/")({
  component: Projects,
});

const { projects }: IPosts = import.meta.env.POSTS;

function Projects() {
  return (
    <section className="container">
      <div className="row">
        {projects.sort(sortById).map((project) => (
          <motion.div
            key={project.id}
            className="col-md"
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
          </motion.div>
        ))}
      </div>
    </section>
  );
}
