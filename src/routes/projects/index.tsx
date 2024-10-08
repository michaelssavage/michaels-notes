import { Anchor } from "@/components/Anchor";
import { Project } from "@/components/atoms/Project";
import { CurrentPlay } from "@/components/spotify/CurrentPlay";
import { TopTracks } from "@/components/spotify/TopTracks";
import { sortById } from "@/lib/utils";
import { Container } from "@/styles/abstracts/layout.styled";
import {
  Header,
  ProjectGrid,
  SpotifyContent,
} from "@/styles/routes/projects.styled";
import type { IPosts } from "@/types/Post";
import { createFileRoute } from "@tanstack/react-router";
import { Masonry } from "masonic";
import { memo } from "react";

export const Route = createFileRoute("/projects/")({
  component: Projects,
});

const { projects }: IPosts = import.meta.env.POSTS;

const MemoizedCurrentPlay = memo(CurrentPlay);

function Projects() {
  return (
    <Container>
      <SpotifyContent>
        <Header>
          <h2>Consuming Spotify Data</h2>
          <p>
            I spent some time learning how to use the Spotify API and you can
            read my{" "}
            <Anchor
              link="blog/spotify-developer-api"
              text="words about it here"
              variant="link"
            />
            . Below you can see the top 10 tracks I've listened to recently and
            my last listened to song. If I'm online it will display what I'm
            currently listening to.
          </p>
        </Header>
        <MemoizedCurrentPlay />
        <TopTracks />
      </SpotifyContent>
      <Header>
        <h2>Projects</h2>
        <p>
          Personal development, work, code challenges, and university projects.
        </p>
      </Header>
      <Masonry
        items={projects.sort(sortById)}
        render={Project}
        css={ProjectGrid}
      />
    </Container>
  );
}
