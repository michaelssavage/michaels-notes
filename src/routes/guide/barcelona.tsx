import { Group } from "@/components/atoms/Group";
import { MetaData } from "@/components/atoms/MetaData";
import { ExternalLinkIcon, MapIcon } from "@/components/icons";
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
  ResultsCount,
  TypeSelect,
} from "@/styles/routes/guide.styled";
import { GuideTags } from "@/types/Guide";
import { css } from "@emotion/react";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/guide/barcelona")({
  component: RouteComponent,
});

const description =
  "Barcelona guide with places to visit, activities, and entertainment options.";

function RouteComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedTags, setSelectedTags] = useState<Array<GuideTags>>([]);

  // Get unique types and tags from items
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

  // Filter items based on search, type, and tags
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Search filter
      const matchesSearch =
        searchTerm === "" ||
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags?.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      // Type filter
      const matchesType = selectedType === "all" || item.type === selectedType;

      // Tags filter
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every((selectedTag) => item.tags?.includes(selectedTag));

      return matchesSearch && matchesType && matchesTags;
    });
  }, [searchTerm, selectedType, selectedTags]);

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

  return (
    <Page>
      <MetaData
        title="Barcelona Guide | Michael Savage"
        description={description}
      />

      <Panel>
        <h1>Barcelona Guide - Qué haré hoy?</h1>

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
            {uniqueTags.map((tag) => (
              <FilterableTag
                key={tag}
                id={`tag-${tag}`}
                isActive={selectedTags.includes(tag)}
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </FilterableTag>
            ))}
          </Group>

          {hasActiveFilters && (
            <Group>
              <ClearFiltersButton onClick={clearAllFilters}>
                Clear All Filters
              </ClearFiltersButton>
            </Group>
          )}
        </FilterContainer>

        <ResultsCount>
          Showing {filteredItems.length} of {items.length} places
        </ResultsCount>

        <Grid>
          {filteredItems.map((item, index) => {
            return (
              <Card key={index}>
                <p data-id="type">{item.type}</p>
                <h2>{item.title}</h2>
                <p data-id="description">{item.description}</p>

                <Group margin="auto 0 0 0">
                  <p>{item.price}</p>

                  <BasicLink href={item.link}>
                    <ExternalLinkIcon />
                  </BasicLink>

                  <BasicLink href={item.location}>
                    <MapIcon />
                  </BasicLink>
                </Group>

                <p data-id="tags">
                  {item.tags?.map((tag) => (
                    <FilterableTag
                      key={tag}
                      isActive={selectedTags.includes(tag)}
                      onClick={() => handleTagClick(tag)}
                    >
                      {tag}
                    </FilterableTag>
                  ))}
                </p>
              </Card>
            );
          })}
        </Grid>

        {filteredItems.length === 0 && (
          <div
            style={{ textAlign: "center", padding: "2rem", color: "#6c757d" }}
          >
            <h3>No places found</h3>
            <p>Try adjusting your search terms or filters.</p>
          </div>
        )}
      </Panel>
    </Page>
  );
}
