import { FormLabel } from "@/components/atoms/FormLabel";
import { Group } from "@/components/atoms/Group";
import { ExternalLinkIcon, MapIcon } from "@/components/icons";
import { Button } from "@/components/molecules/Button";
import { SearchBox } from "@/components/molecules/SearchBox";
import { items } from "@/content/guide/barcelona";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll.hook";
import { useTheme } from "@/hooks/use-theme.hook";
import { customSelectStyles } from "@/styles/react-select.styled";
import { Page, Panel } from "@/styles/routes/blog.styled";
import {
  BasicLink,
  Card,
  CardBody,
  CardFooter,
  ClearFiltersButton,
  FilterableTag,
  FilterContainer,
  Grid,
  LinkTitle,
  LoadMore,
  ResultsCount,
} from "@/styles/routes/guide.styled";
import { GuideTableItem, GuideTags } from "@/types/Guide";
import { css } from "@emotion/react";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import Select from "react-select";

const INITIAL_COUNT = 12;
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
  const { lightTheme } = useTheme();

  const { uniqueTypes, uniqueTags } = useMemo(() => {
    const types = new Set<string>();
    const tags = new Set<GuideTags>();

    items.forEach((item) => {
      types.add(item.type);
      item.tags?.forEach((tag) => {
        if (tag.toLowerCase().includes("free")) {
          tags.add("Free");
        } else {
          tags.add(tag);
        }
      });
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
          tag.toLowerCase().includes(searchTerm.toLowerCase()),
        );

      const matchesType = selectedType === "all" || item.type === selectedType;

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((selectedTag) => {
          if (selectedTag === "Free") {
            return item.tags?.some((itemTag) =>
              itemTag.toLowerCase().includes("free"),
            );
          }
          return item.tags?.includes(selectedTag);
        });

      return matchesSearch && matchesType && matchesTags;
    });
  }, [searchTerm, selectedType, selectedTags]);

  const { displayedItems, displayedCount, hasMore, loadMore, loaderRef } =
    useInfiniteScroll<GuideTableItem>({
      items: filteredItems,
      initialCount: INITIAL_COUNT,
      itemsPerPage: ITEMS_PER_PAGE,
    });

  const isTagActive = (tag: GuideTags) => {
    if (tag.toLowerCase().includes("free") && selectedTags.includes("Free")) {
      return true;
    }
    return selectedTags.includes(tag);
  };

  const handleTagClick = (tag: GuideTags) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const handleShow = () => setShowAll((prev) => !prev);

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
          Bon dia! There are many resources to find things to do in Barcelona
          but I wanted to store my own recommendations here.
        </p>

        <FilterContainer>
          <Group align="center" gap="0.5rem" wrap="wrap">
            <FormLabel id="search" label="Search">
              <SearchBox
                id="search"
                placeholder="Search cards..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                styles={css`
                  min-width: fit-content;
                `}
              />
            </FormLabel>

            <FormLabel id="type" label="Type">
              <Select
                id="type"
                value={
                  uniqueTypes
                    .map((type) => ({ value: type, label: type }))
                    .find((option) => option.value === selectedType) || {
                    value: "all",
                    label: "All Types",
                  }
                }
                onChange={(option) => setSelectedType(option?.value || "all")}
                options={[
                  { value: "all", label: "All Types" },
                  ...uniqueTypes.map((type) => ({ value: type, label: type })),
                ]}
                styles={customSelectStyles(lightTheme)}
              />
            </FormLabel>

            <FormLabel id="tags" label="Tags">
              <Group align="center" gap="0.5rem" wrap="wrap">
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
            </FormLabel>
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
            Showing {displayedCount} of {filteredItems.length} places
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

                <p data-id="type">{item.type}</p>
                <p data-id="price">{item.price}</p>

                <CardBody>
                  <LinkTitle
                    data-id="link"
                    href={item.link}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <h2>{item.title}</h2>
                  </LinkTitle>
                  <p data-id="description">{item.description}</p>

                  {item.tags.length > 0 && (
                    <p data-id="tags">
                      {item.tags?.map((tag) => (
                        <FilterableTag
                          key={tag}
                          $isActive={isTagActive(tag)}
                          onClick={() => handleTagClick(tag)}
                        >
                          {tag}
                        </FilterableTag>
                      ))}
                    </p>
                  )}
                </CardBody>

                <CardFooter>
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
                </CardFooter>
              </Card>
            );
          })}
        </Grid>

        {hasMore && (
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
