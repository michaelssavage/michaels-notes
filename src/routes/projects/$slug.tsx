import { MetaData } from "@/components/atoms";
import { Group } from "@/components/atoms/Group";
import { Anchor } from "@/components/molecules/Anchor";
import { Loading } from "@/components/molecules/Loading";
import { Menu } from "@/components/molecules/Menu/Menu";
import { joinTags } from "@/lib/utils";
import { Article, Content, Tags, Title } from "@/styles/routes/projects.styled";
import type { IPosts } from "@/types/Post";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense, lazy, useState } from "react";
import type { IProject } from "../../types/Post";
import "highlight.js/styles/monokai.css";

const Markdown = lazy(() => import("@/components/atoms/Markdown"));

export const Route = createFileRoute("/projects/$slug")({
	component: Slug,
});

function Slug() {
	const { slug } = Route.useParams();
	const { projects }: IPosts = import.meta.env.POSTS;
	const doc = projects.find((post) => post.slug === slug);
	const [open, setOpen] = useState(false);

	if (!doc) {
		return <div>Project post not found</div>;
	}

	return (
		<Article>
			<Suspense fallback={<Loading />}>
				<MetaData title={doc.title} description={doc.description} />
				<Menu<IProject>
					target="projects"
					items={projects}
					open={open}
					setOpen={setOpen}
				/>
				<p className="date">{doc.date}</p>
				<Content>
					<Title main={doc.colors.main} bg={doc.colors.bg}>
						{doc.title}
					</Title>

					<Markdown content={doc} />
					<Tags>{joinTags(doc.technology)}</Tags>
					<Group justify="flex-end">
						{doc.github && (
							<Anchor text="GitHub Link" link={doc.github} isExternal />
						)}
					</Group>
				</Content>
			</Suspense>
		</Article>
	);
}
