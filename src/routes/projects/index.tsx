import { getProjects } from "@/api/posts.api";
import { Group } from "@/components/atoms/Group";
import { LoadingProject } from "@/components/atoms/Project/LoadingProject";
import { Project } from "@/components/atoms/Project/Project";
import { Anchor } from "@/components/molecules/Anchor";
import { Button } from "@/components/molecules/Button";
import { Loading } from "@/components/molecules/Loading";
import { CurrentPlay } from "@/components/spotify/CurrentPlay/CurrentPlay";
import TopTracks from "@/components/spotify/TopTracks/TopTracks";
import { sortById } from "@/lib/utils";
import { Page, Panel } from "@/styles/routes/blog.styled";
import {
  GridContainer,
  Header,
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
      <Panel>
        <Header>
          <h1 data-testid="projects-description">
            Personal development & side projects
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
      </Panel>

      <Panel>
        <Suspense fallback={<Loading />}>
          <SpotifyContent>
            <Header>
              <h2>What am I listening to?</h2>
              <p>
                Below you can see what I&apos;ve been listening to recently, as
                well as the top 10 most played tracks. If I&apos;m online, my
                currently playing track will be displayed. Read more here:
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
      </Panel>
    </Page>
  );
}
