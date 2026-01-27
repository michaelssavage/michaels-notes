import { Floating } from "@/components/atoms/Floating";
import { Group } from "@/components/atoms/Group";
import { HomeLine } from "@/components/atoms/HomeLine";
import { CircleIcon } from "@/components/icons";
import { Bite } from "@/components/molecules/Bite";
import { Button } from "@/components/molecules/Button";
import { NoPost } from "@/components/molecules/Post/NoPost";
import Post from "@/components/molecules/Post/Post";
import { SearchBox } from "@/components/molecules/SearchBox";
import { Weather } from "@/components/molecules/Weather/Weather";
import { sortByDate } from "@/lib/utils";
import { getMiniPosts } from "@/server/posts.api";
import {
  ButtonGroup,
  Filter,
  Heading,
  Info,
  Page,
  Panel,
} from "@/styles/routes/blog.styled";
import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useMemo, useState } from "react";

export type FilterState = {
  isPlantBassd: boolean;
  onSite: boolean;
  isBite: boolean;
  isReview: boolean;
};

const title = "Writings | Michael Savage";
const description = "Learnings, mishaps, and articles about random things.";
const url = "https://michaelsavage.com/";

export const Route = createFileRoute("/")({
  component: Blog,
  loader: async () => {
    const data = await getMiniPosts();
    return data;
  },
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

function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<FilterState>({
    isPlantBassd: true,
    onSite: true,
    isBite: true,
    isReview: true,
  });

  const handleFilter = useCallback(
    (updates: Partial<FilterState>) => {
      setFilter({ ...filter, ...updates });
    },
    [filter]
  );

  const data = Route.useLoaderData();

  const { blogs = [], bites = [], reviews = [] } = data || {};

  const posts = useMemo(() => {
    const searchLowercase = searchQuery.toLowerCase();
    const { onSite, isPlantBassd, isBite, isReview } = filter;

    const filteredBlogs = blogs.filter(({ title, description, isExternal }) => {
      const titleMatches = title.toLowerCase().includes(searchLowercase);
      const descriptionMatches = description
        .toLowerCase()
        .includes(searchLowercase);

      if (!titleMatches && !descriptionMatches) return false;

      if (!onSite && !isPlantBassd) return false;
      if (onSite && isPlantBassd) return true;
      return onSite ? !isExternal : isExternal;
    });

    const filteredReviews = isReview
      ? reviews.filter(({ title, description }) => {
          const titleMatches = title.toLowerCase().includes(searchLowercase);
          const descriptionMatches = description
            .toLowerCase()
            .includes(searchLowercase);

          if (!titleMatches && !descriptionMatches) return false;

          return true;
        })
      : [];

    const filteredBites = isBite
      ? bites.filter(({ description }) =>
          description.toLowerCase().includes(searchLowercase)
        )
      : [];

    return [...filteredBlogs, ...filteredReviews, ...filteredBites].sort(
      sortByDate
    );
  }, [filter, searchQuery, blogs, bites, reviews]);

  const activeFilters = Object.keys(filter).filter(
    (key) => filter[key as keyof FilterState]
  );

  const dataFilters =
    activeFilters.length === Object.keys(filter).length
      ? ""
      : activeFilters.join(" ");

  return (
    <Page>
      <Panel>
        <Group direction="column" gap="0">
          <Heading>
            Michael - Irish Software Developer based in{" "}
            <Floating
              type="tooltip"
              trigger={<span className="underline">Barcelona.</span>}
              content={<Weather />}
            />
          </Heading>
        </Group>
        <Info data-filter={dataFilters}>
          Here you can find blog posts about my{" "}
          <span data-id="onSite">learnings and mishaps</span>,{" "}
          <span data-id="isReview">reviews of movies and music</span>, previous{" "}
          <span data-id="isPlantBassd">Plant Bass&apos;d articles</span>, , and{" "}
          <span data-id="isBite">bite-sized achievements</span>.
        </Info>
        <Group wrap="wrap">
          <p data-id="filter-post-title">Filter:</p>
          <ButtonGroup>
            <Button
              icon={<CircleIcon dataId="onSite" />}
              text="Posts"
              variant="ghost"
              onClick={() => handleFilter({ onSite: !filter.onSite })}
              active={filter.onSite}
            />

            <Button
              icon={<CircleIcon dataId="isReview" />}
              text="Reviews"
              variant="ghost"
              onClick={() => handleFilter({ isReview: !filter.isReview })}
              active={filter.isReview}
            />

            <Button
              icon={<CircleIcon dataId="isBite" />}
              text="Bites"
              variant="ghost"
              onClick={() => handleFilter({ isBite: !filter.isBite })}
              active={filter.isBite}
            />

            <Button
              icon={<CircleIcon dataId="isPlantBassd" />}
              text="Plant Bass'd"
              variant="ghost"
              onClick={() =>
                handleFilter({ isPlantBassd: !filter.isPlantBassd })
              }
              active={filter.isPlantBassd}
            />
          </ButtonGroup>
        </Group>
        <Filter>
          <SearchBox
            id="search-item"
            label="Search:"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Spotify..."
          />
        </Filter>

        <HomeLine />
        {posts.length > 0 ? (
          posts.map((post, index) => {
            return post.type === "bite" ? (
              <Bite key={post.slug} {...post} />
            ) : (
              <Post key={post.slug} {...post} isFirst={index === 0} />
            );
          })
        ) : (
          <NoPost />
        )}
      </Panel>
    </Page>
  );
}
