import { Group } from "@/components/atoms/Group";
import { ExternalLinkIcon, MapIcon } from "@/components/icons";
import { Button } from "@/components/molecules/Button";
import { SearchBox } from "@/components/molecules/SearchBox";
import { items } from "@/content/guide/barcelona";
import { Page, Panel } from "@/styles/routes/blog.styled";
import {
  BasicLink,
  Card,
  ClearFiltersButton,
  FilterableTag,
  FilterContainer,
  Grid,
  LinkTitle,
  LoadMore,
  ResultsCount,
  TypeSelect,
} from "@/styles/routes/guide.styled";
import { GuideTags } from "@/types/Guide";
import { css } from "@emotion/react";
import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const INITIAL_ITEMS = 12;
const ITEMS_PER_PAGE = 12;
const title = "Barcelona Guide | Michael Savage";
const description =
  "Barcelona guide with places to visit, activities, and entertainment options.";
const url = "https://michaelsavage.com/guide/barcelona";

export const Route = createFileRoute("/guide/barcelona")({
  component: RouteComponent,
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

function RouteComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedTags, setSelectedTags] = useState<Array<GuideTags>>([]);
  const [showAll, setShowAll] = useState(false);
  const [displayedCount, setDisplayedCount] = useState(INITIAL_ITEMS);

  const loaderRef = useRef<HTMLDivElement>(null);

  const handleShow = () => setShowAll((prev) => !prev);

  const { uniqueTypes, uniqueTags } = useMemo(() => {
    const types = new Set<string>();
    const tags = new Set<GuideTags>();

    items.forEach((item) => {
      types.add(item.type);
      item.tags?.forEach((tag) => tags.add(tag));
    });

    return {
      uniqueTypes: Array.from(types).sort(),
      uniqueTags: Array.from(tags).sort(),
    };
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        searchTerm === "" ||
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags?.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesType = selectedType === "all" || item.type === selectedType;

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every((selectedTag) => item.tags?.includes(selectedTag));

      return matchesSearch && matchesType && matchesTags;
    });
  }, [searchTerm, selectedType, selectedTags]);

  useEffect(() => {
    setDisplayedCount(INITIAL_ITEMS);
  }, [searchTerm, selectedType, selectedTags]);

  const loadMore = useCallback(() => {
    setDisplayedCount((prev) =>
      Math.min(prev + ITEMS_PER_PAGE, filteredItems.length)
    );
  }, [filteredItems.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && displayedCount < filteredItems.length) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [displayedCount, filteredItems.length, loadMore]);

  const displayedItems = filteredItems.slice(0, displayedCount);

  const handleTagClick = (tag: GuideTags) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedType("all");
    setSelectedTags([]);
  };

  const hasActiveFilters =
    searchTerm !== "" || selectedType !== "all" || selectedTags.length > 0;

  const displayedTags = showAll ? uniqueTags : uniqueTags.slice(0, 3);

  return (
    <Page>
      <Panel>
        <h1>Barcelona Guide - Què faré avui?</h1>

        <p>
          Bon dia! There are many ways to find things to do in Barcelona but I
          wanted to store some here.
        </p>

        <FilterContainer>
          <Group align="center" gap="0.5rem" wrap="wrap">
            <Group align="center" gap="0.5rem" wrap="wrap">
              <label htmlFor="search">Search:</label>
              <SearchBox
                id="search"
                placeholder="Search cards..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                styles={css`
                  min-width: fit-content;
                `}
              />
            </Group>

            <Group align="center" gap="0.5rem" wrap="wrap">
              <label htmlFor="type">Type:</label>
              <TypeSelect
                id="type"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="all">All Types</option>
                {uniqueTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </TypeSelect>
            </Group>
          </Group>

          <Group align="center" gap="0.5rem" wrap="wrap">
            <label htmlFor="tags">Tags:</label>
            {displayedTags.map((tag) => (
              <Button
                variant="pill"
                key={tag}
                id={`tag-${tag}`}
                selected={selectedTags.includes(tag)}
                onClick={() => handleTagClick(tag)}
                text={tag}
              />
            ))}
            <Button
              text={showAll ? "Show less" : "Show all"}
              variant="link"
              onClick={handleShow}
            />
          </Group>

          {hasActiveFilters && (
            <Group>
              <ClearFiltersButton onClick={clearAllFilters}>
                Clear All Filters
              </ClearFiltersButton>
            </Group>
          )}
        </FilterContainer>

        <Group justify="flex-end" margin="0 0 1rem 0">
          <ResultsCount>
            Showing {displayedItems.length} of {filteredItems.length} places
          </ResultsCount>
        </Group>

        <Grid>
          {displayedItems.map((item, index) => {
            return (
              <Card key={index}>
                {item.image ? (
                  <img
                    data-id="image"
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                  />
                ) : null}

                {item.tags.length > 0 && (
                  <p data-id="tags">
                    {item.tags?.map((tag) => (
                      <FilterableTag
                        key={tag}
                        $isActive={selectedTags.includes(tag)}
                        onClick={() => handleTagClick(tag)}
                      >
                        {tag}
                      </FilterableTag>
                    ))}
                  </p>
                )}
                <p data-id="type">{item.type}</p>

                <LinkTitle
                  data-id="link"
                  href={item.link}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <h2>{item.title}</h2>
                </LinkTitle>
                <p data-id="description">{item.description}</p>
                <p data-id="price">{item.price}</p>

                <Group margin="0 0 0.5rem 0" justify="space-between">
                  <BasicLink
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Info <ExternalLinkIcon />
                  </BasicLink>

                  <BasicLink
                    href={item.location}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Map <MapIcon />
                  </BasicLink>
                </Group>
              </Card>
            );
          })}
        </Grid>

        {/* For intersection observer */}
        {displayedCount < filteredItems.length && (
          <LoadMore ref={loaderRef} onClick={loadMore} tabIndex={0}>
            <p>Loading more places...</p>
          </LoadMore>
        )}

        {filteredItems.length === 0 && (
          <LoadMore>
            <h3>No places found</h3>
            <p>Try adjusting your search terms or filters.</p>
          </LoadMore>
        )}
      </Panel>
    </Page>
  );
}
