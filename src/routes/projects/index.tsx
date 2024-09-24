import { sortById } from "@/assets/utils";
import { Picture } from "@/components/Picture";
import styles from "@/styles/projects.module.scss";
import type { IPosts } from "@/types/Post";
import { Link, createFileRoute } from "@tanstack/react-router";
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
            <Link
              to={project.slug}
              className={`${styles.wrap} ${styles.projectImg}`}
            >
              <Picture
                src={
                  new URL(`../../assets/${project.image}`, import.meta.url).href
                }
                alt={project.title}
                loading="eager"
              />
              <p className={styles.view}>
                <span>{project.title}</span>
                <span>{project.description}</span>
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
