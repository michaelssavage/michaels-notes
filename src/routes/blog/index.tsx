import { MetaData } from "@/components/atoms";
import { Group } from "@/components/atoms/Group";
import { CircleIcon } from "@/components/icons";
import { Button } from "@/components/molecules/Button";
import { NoPost } from "@/components/molecules/Post/NoPost";
import { SearchBox } from "@/components/molecules/SearchBox";
import { sortByDate } from "@/lib/utils";
import { Col, Row } from "@/styles/abstracts/layout.styled";
import {
	ButtonGroup,
	Filter,
	Page,
	Panel,
	RowStyle,
} from "@/styles/routes/blog.styled";
import type { IBlog, IPosts } from "@/types/Post";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense, lazy, useState } from "react";

const Post = lazy(() =>
	import("@/components/molecules/Post").then((module) => ({
		default: module.Post,
	})),
);

export const Route = createFileRoute("/blog/")({
	component: Blog,
});

const { blog }: IPosts = import.meta.env.POSTS;

const description = "Learnings, mishaps, and articles about random things.";

function Blog() {
	const [searchQuery, setSearchQuery] = useState("");
	const [isExternal, setIsExternal] = useState(true);
	const [onSite, setOnSite] = useState(true);

	const filterPosts = (list: IBlog[]) => {
		const searchLowercase = searchQuery.toLowerCase();

		return list
			.filter((item) => {
				if (
					!item.title.toLowerCase().includes(searchLowercase) &&
					!item.description.toLowerCase().includes(searchLowercase)
				) {
					return false;
				}

				if (import.meta.env.PROD && item.draft) {
					return false;
				}

				if (isExternal && onSite) {
					return true;
				}

				if (onSite) {
					return !item.isExternal;
				}

				if (isExternal) {
					return item.isExternal;
				}

				return false;
			})
			.sort(sortByDate);
	};

	return (
		<Page>
			<MetaData title="My Blog" description={description} />
			<Panel>
				<Row css={RowStyle}>
					<Col size="md" gap="1rem">
						<Suspense>
							{filterPosts(blog).length > 0 ? (
								filterPosts(blog).map((post, index) => {
									return <Post key={post.id} {...post} isFirst={index === 0} />;
								})
							) : (
								<NoPost />
							)}
						</Suspense>
					</Col>
					<Col size="md">
						<Filter>
							<SearchBox
								id="search-item"
								label="Search posts:"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								placeholder="Spotify..."
							/>
							<Group wrap="wrap">
								<p>Filters posts:</p>
								<ButtonGroup>
									<Button
										icon={<CircleIcon color="#fb4d3d" />}
										text="On site"
										variant="ghost"
										onClick={() => setOnSite(!onSite)}
										active={onSite}
									/>

									<Button
										icon={<CircleIcon color="#3d89fb" />}
										text="Plant Bass'd"
										variant="ghost"
										onClick={() => setIsExternal(!isExternal)}
										active={isExternal}
									/>
								</ButtonGroup>
							</Group>
						</Filter>
					</Col>
				</Row>
			</Panel>
		</Page>
	);
}
