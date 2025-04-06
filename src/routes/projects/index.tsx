import { MetaData } from "@/components/atoms";
import { Group } from "@/components/atoms/Group";
import { Anchor } from "@/components/molecules/Anchor";
import { Button } from "@/components/molecules/Button";
import { Carousel } from "@/components/molecules/Carousel/Carousel";
import { Loading } from "@/components/molecules/Loading";
import { CurrentPlay } from "@/components/spotify/CurrentPlay";
import { sortById } from "@/lib/utils";
import { Container } from "@/styles/abstracts/layout.styled";
import { Header, SpotifyContent } from "@/styles/routes/projects.styled";
import { type IPosts, type ITechnology, TECHNOLOGIES } from "@/types/Post";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense, lazy, useMemo, useState } from "react";

const TopTracks = lazy(() =>
	import("@/components/spotify/TopTracks").then((module) => ({
		default: module.TopTracks,
	})),
);

export const Route = createFileRoute("/projects/")({
	component: Projects,
});

const { projects }: IPosts = import.meta.env.POSTS;

const description =
	"Personal development, work, code challenges, and university projects.";

function Projects() {
	const [selectedTech, setSelectedTech] = useState<ITechnology | null>(null);
	const handleTechClick = (tech: ITechnology) => {
		setSelectedTech(tech === selectedTech ? null : tech);
	};

	const filteredProjects = useMemo(() => {
		return projects
			.filter((project) =>
				selectedTech ? project.technology.includes(selectedTech) : true,
			)
			.sort(sortById);
	}, [selectedTech]);

	return (
		<>
			<Carousel slides={filteredProjects} hasFiltered={selectedTech !== null} />
			<Container>
				<MetaData title="My Projects" description={description} />
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
				<Suspense fallback={<Loading />}>
					<SpotifyContent>
						<Header>
							<h2>Consuming Spotify Data</h2>
							<p>
								I spent some time learning how to use the Spotify API and you
								can read my{" "}
								<Anchor
									link="/blog/spotify-developer-api"
									text="words about it here"
									variant="link"
								/>
								. Below you can see the top 10 tracks I've listened to recently
								and my last listened to song. If I'm online it will display what
								I'm currently listening to.
							</p>
						</Header>
						<CurrentPlay />
						<TopTracks />
					</SpotifyContent>
				</Suspense>
			</Container>
		</>
	);
}
