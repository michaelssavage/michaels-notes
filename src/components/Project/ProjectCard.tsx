import Image from "next/image";
import Link from "next/link";
import styles from "./ProjectCard.module.scss";

interface ProjectCardProps {
  image: string;
  title: string;
  description?: string;
  slug?: string;
}

export const ProjectCard = (props: ProjectCardProps) => {
  const { image, title, description, slug } = props;
  return (
    <div className={styles.group}>
      <Image src={image} alt={title} width={150} height={150} className={styles.img} />
      <div>
        <h2>{title}</h2>
        <p className={styles.aboutText}>{description}</p>

        <p className={styles.readMore}>
          <Link href={`/projects/${slug}`}>Read More</Link>
        </p>
      </div>
    </div>
  );
};
