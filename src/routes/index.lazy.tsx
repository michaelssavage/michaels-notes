import { css } from "@emotion/react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useCallback, useMemo, useState } from "react";
import { Floating } from "@/components/atoms/Floating";
import { Group } from "@/components/atoms/Group";
import { HomeLine } from "@/components/atoms/HomeLine";
import { MetaData } from "@/components/atoms/MetaData";
import { CircleIcon } from "@/components/icons";
import { Bite } from "@/components/molecules/Bite";
import { Button } from "@/components/molecules/Button";
import { Loading } from "@/components/molecules/Loading";
import { NoPost } from "@/components/molecules/Post/NoPost";
import { SearchBox } from "@/components/molecules/SearchBox";
import { Weather } from "@/components/molecules/Weather";
import { usePostsIndex } from "@/hooks/use-posts.hook";
import { sortByDate } from "@/lib/utils";
import { Col, Row } from "@/styles/abstracts/layout.styled";
import {
	ButtonGroup,
	Filter,
	Heading,
	headerStyle,
	Info,
	Page,
	Panel,
	RowStyle,
} from "@/styles/routes/blog.styled";

export type FilterState = {
	isPlantBassd: boolean;
	onSite: boolean;
	isBite: boolean;
};

const Post = lazy(() => import("@/components/molecules/Post/Post"));

export const Route = createLazyFileRoute("/")({
	component: Blog,
});

const description = "Learnings, mishaps, and articles about random things.";

function Blog() {
	const [searchQuery, setSearchQuery] = useState("");
	const [filter, setFilter] = useState<FilterState>({
		isPlantBassd: true,
		onSite: true,
		isBite: true,
	});

	const handleFilter = useCallback(
		(updates: Partial<FilterState>) => {
			setFilter({ ...filter, ...updates });
		},
		[filter],
	);

	const { blogs = [], bites = [] } = usePostsIndex();

	const posts = useMemo(() => {
		const searchLowercase = searchQuery.toLowerCase();
		const { onSite, isPlantBassd, isBite } = filter;

		const filteredBlogs = blogs.filter(
			({ title, description, draft, isExternal }) => {
				const titleMatches = title.toLowerCase().includes(searchLowercase);
				const descriptionMatches = description
					.toLowerCase()
					.includes(searchLowercase);

				if (!titleMatches && !descriptionMatches) return false;
				if (import.meta.env.PROD && draft) return false;

				if (!onSite && !isPlantBassd) return false;
				if (onSite && isPlantBassd) return true;
				return onSite ? !isExternal : isExternal;
			},
		);

		const filteredBites = isBite
			? bites.filter(({ description }) =>
					description.toLowerCase().includes(searchLowercase),
				)
			: [];

		return [...filteredBlogs, ...filteredBites].sort(sortByDate);
	}, [filter, searchQuery, blogs, bites]);

	return (
		<Page>
			<MetaData title="My Blog" description={description} />
			<Panel>
				<Group direction="column" gap="0" css={headerStyle}>
					<Heading>
						Michael <span>Savage</span>
					</Heading>
					<p>
						Frontend Developer from Ireland and currently based in{" "}
						<Floating
							type="tooltip"
							trigger={<span className="underline">Barcelona, Spain</span>}
							content={<Weather />}
						/>
					</p>
					<HomeLine />
				</Group>
				<Row css={RowStyle}>
					<Col size="md" gap="1rem">
						<Suspense fallback={<Loading />}>
							{posts.length > 0 ? (
								posts.map((post, index) => {
									return post.type === "bite" ? (
										<Bite key={post.id} {...post} />
									) : (
										<Post key={post.id} {...post} isFirst={index === 0} />
									);
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
							<Group wrap="wrap" css={css`margin-left: 0.25rem`}>
								<p>Filters posts:</p>
								<ButtonGroup>
									<Button
										icon={<CircleIcon color="#fb4d3d" />}
										text="Posts"
										variant="ghost"
										onClick={() => handleFilter({ onSite: !filter.onSite })}
										active={filter.onSite}
									/>

									<Button
										icon={<CircleIcon color="#3d89fb" />}
										text="Plant Bass'd"
										variant="ghost"
										onClick={() =>
											handleFilter({ isPlantBassd: !filter.isPlantBassd })
										}
										active={filter.isPlantBassd}
									/>

									<Button
										icon={<CircleIcon color="#f8af07" />}
										text="Bites"
										variant="ghost"
										onClick={() => handleFilter({ isBite: !filter.isBite })}
										active={filter.isBite}
									/>
								</ButtonGroup>
								<Info filter={filter}>
									<span id="onSite">Blog posts</span> about learnings and
									mishaps, movies and music, previous{" "}
									<span id="isPlantBassd">Plant Bass'd articles</span>, and{" "}
									<span id="isBite">bite-sized achievements</span> along my
									journey.
								</Info>
							</Group>
						</Filter>
					</Col>
				</Row>
			</Panel>
		</Page>
	);
}
