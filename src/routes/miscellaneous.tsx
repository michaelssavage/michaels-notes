import {
  BentoCard,
  BentoContent,
  BentoDescription,
  BentoHeader,
  BentoTitle,
} from "@/components/atoms/BentoCard";
import { MetaData } from "@/components/atoms/MetaData";
import { Page } from "@/styles/routes/blog.styled";
import { GridContainer } from "@/styles/routes/miscellaneous.styled";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/miscellaneous")({
  component: RouteComponent,
});

const description = "Miscellaneous links, small projects, and lists";

interface BentoI {
  title: string;
  description?: string;
  content?: string;
  link: string;
  colSpan: number;
}

const items: Array<BentoI> = [
  {
    title: "DJ Mixes",
    description:
      "Some DJ mixes that I recorded and bothered to upload. Many exist in different freemium platforms which I will slowly add to here. They are streamed from Archive.org, with the waveform generated from audiowaveform, using wavesurfer.js",
    link: "/mixes",
    colSpan: 3,
  },
  {
    title: "Rekordbox Prettifier",
    description:
      "I created a text prettier for exported setlists from Rekordbox. This was really useful for adding the songs played to the description of SoundCloud or MixCloud.",
    link: "/pretty-text",
    colSpan: 3,
  },
  {
    title: "Barcelona Guide",
    description:
      "A very incomplete guide to things to do, see, and experience in Barcelona. I want to collect points of interest, activities, live music venues, and other fun things that aren't so obvious.",
    link: "/guide/barcelona",
    colSpan: 4,
  },
];

function RouteComponent() {
  return (
    <Page>
      <MetaData title="Miscellaneous" description={description} />
      <GridContainer>
        {items.map((item) => (
          <BentoCard key={item.title} to={item.link} colSpan={item.colSpan}>
            <BentoHeader>
              <BentoTitle>{item.title}</BentoTitle>
              {item.description && (
                <BentoDescription>{item.description}</BentoDescription>
              )}
            </BentoHeader>
            {item.content && <BentoContent>{item.content}</BentoContent>}
          </BentoCard>
        ))}
      </GridContainer>
    </Page>
  );
}
