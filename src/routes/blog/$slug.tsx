import { MetaData } from "@/components/atoms";
import { GithubIcon } from "@/components/icons";
import { Anchor } from "@/components/molecules/Anchor";
import { Loading } from "@/components/molecules/Loading";
import { Menu } from "@/components/molecules/Menu/Menu";
import { Article, Content, Header } from "@/styles/routes/blog.styled";
import type { IBlog, IPosts } from "@/types/Post";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense, lazy, useState } from "react";

const Markdown = lazy(() =>
	import("@/components/atoms").then((module) => ({
		default: module.Markdown,
	})),
);

export const Route = createFileRoute("/blog/$slug")({
	component: Slug,
});

function Slug() {
	const [open, setOpen] = useState(true);

	const { slug } = Route.useParams();
	const { blogs }: IPosts = import.meta.env.POSTS;
	const doc = blogs.find((post) => post.slug === slug);

	if (!doc) {
		return <div>Blog post not found</div>;
	}

	const sidebar = blogs
		.filter((item) => !item.isExternal)
		.filter((current) => current.id !== doc.id);

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
					<Header
						layoutId={`blog-title-${doc.id}`}
						transition={{ type: "spring", stiffness: 300, damping: 30 }}
					>
						{doc.title}
					</Header>
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
