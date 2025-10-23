import { Group } from "@/components/atoms/Group";
import { Project } from "@/components/atoms/Project";
import { Anchor } from "@/components/molecules/Anchor";
import { Button } from "@/components/molecules/Button";
import { Loading } from "@/components/molecules/Loading";
import { CurrentPlay } from "@/components/spotify/CurrentPlay/CurrentPlay";
import TopTracks from "@/components/spotify/TopTracks/TopTracks";
import { usePostsByCategory } from "@/hooks/use-posts.hook";
import { sortById } from "@/lib/utils";
import { Container } from "@/styles/abstracts/layout.styled";
import {
  GridContainer,
  Header,
  Page,
  SpotifyContent,
} from "@/styles/routes/projects.styled";
import { type ITechnology, TECHNOLOGIES } from "@/types/Post";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense, useMemo, useState } from "react";

const title = "Projects | Michael Savage";
const description =
  "My personal development, work, code challenges, and university projects";
const url = "https://michaelsavage.com/projects";

export const Route = createFileRoute("/projects/")({
  component: Projects,
  head: () => ({
    title,
    link: [{ rel: "canonical", href: url }],
    meta: [
      { property: "og:title", content: title },
      { property: "og:url", content: url },
      { name: "description", content: description },
      { property: "og:description", content: description },
    ],
  }),
});

function Projects() {
  const [showAll, setShowAll] = useState(false);
  const displayedTechnologies = showAll
    ? TECHNOLOGIES
    : TECHNOLOGIES.slice(0, 3);

  const handleShow = () => setShowAll((prev) => !prev);

  const [selectedTech, setSelectedTech] = useState<ITechnology | null>(null);
  const handleTechClick = (tech: ITechnology) => {
    setSelectedTech(tech === selectedTech ? null : tech);
  };

  const posts = usePostsByCategory("projects");

  const sortedProjects = useMemo(() => {
    return posts.sort(sortById);
  }, [posts]);

  return (
    <Page>
      <Container>
        <Header>
          <h1 data-testid="projects-description">
            Personal development, work, code challenges, and university projects
          </h1>
          <Group wrap="wrap" align="center" gap="0.5rem">
            <p data-id="filter-projects">Filters projects:</p>
            {displayedTechnologies.map((tech) => (
              <Button
                key={tech}
                text={tech}
                variant="pill"
                onClick={() => handleTechClick(tech)}
                disabled={selectedTech !== null && selectedTech !== tech}
                selected={selectedTech === tech}
              />
            ))}
            <Button
              text={showAll ? "Show less" : "Show all"}
              variant="link"
              onClick={handleShow}
            />
          </Group>
        </Header>
      </Container>
      <GridContainer>
        {sortedProjects.map((project) => (
          <Project
            key={project.id}
            data={project}
            selectedTech={selectedTech}
          />
        ))}
      </GridContainer>
      <Container margin="2rem 10% 0">
        <Suspense fallback={<Loading />}>
          <SpotifyContent>
            <Header>
              <h2>Consuming Spotify Music</h2>
              <p>
                I spent some time learning how to use the Spotify API and you
                can read my{" "}
                <Anchor
                  link="/blog/spotify-developer-api"
                  text="words about it here."
                  variant="link"
                />
                Below you can see the top 10 tracks I&apos;ve listened to
                recently and my last listened to song. If I&apos;m online it
                will display what I&apos;m currently listening to.
              </p>
            </Header>
            <CurrentPlay />
            <TopTracks />
          </SpotifyContent>
        </Suspense>
      </Container>
    </Page>
  );
}
