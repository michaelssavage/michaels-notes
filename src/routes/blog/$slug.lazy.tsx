import { createLazyFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useState } from "react";
import { MetaData } from "@/components/atoms";
import { GithubIcon } from "@/components/icons";
import { Anchor } from "@/components/molecules/Anchor";
import { Loading } from "@/components/molecules/Loading";
import { Menu } from "@/components/molecules/Menu/Menu";
import { Article, Content, Header } from "@/styles/routes/blog.styled";
import type { IBlog } from "@/types/Post";
import "highlight.js/styles/monokai.css";
import { useSpring } from "@react-spring/web";
import { usePostContent, usePostsByCategory } from "@/hooks/use-posts.hook";

const Markdown = lazy(() => import("@/components/atoms/Markdown"));

export const Route = createLazyFileRoute("/blog/$slug")({
	component: Slug,
});

function Slug() {
	const [open, setOpen] = useState(false);
	const { slug } = Route.useParams();
	const posts = usePostsByCategory("blogs");

	const {
		data: doc,
		isLoading,
		isError,
		error,
	} = usePostContent<IBlog>("blogs", slug);

	const spring = useSpring({
		from: { opacity: 0, transform: "translateY(20px)" },
		to: { opacity: 1, transform: "translateY(0px)" },
		config: { tension: 300, friction: 30 },
	});

	if (!doc || isLoading)
		return (
			<Article height="90vh">
				<Loading />
			</Article>
		);
	if (isError) {
		return (
			<Article height="90vh">
				Error loading blog: {error?.message || "Unknown error"}
			</Article>
		);
	}

	const sidebar = posts
		.filter(({ isExternal }) => !isExternal)
		.filter(({ id }) => id !== doc.id);

	return (
		<Article>
			<Suspense fallback={<Loading />}>
				<MetaData title={doc.title} description={doc.description} />
				<Menu<IBlog>
					target="blog"
					items={sidebar}
					open={open}
					setOpen={setOpen}
				/>
				<p className="date">{doc.date}</p>
				<Content>
					<Header style={spring}>{doc.title}</Header>
					<Markdown content={doc} />
					{doc.github && (
						<div>
							<Anchor
								text="GitHub Link"
								link={doc.github}
								icon={<GithubIcon />}
								isExternal
							/>
						</div>
					)}
				</Content>
			</Suspense>
		</Article>
	);
}
