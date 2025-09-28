import { Floating } from "@/components/atoms/Floating";
import { Group } from "@/components/atoms/Group";
import { HomeLine } from "@/components/atoms/HomeLine";
import { CircleIcon } from "@/components/icons";
import { Bite } from "@/components/molecules/Bite";
import { Button } from "@/components/molecules/Button";
import { Loading } from "@/components/molecules/Loading";
import { NoPost } from "@/components/molecules/Post/NoPost";
import { SearchBox } from "@/components/molecules/SearchBox";
import { Weather } from "@/components/molecules/Weather";
import { usePostsIndex } from "@/hooks/use-posts.hook";
import { sortByDate } from "@/lib/utils";
import {
  ButtonGroup,
  Filter,
  Heading,
  Info,
  Page,
  Panel,
} from "@/styles/routes/blog.styled";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useHead, useSeoMeta } from "@unhead/react";
import { lazy, Suspense, useCallback, useMemo, useState } from "react";

export type FilterState = {
  isPlantBassd: boolean;
  onSite: boolean;
  isBite: boolean;
  isReview: boolean;
};

const Post = lazy(() => import("@/components/molecules/Post/Post"));

export const Route = createLazyFileRoute("/")({
  component: Blog,
});

function Blog() {
  useHead({
    link: [{ rel: "canonical", href: "https://www.michaelsavage.ie/" }],
  });

  useSeoMeta({
    title: "Writings",
    description: "Learnings, mishaps, and articles about random things.",
  });

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

  const { data } = usePostsIndex();
  const { blogs = [], bites = [], reviews = [] } = data || {};

  const posts = useMemo(() => {
    const searchLowercase = searchQuery.toLowerCase();
    const { onSite, isPlantBassd, isBite, isReview } = filter;

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
      }
    );

    const filteredReviews = isReview
      ? reviews.filter(({ title, description, draft }) => {
          const titleMatches = title.toLowerCase().includes(searchLowercase);
          const descriptionMatches = description
            .toLowerCase()
            .includes(searchLowercase);

          if (!titleMatches && !descriptionMatches) return false;
          if (import.meta.env.PROD && draft) return false;

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
            Hi, I&apos;m Michael, A Software Developer from Ireland currently
            based in{" "}
            <Floating
              type="tooltip"
              trigger={<span className="underline">Barcelona, Spain</span>}
              content={<Weather />}
            />
          </Heading>
        </Group>
        <Filter>
          <SearchBox
            id="search-item"
            label="Search posts:"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Spotify..."
          />
          <Group wrap="wrap">
            <p data-id="filter-post-title">Filters posts:</p>
            <ButtonGroup>
              <Button
                icon={<CircleIcon dataId="onSite" />}
                text="Posts"
                variant="ghost"
                onClick={() => handleFilter({ onSite: !filter.onSite })}
                active={filter.onSite}
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

              <Button
                icon={<CircleIcon dataId="isBite" />}
                text="Bites"
                variant="ghost"
                onClick={() => handleFilter({ isBite: !filter.isBite })}
                active={filter.isBite}
              />

              <Button
                icon={<CircleIcon dataId="isReview" />}
                text="Reviews"
                variant="ghost"
                onClick={() => handleFilter({ isReview: !filter.isReview })}
                active={filter.isReview}
              />
            </ButtonGroup>
            <Info data-filter={dataFilters}>
              <span data-id="onSite">Blog posts</span> about learnings and
              mishaps, movies and music, previous{" "}
              <span data-id="isPlantBassd">Plant Bass&apos;d articles</span>,{" "}
              <span data-id="isReview">reviews of films and media</span>, and{" "}
              <span data-id="isBite">bite-sized achievements</span> along my
              journey.
            </Info>
          </Group>
        </Filter>

        <HomeLine />
        <Suspense fallback={<Loading />}>
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
        </Suspense>
      </Panel>
    </Page>
  );
}
