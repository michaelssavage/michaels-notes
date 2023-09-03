import Link from "next/link";
import styles from "styles/blog.module.scss";
import { BlogPost } from "types/post";

interface PreviewProps {
  post: BlogPost;
}

const Post = ({ external, title, tags, date, description }: BlogPost) => (
  <>
    <h3 className={styles.blogTitle}>{title}</h3>
    <span className={`${external ? styles.reviewTag : styles.blogTag}`}>{tags.toString()}</span>
    <p className={styles.blogDate}>Posted on {date}</p>
    <p className={styles.blogText}>{description}</p>
  </>
);

export const PostPreview = ({ post }: PreviewProps) => {
  if (post.external) {
    return (
      <div className={styles.blogPost}>
        <a href={post.external} target="_blank" rel="noopener noreferrer">
          <Post {...post} />
        </a>
      </div>
    );
  }
  return (
    <div className={styles.blogPost}>
      <Link href={`blog/${post.slug}`}>
        <Post {...post} />
      </Link>
    </div>
  );
};
