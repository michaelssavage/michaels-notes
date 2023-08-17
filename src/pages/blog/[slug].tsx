import fs from "fs";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import { H1, H2, P, NextImage } from "components/MDX";
import { Layout } from "components/Layout";
import Link from "next/link";
import styles from "styles/blog.module.scss";

export default function PostPage({ source }: InferGetStaticPropsType<typeof getStaticProps>) {
  if (source == null) {
    return (
      <Layout title="Michael's Blog">
        <h1>This page does not exist</h1>
        <Link href="/blog">
          <button className={styles.buttonLink} role="button">
            Blog Page
          </button>
        </Link>
      </Layout>
    );
  }

  return (
    <Layout title={source.frontmatter.title as string}>
      <p>{source.frontmatter.date as string}</p>
      <h1>{source.frontmatter.title as string}</h1>
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
export async function getStaticPaths() {
  return { paths: [], fallback: "blocking" };
}

export async function getStaticProps(
  ctx: GetStaticPropsContext<{
    slug: string;
  }>
) {
  const { slug } = ctx.params!;
  const postFile = fs.readFileSync(`src/_posts/${slug}.mdx`);

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
