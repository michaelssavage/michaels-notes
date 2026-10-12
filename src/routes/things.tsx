import { Player } from "@/components/atoms/Player";
import { Anchor } from "@/components/molecules/Anchor";
import { forPhoneOnly } from "@/styles/abstracts/mixins.styled";
import { Heading, Page } from "@/styles/routes/blog.styled";
import { MiscContainer, PostList } from "@/styles/routes/routes.styled";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Link, createFileRoute } from "@tanstack/react-router";

const title = "Things | Michael Savage";
const description = "A collection of things I've made, used, or found useful.";
const url = "https://michaelsavage.com/things";

interface ContentItem {
  id: string;
  title: string | React.ReactNode;
  link?: string;
  description: React.ReactNode;
}

const BlockLink = styled(Link)`
  position: absolute;
  inset: 0;
  z-index: 0;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 0.5rem;
  padding: 1rem;
  background-color: var(--color-white);
  border: 1px solid var(--color-black);
  box-shadow: var(--color-black) 5px 5px;
  transition: transform 0.3s ease;

  h3 {
    font-weight: 600;
    color: var(--color-black);
    font-size: clamp(1rem, 0.9rem + 0.4vw, 1.2rem);
  }

  &:nth-of-type(1),
  &:nth-of-type(2) {
    grid-column: span 6;
  }

  &:nth-of-type(3) {
    grid-column: span 5;
  }

  &:nth-of-type(4) {
    grid-column: span 7;
  }

  &:nth-of-type(5) {
    grid-column: span 7;
  }

  &:nth-of-type(6) {
    grid-column: span 5;
  }

  &:nth-of-type(7) {
    grid-column: span 12;
  }

  ${forPhoneOnly(css`
    &:nth-of-type(n) {
      grid-column: span 1;
    }
  `)}

  &:hover {
    transform: translateY(-2px);
  }
`;

export const Route = createFileRoute("/things")({
  component: RouteComponent,
  head: () => ({
    link: [{ rel: "canonical", href: url }],
    meta: [
      { title },
      { property: "og:title", content: title },
      { property: "og:url", content: url },
      { name: "description", content: description },
      { property: "og:description", content: description },
    ],
  }),
});

const content: ContentItem[] = [
  {
    id: "1-spanish-worksheets",
    title: "Spanish Worksheets",
    link: "/worksheets",
    description: (
      <p>
        Interactive Spanish & Catalan homework generated every two days. Read
        more in my{" "}
        <Anchor link="/blog/learning-spanish" text="blog post" variant="link" />
        .
      </p>
    ),
  },

  {
    id: "2-barcelona-guide",
    title: "Barcelona guide",
    link: "/guide/barcelona",
    description: (
      <p>
        Things to do and see, activities, live music venues, and other fun
        things that aren&apos;t so obvious. Inspired by{" "}
        <Anchor
          link="https://www.atlasobscura.com/things-to-do/barcelona-spain/"
          text="Atlas Obscura"
          variant="link"
          isExternal
        />
        .
      </p>
    ),
  },

  {
    id: "3-doodles",
    title: "Doodles",
    link: "/doodles",
    description: <p>Tattoo ideas and really bad jokes.</p>,
  },

  {
    id: "4-gifts",
    title: "Gift Guide",
    link: "/gifts",
    description: (
      <p>
        I&apos;m trying to be better at giving gifts! Maybe you&apos;ll find
        something useful here.
      </p>
    ),
  },

  {
    id: "5-dj-mixes",
    title: "DJ mixes",
    link: "/mixes",
    description: (
      <p>
        DJ mixes streamed from Archive.org, with waveforms generated using
        wavesurfer.js.
      </p>
    ),
  },
  {
    id: "6-rekordbox-text-prettifier",
    title: "Rekordbox text prettifier",
    link: "/pretty-text",
    description: (
      <p>
        A utility function for formatting exported setlists from Rekordbox.
        Useful for adding the tracklist to a SoundCloud description, etc.
      </p>
    ),
  },
  {
    id: "7-dj-background",
    title: (
      <Player
        videoId="zGB_YubjRN8?si=uzfBT05mcp_fz5-4"
        title="Valentine's movie snippets"
      />
    ),
    description: (
      <p className="date">
        A background visual for Valentine&apos;s themed gig using Adobe
        Illustrator.
      </p>
    ),
  },
];

function RouteComponent() {
  return (
    <Page>
      <MiscContainer>
        <Heading>Things I&apos;ve Made</Heading>

        <p>
          Want something built for you? See my{" "}
          <Anchor link="/services" text="services" variant="link" /> page.
        </p>

        <PostList>
          {content.map((item) => (
            <Container key={item.id}>
              {item.link && <BlockLink to={item.link} />}
              <h3>{item.title}</h3>
              {item.description}
            </Container>
          ))}
        </PostList>
      </MiscContainer>
    </Page>
  );
}
