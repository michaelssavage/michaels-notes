import { Group } from "@/components/atoms/Group";
import { LoadingProject } from "@/components/atoms/Project/LoadingProject";
import { Project } from "@/components/atoms/Project/Project";
import { Anchor } from "@/components/molecules/Anchor";
import { Button } from "@/components/molecules/Button";
import { Loading } from "@/components/molecules/Loading";
import { CurrentPlay } from "@/components/spotify/CurrentPlay/CurrentPlay";
import TopTracks from "@/components/spotify/TopTracks/TopTracks";
import { sortById } from "@/lib/utils";
import { getProjects } from "@/server/posts.api";
import { Container } from "@/styles/abstracts/layout.styled";
import {
  GridContainer,
  Header,
  Page,
  SpotifyContent,
} from "@/styles/routes/projects.styled";
import { type IProject, type ITechnology, TECHNOLOGIES } from "@/types/Post";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Suspense, useState } from "react";

const title = "Projects | Michael Savage";
const description =
  "My personal development, work, code challenges, and university projects";
const url = "https://michaelsavage.com/projects";

export const Route = createFileRoute("/projects/")({
  component: Projects,
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

function Projects() {
  const [showAll, setShowAll] = useState(false);
  const displayedTechnologies = showAll
    ? TECHNOLOGIES
    : TECHNOLOGIES.slice(0, 5);

  const handleShow = () => setShowAll((prev) => !prev);

  const [selectedTech, setSelectedTech] = useState<ITechnology | null>(null);
  const handleTechClick = (tech: ITechnology) => {
    setSelectedTech(tech === selectedTech ? null : tech);
  };

  const getProjectsFn = useServerFn(getProjects);

  const { data = [], isLoading } = useQuery<IProject[]>({
    queryKey: ["posts-projects"],
    queryFn: () => getProjectsFn(),
    retry: false,
  });

  return (
    <Page>
      <Container>
        <Header>
          <h1 data-testid="projects-description">
            Personal development through side projects
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
        <GridContainer>
          {isLoading ? (
            <LoadingProject />
          ) : (
            data
              .sort(sortById)
              .map((project) => (
                <Project
                  key={project.id}
                  data={project}
                  selectedTech={selectedTech}
                />
              ))
          )}
        </GridContainer>
      </Container>
      <Container margin="2rem 10% 0">
        <Suspense fallback={<Loading />}>
          <SpotifyContent>
            <Header>
              <h2>Consuming Spotify Music</h2>
              <p>
                Below you can see the top 10 tracks I&apos;ve listened to
                recently and my last listened to song. If I&apos;m online it
                will display what I&apos;m currently listening to. You can read
                more about how I set up the{" "}
                <Anchor
                  link="/blog/spotify-developer-api"
                  text="Spotify API here."
                  variant="link"
                />
              </p>
            </Header>

            {/* spotify components */}
            <CurrentPlay />
            <TopTracks />
          </SpotifyContent>
        </Suspense>
      </Container>
    </Page>
  );
}
