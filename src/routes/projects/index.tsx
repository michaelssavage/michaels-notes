import { Anchor } from "@/components/Anchor";
import { Button } from "@/components/Button";
import { Group } from "@/components/atoms/Group";
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
import { type IPosts, type ITechnology, TECHNOLOGIES } from "@/types/Post";
import { usePrevious } from "@/utils";
import { createFileRoute } from "@tanstack/react-router";
import { Masonry } from "masonic";
import { memo, useMemo, useRef, useState } from "react";

export const Route = createFileRoute("/projects/")({
  component: Projects,
});

const { projects }: IPosts = import.meta.env.POSTS;

const MemoizedCurrentPlay = memo(CurrentPlay);

function Projects() {
  const [selectedTech, setSelectedTech] = useState<ITechnology | null>(null);
  const handleTechClick = (tech: ITechnology) => {
    setSelectedTech(tech === selectedTech ? null : tech);
  };

  const filteredProjects = projects
    .filter((project) =>
      selectedTech ? project.technology.includes(selectedTech) : true
    )
    .sort(sortById);

  const itemsCount = filteredProjects?.length;
  const prevItemsCount = usePrevious(itemsCount);

  const removesCount = useRef(0);

  const gridKeyPostfix = useMemo(() => {
    if (!itemsCount || !prevItemsCount) return removesCount.current;
    if (itemsCount < prevItemsCount) {
      removesCount.current += 1;
      return removesCount.current;
    }

    return removesCount.current;
  }, [itemsCount, prevItemsCount]);

  return (
    <Container>
      <Header>
        <p>
          Personal development, work, code challenges, and university projects.
        </p>
        <Group wrap="wrap">
          {TECHNOLOGIES.map((tech) => (
            <Button
              key={tech}
              text={tech}
              variant="pill"
              onClick={() => handleTechClick(tech)}
              disabled={selectedTech !== null && selectedTech !== tech}
              selected={selectedTech === tech}
            />
          ))}
        </Group>
      </Header>
      <Masonry
        key={`grid-${gridKeyPostfix}`}
        columnGutter={3}
        items={filteredProjects}
        render={Project}
        css={ProjectGrid}
      />
      <SpotifyContent>
        <Header>
          <h2>Consuming Spotify Data</h2>
          <p>
            I spent some time learning how to use the Spotify API and you can
            read my{" "}
            <Anchor
              link="/blog/spotify-developer-api"
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
    </Container>
  );
}
