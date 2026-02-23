import { Anchor } from "@/components/molecules/Anchor";
import { Heading, Page } from "@/styles/routes/blog.styled";
import { MiscContainer } from "@/styles/routes/routes.styled";
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
        <Heading>Mini projects</Heading>

        <div>
          <Anchor
            link="/guide/barcelona"
            text="Barcelona guide"
            variant="header"
          />
          <p>
            A very incomplete Barcelona guide for myself. Things to do and see,
            activities, live music venues, and other fun things that aren&apos;t
            so obvious.{" "}
            <Anchor
              link="https://www.atlasobscura.com/things-to-do/barcelona-spain/"
              text="Atlas Obscura"
              variant="link"
              isExternal
            />{" "}
            is another resource I worth looking at.
          </p>
        </div>

        <div>
          <Anchor link="/doodles" text="Doodles" variant="header" />
          <p>
            Now and again I&apos;ll put pen to paper for tattoo ideas or for
            really bad jokes. I&apos;ll share some of the doodles on this page.
          </p>
        </div>

        <div>
          <Anchor link="/mixes" text="DJ mixes" variant="header" />
          <p>
            Here are some DJ mixes that I recorded and bothered to upload. Many
            have existed in different freemium platforms, but have been lost to
            time. These mixes are streamed from Archive.org, with the waveforms
            generated from audiowaveform, using wavesurfer.js. I created a
            background visual for a DJ gig using Adobe Illustrator and{" "}
            <Anchor
              link="https://www.youtube.com/watch?v=zGB_YubjRN8"
              text="uploaded it to YouTube"
              variant="link"
              isExternal
            />
            {". "}
          </p>
        </div>

        <div>
          <Anchor
            link="/pretty-text"
            text="Rekordbox text prettifier"
            variant="header"
          />
          <p>
            I created a utility function, Rekordbox text prettifier to format
            exported setlists from the DJ software Rekordbox. This was really
            useful for adding the songs played to the description of SoundCloud
            or MixCloud.
          </p>
        </div>
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
