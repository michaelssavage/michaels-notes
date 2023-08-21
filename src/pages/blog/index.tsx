import { serialize } from "next-mdx-remote/serialize";
import { InferGetStaticPropsType } from "next";
import fs from "fs";
import path from "path";
import { Contacts } from "components/Contacts";
import { Layout } from "components/Layout";
import styles from "styles/page.module.scss";
import { BlogPost } from "types/blog-post";
import { PostPreview } from "components/Post";
import { filterPosts } from "utils/filterPosts";

export default function Blog({ postPreviews }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout title="Michael Savage Blog">
      <section className={styles.main}>
        <h1>Blog</h1>
        <p className={styles.opener}>A collection of random thoughts, ideas, and stories.</p>
        <Contacts />

        {postPreviews.map((post) => (
          <PostPreview key={post.title} post={post} />
        ))}
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  // get all MDX files
  const postFilePaths = fs.readdirSync("src/_posts/blog").filter((postFilePath) => {
    return path.extname(postFilePath).toLowerCase() === ".mdx";
  });

  const postPreviews: BlogPost[] = [];

  for (const postFilePath of postFilePaths) {
    const postFile = fs.readFileSync(`src/_posts/blog/${postFilePath}`, "utf8");

    const serializedPost = await serialize(postFile, {
      parseFrontmatter: true,
    });

    postPreviews.push({
      ...serializedPost.frontmatter,
      slug: serializedPost.frontmatter.external ?? postFilePath.replace(".mdx", ""),
    } as BlogPost);
  }

  return {
    props: {
      postPreviews: filterPosts(postPreviews),
    },
    // enable ISR
    revalidate: 60,
  };
}
