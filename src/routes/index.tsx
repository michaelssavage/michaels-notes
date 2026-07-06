import { getAllViews } from "@/api/d1/views.api";
import { getMiniPosts } from "@/api/posts.api";
import { Floating } from "@/components/atoms/Floating";
import { Group } from "@/components/atoms/Group";
import { HomeLine } from "@/components/atoms/HomeLine";
import { CircleIcon } from "@/components/icons";
import { FilterIcon } from "@/components/icons/Filter";
import { SortIcon } from "@/components/icons/Sort";
import { Bite } from "@/components/molecules/Bite";
import { Button } from "@/components/molecules/Button";
import { NoPost } from "@/components/molecules/Post/NoPost";
import Post from "@/components/molecules/Post/Post";
import { SearchBox } from "@/components/molecules/SearchBox";
import { mainSearchStyled } from "@/components/molecules/SearchBox/SearchBox.styled";
import { Weather } from "@/components/molecules/Weather/Weather";
import { sortByDate, sortByViews } from "@/lib/utils";
import { customSelectStyles } from "@/styles/abstracts/react-select.styled";
import {
  ButtonGroup,
  Filters,
  Heading,
  Info,
  Page,
  Panel,
  PostsList,
} from "@/styles/routes/blog.styled";
import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useMemo, useState } from "react";
import Select from "react-select";

export type FilterState = {
  isPlantBassd: boolean;
  onSite: boolean;
  isBite: boolean;
  isReview: boolean;
};

type SortValue = "newest" | "oldest" | "most_views";

type SortOption = {
  value: SortValue;
  label: string;
};

const sortOptions: SortOption[] = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "most_views", label: "Most Views" },
];

const title = "Writings | Michael Savage";
const description = "Learnings, mishaps, and articles about random things.";
const url = "https://michaelsavage.com/";

export const Route = createFileRoute("/")({
  component: Blog,
  loader: async () => {
    const [data, views] = await Promise.all([getMiniPosts(), getAllViews()]);

    const viewsBySlug = new Map(
      views.map(({ category, slug, count }) => [`${category}:${slug}`, count]),
    );

    return {
      ...data,
      blogs: data.blogs.map((blog) => ({
        ...blog,
        views: viewsBySlug.get(`blogs:${blog.slug}`) ?? 0,
      })),
      reviews: data.reviews.map((review) => ({
        ...review,
        views: viewsBySlug.get(`reviews:${review.slug}`) ?? 0,
      })),
    };
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
  const [sortValue, setSortValue] = useState<SortValue>("newest");
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
    [filter],
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
          description.toLowerCase().includes(searchLowercase),
        )
      : [];

    const combined = [...filteredBlogs, ...filteredReviews, ...filteredBites];

    switch (sortValue) {
      case "most_views":
        return combined.sort(sortByViews);
      case "oldest":
        return combined.sort((a, b) => sortByDate(b, a));
      default:
        return combined.sort(sortByDate);
    }
  }, [filter, searchQuery, sortValue, blogs, bites, reviews]);

  const activeFilters = Object.keys(filter).filter(
    (key) => filter[key as keyof FilterState],
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
            I&apos;m Michael - an Irish Software Developer based in{" "}
            <Floating
              type="tooltip"
              trigger={<span className="underline">Barcelona.</span>}
              content={<Weather />}
            />
          </Heading>
        </Group>

        <Info data-filter={dataFilters}>
          I write about my <span data-id="onSite">learnings and mishaps</span>,{" "}
          <span data-id="isReview">reviews of movies and music</span>, previous{" "}
          <span data-id="isPlantBassd">Plant Bass&apos;d articles</span>, and{" "}
          <span data-id="isBite">bite-sized achievements</span>.
        </Info>

        <Filters>
          <ButtonGroup>
            <FilterIcon />

            <Button
              icon={<CircleIcon dataId="onSite" />}
              text="Blog"
              variant="ghost"
              onClick={() => handleFilter({ onSite: !filter.onSite })}
              active={filter.onSite}
            />

            <Button
              icon={<CircleIcon dataId="isReview" />}
              text="Review"
              variant="ghost"
              onClick={() => handleFilter({ isReview: !filter.isReview })}
              active={filter.isReview}
            />

            <Button
              icon={<CircleIcon dataId="isBite" />}
              text="Bite"
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

          <Group align="center">
            <SortIcon />
            <Select<SortOption>
              instanceId="sort-select"
              options={sortOptions}
              value={sortOptions.find((option) => option.value === sortValue)}
              onChange={(option) => option && setSortValue(option.value)}
              isSearchable={false}
              styles={customSelectStyles<SortOption>()}
            />
          </Group>

          <SearchBox
            id="search-item"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Spotify..."
            styles={mainSearchStyled}
          />
        </Filters>

        <HomeLine />

        {posts.length > 0 ? (
          <PostsList>
            {posts.map((post, index) => {
              return post.type === "bite" ? (
                <Bite key={post.slug} {...post} />
              ) : (
                <Post
                  key={post.slug}
                  {...post}
                  isFirst={index === 0}
                  views={post.views}
                />
              );
            })}
          </PostsList>
        ) : (
          <NoPost />
        )}
      </Panel>
    </Page>
  );
}
