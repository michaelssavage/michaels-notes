import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import Link from "next/link";
import fs from "fs";
import { H1, H2, NextImage, P } from "components/MDX";
import { Layout } from "components/Layout";
import styles from "styles/blog.module.scss";

export default function ProjectsSlug({ source }: InferGetStaticPropsType<typeof getStaticProps>) {
  if (source == null) {
    return (
      <Layout title="Michael's Projects">
        <h1>This page does not exist</h1>
        <Link href="/projects">
          <button className={styles.buttonLink} role="button">
            Projects Page
          </button>
        </Link>
      </Layout>
    );
  }

  const { frontmatter } = source;

  return (
    <Layout title={frontmatter.title as string}>
      <div className={styles.mainImg}>
        <NextImage src={frontmatter.image as string} alt={frontmatter.title as string} />
      </div>
      <p className={styles.slugDate}>{frontmatter.date as string}</p>
      <MDXRemote
        {...source}
        // specifying the custom MDX components
        components={{
          h1: H1,
          h2: H2,
          p: P,
          NextImage,
        }}
      />
    </Layout>
  );
}
// eslint-disable-next-line require-await
export async function getStaticPaths() {
  return { paths: [], fallback: "blocking" };
}

export async function getStaticProps(
  ctx: GetStaticPropsContext<{
    slug: string;
  }>
) {
  const { slug } = ctx.params!;
  const postFile = fs.readFileSync(`src/_posts/projects/${slug}.mdx`);

  const mdxSource = await serialize(postFile, { parseFrontmatter: true });

  if (!mdxSource.frontmatter.live || mdxSource.frontmatter.external) {
    return {
      props: {
        source: null,
      },
    };
  }
  return {
    props: {
      source: mdxSource,
    },
    revalidate: 60,
  };
}
