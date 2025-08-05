import { createLazyFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useState } from "react";
import { Group } from "@/components/atoms/Group";
import { MetaData } from "@/components/atoms/MetaData";
import { Anchor } from "@/components/molecules/Anchor";
import { Loading } from "@/components/molecules/Loading";
import { Menu } from "@/components/molecules/Menu/Menu";
import { joinTags } from "@/lib/utils";
import { Article, Content, Tags, Title } from "@/styles/routes/projects.styled";
import type { IProject } from "../../types/Post";
import "highlight.js/styles/monokai.css";
import { usePostContent, usePostsByCategory } from "@/hooks/use-posts.hook";

const Markdown = lazy(() => import("@/components/atoms/Markdown"));

export const Route = createLazyFileRoute("/projects/$slug")({
	component: Slug,
});

function Slug() {
	const [open, setOpen] = useState(false);
	const { slug } = Route.useParams();
	const posts = usePostsByCategory("projects");

	const {
		data: doc,
		isLoading,
		isError,
		error,
	} = usePostContent<IProject>("projects", slug);

	if (!doc || isLoading)
		return (
			<Article height="90vh">
				<Loading />
			</Article>
		);
	if (isError) {
		return (
			<Article height="90vh">
				Error loading project: {error?.message || "Unknown error"}
			</Article>
		);
	}

	return (
		<Article>
			<Suspense fallback={<Loading />}>
				<MetaData title={doc.title} description={doc.description} />
				<Menu<IProject>
					target="projects"
					items={posts.filter(({ id }) => id !== doc.id)}
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
