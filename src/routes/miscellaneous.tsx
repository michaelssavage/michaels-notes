import { Anchor } from "@/components/molecules/Anchor";
import { Page } from "@/styles/routes/blog.styled";
import { MiscContainer } from "@/styles/routes/miscellaneous.styled";
import { createFileRoute } from "@tanstack/react-router";

const title = "Miscellaneous | Michael Savage";
const description = "Miscellaneous links, small projects, and lists.";
const url = "https://michaelsavage.com/miscellaneous";

export const Route = createFileRoute("/miscellaneous")({
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

function RouteComponent() {
  return (
    <Page>
      <MiscContainer>
        <h2>Various mini projects</h2>
        <p>
          A very{" "}
          <Anchor
            link="/guide/barcelona"
            text="incomplete guide"
            variant="header"
          />{" "}
          to things to do, see, and experience in Barcelona. I&apos;m always
          collecting points of interest, activities, live music venues, and
          other fun things that aren&apos;t so obvious. There are many resources
          for finding things to do, like{" "}
          <Anchor
            link="https://www.barcelona-tickets.com/botanical-garden-barcelona/"
            text="barcelona-tickets.com"
            variant="link"
            isExternal
          />
          {", "}
          <Anchor
            link="https://www.atlasobscura.com/things-to-do/barcelona-spain/"
            text="atlasobscura.com"
            variant="link"
            isExternal
          />
          {", or "}
          <Anchor
            link="https://barcelonasecreta.com"
            text="barcelonasecreta.com"
            variant="link"
            isExternal
          />
          .
        </p>

        <p>
          Here are some{" "}
          <Anchor link="/mixes" text="DJ mixes" variant="header" /> that I
          recorded and bothered to upload. Many have existed in different
          freemium platforms, but have been lost to time. These mixes are
          streamed from Archive.org, with the waveforms generated from
          audiowaveform, using wavesurfer.js. I created a background visual for
          a DJ gig using Adobe Illustrator and{" "}
          <Anchor
            link="https://www.youtube.com/watch?v=zGB_YubjRN8"
            text="uploaded it to YouTube"
            variant="link"
            isExternal
          />{" "}
          .
        </p>
        <p>
          I created a utility function,{" "}
          <Anchor
            link="/pretty-text"
            text="Rekordbox text prettifier"
            variant="header"
          />
          {", "}
          to format exported setlists from the DJ software Rekordbox. This was
          really useful for adding the songs played to the description of
          SoundCloud or MixCloud.
        </p>
        {/* <BentoCard to="/storybook">
          <BentoHeader>
            <BentoTitle>Storybook</BentoTitle>
            <BentoDescription>
              A basic implementation of Storybook.js to show how my components
              can be reused.
            </BentoDescription>
          </BentoHeader>
        </BentoCard> */}
      </MiscContainer>
    </Page>
  );
}
