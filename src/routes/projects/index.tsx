import { getProjects } from "@/api/posts.api";
import { Group } from "@/components/atoms/Group";
import { LoadingProject } from "@/components/atoms/Project/LoadingProject";
import { Project } from "@/components/atoms/Project/Project";
import { Anchor } from "@/components/molecules/Anchor";
import { Button } from "@/components/molecules/Button";
import { Page, Panel } from "@/styles/routes/blog.styled";
import { Header, ProjectList } from "@/styles/routes/projects.styled";
import { type IProject, type ITechnology, TECHNOLOGIES } from "@/types/Post";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMemo, useState } from "react";

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
  const [selectedTech, setSelectedTech] = useState<ITechnology | null>(null);

  const displayedTechnologies = useMemo(() => {
    if (showAll) return TECHNOLOGIES;
    const visible = TECHNOLOGIES.slice(0, 5);
    // keep the active filter visible when collapsing the list
    return selectedTech && !visible.includes(selectedTech)
      ? [...visible, selectedTech]
      : visible;
  }, [showAll, selectedTech]);

  const handleShow = () => setShowAll((prev) => !prev);

  const handleTechClick = (tech: ITechnology) => {
    setSelectedTech(tech === selectedTech ? null : tech);
  };

  const getProjectsFn = useServerFn(getProjects);

  const { data = [], isLoading } = useQuery<IProject[]>({
    queryKey: ["posts-projects"],
    queryFn: () => getProjectsFn(),
    retry: false,
  });

  const filteredProjects = useMemo(
    () =>
      selectedTech
        ? data.filter((project) => project.technology.includes(selectedTech))
        : data,
    [data, selectedTech],
  );

  return (
    <Page>
      <Panel>
        <Header>
          <h1 data-testid="projects-description">
            Personal development & side projects
          </h1>
          <Group wrap="wrap" align="center" gap="0.5rem">
            <p data-id="filter-projects">Filter projects:</p>
            <Button
              text="All"
              variant="pill"
              onClick={() => setSelectedTech(null)}
              selected={selectedTech === null}
            />
            {displayedTechnologies.map((tech) => (
              <Button
                key={tech}
                text={tech}
                variant="pill"
                onClick={() => handleTechClick(tech)}
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
        <ProjectList>
          {isLoading ? (
            <LoadingProject />
          ) : filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <Project key={project.id} data={project} />
            ))
          ) : (
            <p data-testid="projects-empty">
              No projects using {selectedTech} yet.
            </p>
          )}
        </ProjectList>

        <p>
          Looking to get something like this built for you? Check out my{" "}
          <Anchor link="/services" text="services" variant="link" /> page.
        </p>
      </Panel>
    </Page>
  );
}
