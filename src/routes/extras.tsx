import { Group } from "@/components/atoms/Group";
import { Player } from "@/components/atoms/Player";
import { Anchor } from "@/components/molecules/Anchor";
import { Heading, Page } from "@/styles/routes/blog.styled";
import { MiscContainer } from "@/styles/routes/routes.styled";
import styled from "@emotion/styled";
import { createFileRoute } from "@tanstack/react-router";

const title = "Extras | Michael Savage";
const description = "Miscellaneous links, small projects, and lists.";
const url = "https://michaelsavage.com/extras";

interface ContentItem {
  id: string;
  title: React.ReactNode;
  description: React.ReactNode;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 1px solid var(--color-gray);
  background-color: var(--color-white);
  padding: 1rem;
  border-radius: 0.5rem;
  max-width: 20rem;
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
    title: (
      <Anchor link="/guide/barcelona" text="Barcelona guide" variant="header" />
    ),
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
    title: (
      <Anchor link="/worksheets" text="Spanish Worksheets" variant="header" />
    ),
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
    title: <Anchor link="/doodles" text="Doodles" variant="header" />,
    description: (
      <p>
        Now and again I&apos;ll put pen to paper for tattoo ideas or for really
        bad jokes. I&apos;ll share some of the doodles on this page.
      </p>
    ),
  },

  {
    id: "dj-mixes",
    title: <Anchor link="/mixes" text="DJ mixes" variant="header" />,
    description: (
      <p>
        Some DJ mixes streamed from Archive.org, with waveforms generated using
        wavesurfer.js.
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
      <p>
        A background visual I created for Valentine&apos;s themed gig using
        Adobe Illustrator.
      </p>
    ),
  },
  {
    id: "rekordbox-text-prettifier",
    title: (
      <Anchor
        link="/pretty-text"
        text="Rekordbox text prettifier"
        variant="header"
      />
    ),
    description: (
      <p>
        A utility function for formatting exported setlists from the DJ software
        Rekordbox. Useful for adding the played tracks to the description of
        SoundCloud, MixCloud, etc.
      </p>
    ),
  },
];

function RouteComponent() {
  return (
    <Page>
      <MiscContainer>
        <Heading>Miscellaneous projects</Heading>

        <Group direction="row" gap="1rem" wrap="wrap">
          {content.map((item) => (
            <Container key={item.id}>
              {item.title}
              {item.description}
            </Container>
          ))}
        </Group>
      </MiscContainer>
    </Page>
  );
}
