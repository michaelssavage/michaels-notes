import { AudioStreamer } from "@/components/atoms/AudioStreamer/AudioStreamer";
import { Group } from "@/components/atoms/Group";
import { Anchor } from "@/components/molecules/Anchor";
import { Page, Panel } from "@/styles/routes/blog.styled";
import { css } from "@emotion/react";
import { createFileRoute } from "@tanstack/react-router";

const title = "Mixes | Michael Savage";
const description =
  "Collection of recorded DJ mixes with Rekordbox. Rendering waveforms with Wavesurfer.js.";
const url = "https://michaelsavage.com/mixes";

export const Route = createFileRoute("/mixes")({
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

const mixes = [
  {
    title: "B2B House Party Mix",
    date: "29 Aug 2025",
    description:
      "A 3 hour B2B mix of house, hard house, uk bass, and more. In the 120bpm - 140bpm range with tracks from the likes of Pangaea, Mall grab, and more.",
    audioUrl:
      "https://ia600907.us.archive.org/10/items/29-aug-b-2b-mix_202508/29-aug-b2b-mix.mp3",
    waveFormData: "/mixes/29-aug-b2b-mix.json",
    externalUrl:
      "https://www.mixcloud.com/michaelsaverage/house-party-b2b-mix/",
  },
  {
    title: "Plant Bass'd Organica",
    date: "7 Oct 2023",
    description:
      "Partially recorded mix of the Plant Bass'd Organica DJ night in Galway with Lushed b2b Michael Average.",
    audioUrl:
      "https://ia800900.us.archive.org/29/items/organica-7-10-23/organica-7-10-23.wav",
    waveFormData: "/mixes/7-oct-23-mix.json",
    externalUrl:
      "https://www.mixcloud.com/michaelsaverage/organica-71023-lushed-b2b-michael-average/",
  },
  {
    title: "Exceptional Dance Music",
    date: "31 May 2026",
    description:
      "An at-home Sunday afternoon mix of bassy music I've been enjoying lately. Jumping from 120bpm up to 174bpm, with tracks from the likes of O'Flynn, Joy Orbison, and more.",
    audioUrl:
      "https://ia601905.us.archive.org/33/items/exceptional-dance-music-mix-31-may-2026/01%20exceptional%20dance%20music%20mix%2031%20may%202026.wav",
    waveFormData: "/mixes/31-may-2026.json",
    externalUrl:
      "https://www.mixcloud.com/michaelsaverage/exceptional-dance-music/",
  },
];

const linkStyle = css`
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  gap: 0.25rem;

  &:hover {
    text-decoration: underline;
  }

  img {
    width: 3rem;
    height: 3rem;
  }

  @media (max-width: 780px) {
    font-size: 0.875rem;

    img {
      width: 2rem;
      height: 2rem;
    }
  }
`;

function RouteComponent() {
  return (
    <Page>
      <Panel>
        <h1 style={{ marginRight: "auto" }}>Mixes</h1>
        <Group
          gap="1rem"
          align="center"
          wrap="wrap"
          css={css`
            margin-top: -1rem;
          `}
        >
          <Anchor
            variant="text"
            link="https://www.mixcloud.com/michaelsaverage/"
            icon={<img src="/mixcloud.svg" alt="Mixcloud" />}
            text="Mixcloud"
            style={linkStyle}
            isExternal
          />

          <Anchor
            variant="text"
            link="https://soundcloud.com/plantbassdworld"
            icon={<img src="/soundcloud.svg" alt="SoundCloud" />}
            text="SoundCloud"
            style={linkStyle}
            isExternal
          />
        </Group>

        {[...mixes]
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
          )
          .map((mix) => (
            <AudioStreamer key={mix.audioUrl} {...mix} />
          ))}
      </Panel>
    </Page>
  );
}
