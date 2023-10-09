import { serialize } from "next-mdx-remote/serialize";
import { InferGetStaticPropsType } from "next";
import fs from "fs";
import path from "path";
import { Layout } from "components/Layout";
import styles from "styles/page.module.scss";
import { Contacts } from "components/Contacts";
import { filterPosts } from "utils/filterPosts";
import { ProjectPost } from "types/post";
import { ProjectCard } from "components/Project";

export default function Projects({ postPreviews }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout title="Projects">
      <section className={styles.main}>
        <h1>Projects</h1>
        <p className={styles.opener}>Development projects during college and my career.</p>
        <Contacts />

        {postPreviews.map((post) => (
          <ProjectCard key={post.title} {...post} />
        ))}
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  // get all MDX files
  const postFilePaths = fs.readdirSync("src/_posts/projects").filter((postFilePath) => {
    return path.extname(postFilePath).toLowerCase() === ".mdx";
  });

  const postPreviews: ProjectPost[] = [];

  for (const postFilePath of postFilePaths) {
    const postFile = fs.readFileSync(`src/_posts/projects/${postFilePath}`, "utf8");

    const serializedPost = await serialize(postFile, {
      parseFrontmatter: true,
    });

    postPreviews.push({
      ...serializedPost.frontmatter,
      slug: serializedPost.frontmatter.external ?? postFilePath.replace(".mdx", ""),
    } as ProjectPost);
  }

  return {
    props: {
      postPreviews: filterPosts(postPreviews),
    },
    // enable ISR
    revalidate: 60,
  };
}
