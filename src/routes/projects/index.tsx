import { Link, createFileRoute } from "@tanstack/react-router";
import { sortById } from "@/assets/utils";
import { ProjectContent } from "@/types/Post";
import styles from "@/styles/projects.module.scss";
import { Picture } from "@/components/Picture";

export const Route = createFileRoute("/projects/")({
  component: Projects,
});
const projects: ProjectContent[] = import.meta.env.BLOG_POSTS;

function Projects() {
  return (
    <main className="container">
      <div className="row">
        {projects.sort(sortById).map((project) => (
          <div className="col" key={project.id}>
            <Link to={project.slug} className={styles.projectImg}>
              <div className={styles.wrap}>
                <Picture src={project.image} alt={project.title} />
                <p className={styles.view}>View More</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
