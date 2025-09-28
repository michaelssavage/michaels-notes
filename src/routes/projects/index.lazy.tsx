import { Group } from "@/components/atoms/Group";
import { Project } from "@/components/atoms/Project";
import { Anchor } from "@/components/molecules/Anchor";
import { Button } from "@/components/molecules/Button";
import { Loading } from "@/components/molecules/Loading";
import { CurrentPlay } from "@/components/spotify/CurrentPlay/CurrentPlay";
import { usePostsByCategory } from "@/hooks/use-posts.hook";
import { sortById } from "@/lib/utils";
import { Container } from "@/styles/abstracts/layout.styled";
import { Header, Page, SpotifyContent } from "@/styles/routes/projects.styled";
import { type ITechnology, TECHNOLOGIES } from "@/types/Post";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useHead, useSeoMeta } from "@unhead/react";
import { lazy, Suspense, useMemo, useState } from "react";

const TopTracks = lazy(
  () => import("@/components/spotify/TopTracks/TopTracks")
);

export const Route = createLazyFileRoute("/projects/")({
  component: Projects,
});

function Projects() {
  useHead({
    link: [{ rel: "canonical", href: "https://www.michaelsavage.ie/projects" }],
  });

  useSeoMeta({
    title: "My Projects",
    description:
      "Personal development, work, code challenges, and university projects",
  });

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
          <Group wrap="wrap" align="center">
            <p data-id="filter-post-title">Filters projects:</p>
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
      </Container>
      <Group wrap="wrap" justify="center">
        {sortedProjects.map((project) => (
          <Project
            key={project.id}
            data={project}
            selectedTech={selectedTech}
          />
        ))}
      </Group>
      <Container maxWidth="70%">
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
