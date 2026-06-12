import { Player } from "@/components/atoms/Player";
import { Anchor } from "@/components/molecules/Anchor";
import { forPhoneOnly } from "@/styles/abstracts/mixins.styled";
import { Heading, Page } from "@/styles/routes/blog.styled";
import { MiscContainer, PostList } from "@/styles/routes/routes.styled";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Link, createFileRoute } from "@tanstack/react-router";

const title = "Extras | Michael Savage";
const description = "Miscellaneous links, small projects, and lists.";
const url = "https://michaelsavage.com/extras";

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
  filter: drop-shadow(5px 5px 0 var(--color-green));
  transition: transform 0.3s ease;

  h3 {
    font-weight: 600;
    color: var(--color-black);
    font-size: clamp(1rem, 0.9rem + 0.4vw, 1.2rem);
  }

  &:nth-child(1),
  &:nth-child(2) {
    grid-column: span 3;
  }

  &:nth-child(3),
  &:nth-child(4),
  &:nth-child(5) {
    grid-column: span 2;
  }

  &:nth-child(6) {
    grid-column: span 6;
  }

  ${forPhoneOnly(css`
    &:nth-child(n) {
      grid-column: span 1;
    }
  `)}

  &:hover {
    filter: drop-shadow(5px 5px 0 var(--color-green200));
    transform: translateY(-2px);
  }
`;

export const Route = createFileRoute("/extras")({
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
    id: "barcelona-guide",
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
    id: "spanish-worksheets",
    title: "Spanish Worksheets",
    link: "/worksheets",
    description: (
      <p>
        Interactive Spanish homework generated every two days with AI, then
        delivered by email. Read more in my{" "}
        <Anchor link="/blog/learning-spanish" text="blog post" variant="link" />
        .
      </p>
    ),
  },

  {
    id: "doodles",
    title: "Doodles",
    link: "/doodles",
    description: (
      <p>
        Now and again I&apos;ll put pen to paper for tattoo ideas or for really
        bad jokes. I&apos;ll share some of the doodles on this page.
      </p>
    ),
  },

  {
    id: "dj-mixes",
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
    id: "rekordbox-text-prettifier",
    title: "Rekordbox text prettifier",
    link: "/pretty-text",
    description: (
      <p>
        A utility function for formatting exported setlists from the DJ software
        Rekordbox. Useful for adding the played tracks to the description of
        SoundCloud, MixCloud, etc.
      </p>
    ),
  },
  {
    id: "dj-background",
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
        <Heading>Miscellaneous projects</Heading>

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
