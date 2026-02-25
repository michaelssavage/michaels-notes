import { getMiniPosts } from "@/api/posts.api";
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
import {
  ButtonGroup,
  Filter,
  Heading,
  Info,
  Page,
  Panel,
} from "@/styles/routes/blog.styled";
import {
  createFileRoute,
  stripSearchParams,
  useNavigate,
} from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { ChangeEvent } from "react";
import { z } from "zod";

export type FilterState = {
  isPlantBassd: boolean;
  onSite: boolean;
  isBite: boolean;
  isReview: boolean;
  q: string;
};

const title = "Writings | Michael Savage";
const description = "Learnings, mishaps, and articles about random things.";
const url = "https://michaelsavage.com/";

const defaultFilters: FilterState = {
  onSite: true,
  isReview: true,
  isBite: true,
  isPlantBassd: true,
  q: "",
};

const filterSchema = z.object({
  onSite: z.boolean().default(defaultFilters.onSite),
  isReview: z.boolean().default(defaultFilters.isReview),
  isBite: z.boolean().default(defaultFilters.isBite),
  isPlantBassd: z.boolean().default(defaultFilters.isPlantBassd),
  q: z.string().default(defaultFilters.q),
});

export const Route = createFileRoute("/")({
  component: Blog,
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
  validateSearch: zodValidator(filterSchema),
  search: { middlewares: [stripSearchParams(defaultFilters)] },
  loaderDeps: ({ search }) => search,
  loader: async ({ deps: { onSite, isReview, isBite, isPlantBassd, q } }) => {
    const data = await getMiniPosts();
    const { blogs = [], bites = [], reviews = [] } = data || {};
    const searchLowercase = q.toLowerCase();

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
          return titleMatches || descriptionMatches;
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
  },
});

function Blog() {
  const navigate = useNavigate();
  const { onSite, isReview, isBite, isPlantBassd, q } = Route.useSearch();
  const posts = Route.useLoaderData();

  const handleFilter = (updates: Partial<FilterState>) => {
    navigate({ to: "/", search: (prev) => ({ ...prev, ...updates }) });
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    navigate({
      to: "/",
      search: (prev) => ({ ...prev, q: e.target.value }),
      replace: true,
    });
  };

  const allFiltersActive = onSite && isPlantBassd && isBite && isReview;
  const dataFilters = allFiltersActive
    ? ""
    : [
        onSite && "onSite",
        isPlantBassd && "isPlantBassd",
        isBite && "isBite",
        isReview && "isReview",
      ]
        .filter(Boolean)
        .join(" ");

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
          I write about my <span data-id="onSite">learnings and mishaps</span>,{" "}
          <span data-id="isReview">reviews of movies and music</span>, previous{" "}
          <span data-id="isPlantBassd">Plant Bass&apos;d articles</span>, and{" "}
          <span data-id="isBite">bite-sized achievements</span>.
        </Info>
        <Group wrap="wrap">
          <p data-id="filter-post-title">Filter:</p>
          <ButtonGroup>
            <Button
              icon={<CircleIcon dataId="onSite" />}
              text="Posts"
              variant="ghost"
              onClick={() => handleFilter({ onSite: !onSite })}
              active={onSite}
            />

            <Button
              icon={<CircleIcon dataId="isReview" />}
              text="Reviews"
              variant="ghost"
              onClick={() => handleFilter({ isReview: !isReview })}
              active={isReview}
            />

            <Button
              icon={<CircleIcon dataId="isBite" />}
              text="Bites"
              variant="ghost"
              onClick={() => handleFilter({ isBite: !isBite })}
              active={isBite}
            />

            <Button
              icon={<CircleIcon dataId="isPlantBassd" />}
              text="Plant Bass'd"
              variant="ghost"
              onClick={() => handleFilter({ isPlantBassd: !isPlantBassd })}
              active={isPlantBassd}
            />
          </ButtonGroup>
        </Group>
        <Filter>
          <SearchBox
            id="search-item"
            label="Search:"
            value={q}
            onChange={handleSearch}
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
