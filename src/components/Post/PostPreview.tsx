import { BlogPost } from "types/blog-post";
import styles from "styles/blog.module.scss";
import Link from "next/link";

interface PreviewProps {
  post: BlogPost;
}

export const PostPreview = ({ post }: PreviewProps) => {
  const Post = () => (
    <>
      <h3 className={styles.blogTitle}>{post.title}</h3>
      <span className={styles.reviewTag}>{post.tags.toString()}</span>
      <p className={styles.blogDate}>Posted on {post.date}</p>
      <p className={styles.blogText}>{post.description}</p>
    </>
  );

  if (post.external) {
    return (
      <div className={styles.blogPost}>
        <a href={post.external} target="_blank" rel="noopener noreferrer">
          <Post />
        </a>
      </div>
    );
  }
  return (
    <div className={styles.blogPost}>
      <Link href={`blog/${post.slug}`}>
        <Post />
      </Link>
    </div>
  );
};
