import { MetaData } from "@/components/atoms";
import { Group } from "@/components/atoms/Group";
import { Project } from "@/components/atoms/Project";
import { Anchor } from "@/components/molecules/Anchor";
import { Button } from "@/components/molecules/Button";
import { Loading } from "@/components/molecules/Loading";
import { CurrentPlay } from "@/components/spotify/CurrentPlay/CurrentPlay";
import { useContent } from "@/context/ContentProvider";
import { sortById } from "@/lib/utils";
import { Container } from "@/styles/abstracts/layout.styled";
import { Header, Page, SpotifyContent } from "@/styles/routes/projects.styled";
import { type IPosts, type ITechnology, TECHNOLOGIES } from "@/types/Post";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Suspense, lazy, useMemo, useState } from "react";

const TopTracks = lazy(
	() => import("@/components/spotify/TopTracks/TopTracks"),
);

export const Route = createLazyFileRoute("/projects/")({
	component: Projects,
});

const description =
	"Personal development, work, code challenges, and university projects.";

function Projects() {
	const { content, isLoading } = useContent();

	const [selectedTech, setSelectedTech] = useState<ITechnology | null>(null);
	const handleTechClick = (tech: ITechnology) => {
		setSelectedTech(tech === selectedTech ? null : tech);
	};

	const { projects = [] } = content || ({} as IPosts);

	const sortedProjects = useMemo(() => {
		return projects.sort(sortById);
	}, [projects]);

	if (isLoading) {
		return (
			<Container>
				<MetaData title="My Blog" description={description} />
				<Header>
					<Loading />
				</Header>
			</Container>
		);
	}

	return (
		<Page>
			<MetaData title="My Projects" description={description} />
			<Container>
				<Header>
					<p>{description}</p>
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
							<h2>Consuming Spotify Data</h2>
							<p>
								I spent some time learning how to use the Spotify API and you
								can read my{" "}
								<Anchor
									link="/blog/spotify-developer-api"
									text="words about it here."
									variant="link"
								/>
								Below you can see the top 10 tracks I've listened to recently
								and my last listened to song. If I'm online it will display what
								I'm currently listening to.
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
