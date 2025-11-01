import {
  BentoCard,
  BentoDescription,
  BentoHeader,
  BentoTitle,
} from "@/components/atoms/BentoCard";
import { Page } from "@/styles/routes/blog.styled";
import { GridContainer } from "@/styles/routes/miscellaneous.styled";
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
      <GridContainer>
        <BentoCard to="/guide/barcelona">
          <BentoHeader>
            <BentoTitle>Barcelona Guide</BentoTitle>
            <BentoDescription>
              A very incomplete guide to things to do, see, and experience in
              Barcelona. I want to collect points of interest, activities, live
              music venues, and other fun things that aren&apos;t so obvious.
            </BentoDescription>
          </BentoHeader>
        </BentoCard>

        <BentoCard to="/mixes">
          <BentoHeader>
            <BentoTitle>DJ Mixes</BentoTitle>
            <BentoDescription>
              Some DJ mixes that I recorded and bothered to upload. Many exist
              in different freemium platforms which I will slowly add to here.
              They are streamed from Archive.org, with the waveform generated
              from audiowaveform, using wavesurfer.js
            </BentoDescription>
          </BentoHeader>
        </BentoCard>

        <BentoCard to="/pretty-text">
          <BentoHeader>
            <BentoTitle>Rekordbox Prettifier</BentoTitle>
            <BentoDescription>
              I created a text prettier for exported setlists from Rekordbox.
              This was really useful for adding the songs played to the
              description of SoundCloud or MixCloud.
            </BentoDescription>
          </BentoHeader>
        </BentoCard>

        <BentoCard to="/storybook">
          <BentoHeader>
            <BentoTitle>Storybook</BentoTitle>
            <BentoDescription>
              A basic implementation of Storybook.js to show how my components
              can be reused.
            </BentoDescription>
          </BentoHeader>
        </BentoCard>
      </GridContainer>
    </Page>
  );
}
