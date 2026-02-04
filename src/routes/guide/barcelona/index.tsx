import { Group } from "@/components/atoms/Group";
import { FormLabel } from "@/components/form/FormLabel";
import { ExternalLinkIcon, MapIcon } from "@/components/icons";
import { SquarePenIcon } from "@/components/icons/SquarePen";
import { Anchor } from "@/components/molecules/Anchor";
import { Button } from "@/components/molecules/Button";
import { Drawer } from "@/components/molecules/Drawer";
import { GuideMap } from "@/components/molecules/GuideMap/GuideMap";
import { SearchBox } from "@/components/molecules/SearchBox";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll.hook";
import { useMatchMedia } from "@/hooks/use-match-media.hook";
import { useTheme } from "@/hooks/use-theme.hook";
import { shuffleArray } from "@/lib/utils";
import { getGuide } from "@/server/mongo/get-guide.api";
import { customSelectStyles } from "@/styles/react-select.styled";
import { Page } from "@/styles/routes/blog.styled";
import {
  BasicLink,
  Card,
  CardBody,
  CardFooter,
  ClearFiltersButton,
  EditLink,
  FilterableTag,
  FilterContainer,
  Grid,
  LoadMore,
  MapDrawerClose,
  MapDrawerContent,
  MapDrawerHeader,
  MapDrawerMapArea,
  MapDrawerTitle,
  MapDrawerTrigger,
  ResultsCount,
} from "@/styles/routes/guide.styled";
import { SplitPanel, SplitView } from "@/styles/routes/routes.styled";
import {
  GUIDE_TAGS,
  GUIDE_TYPES,
  GuideTableItem,
  GuideTag,
  GuideType,
  TAG_META,
} from "@/types/Guide";
import { css } from "@emotion/react";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useRouteContext } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useMemo, useState } from "react";
import Select from "react-select";

type GuideTypeOption = { value: GuideType | "all"; label: string };

const getTagLabel = (tag: GuideTag) => TAG_META[tag]?.label ?? tag;

const isFreeTag = (tag: GuideTag) =>
  getTagLabel(tag).toLowerCase().includes("free");

const INITIAL_COUNT = 12;
const ITEMS_PER_PAGE = 12;
const title = "Barcelona Guide | Michael Savage";
const description =
  "Barcelona guide with places to visit, activities, and entertainment options.";
const url = "https://michaelsavage.com/guide/barcelona";

export const Route = createFileRoute("/guide/barcelona/")({
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
  const { isAdmin } = useRouteContext({ from: "__root__" });

  const fetchGuide = useServerFn(getGuide);

  const { data: items = [] } = useQuery({
    queryKey: ["guide"],
    queryFn: () => fetchGuide({ data: { name: "barcelona-guide" } }),
    refetchOnWindowFocus: false,
  });

  const [shuffledItems, setShuffledItems] = useState<GuideTableItem[]>([]);

  useEffect(() => {
    if (items.length > 0) {
      setShuffledItems(shuffleArray(items));
    }
  }, [items]);

  const { uniqueTypes, uniqueTags } = (() => {
    const types = new Set<GuideType>();
    const tags = new Set<GuideTag>();

    shuffledItems.forEach((item) => {
      types.add(item.type);
      item.tags.forEach((tag) => tags.add(tag));
    });

    return {
      uniqueTypes: Array.from(types).sort(),
      uniqueTags: Array.from(tags).sort((tagA, tagB) => {
        const priorityA = TAG_META[tagA]?.priority ?? Number.POSITIVE_INFINITY;
        const priorityB = TAG_META[tagB]?.priority ?? Number.POSITIVE_INFINITY;

        if (priorityA !== priorityB) {
          return priorityA - priorityB;
        }

        return getTagLabel(tagA).localeCompare(getTagLabel(tagB));
      }),
    };
  })();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<GuideType | "all">("all");
  const [selectedTags, setSelectedTags] = useState<Array<GuideTag>>([]);

  const [showAll, setShowAll] = useState(false);

  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [isMapDrawerOpen, setIsMapDrawerOpen] = useState(false);
  const { lightTheme } = useTheme();

  const filteredItems = useMemo(() => {
    return shuffledItems.filter((item) => {
      const matchesSearch =
        searchTerm === "" ||
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some((tag) =>
          getTagLabel(tag).toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesType = selectedType === "all" || item.type === selectedType;

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((selectedTag) => {
          if (selectedTag === GUIDE_TAGS.FREE) {
            return item.tags.some((itemTag) => isFreeTag(itemTag));
          }
          return item.tags.includes(selectedTag);
        });

      return matchesSearch && matchesType && matchesTags;
    });
  }, [searchTerm, selectedType, selectedTags, shuffledItems]);

  const { displayedItems, displayedCount, hasMore, loadMore, loaderRef } =
    useInfiniteScroll<GuideTableItem>({
      items: filteredItems,
      initialCount: INITIAL_COUNT,
      itemsPerPage: ITEMS_PER_PAGE,
    });

  const isTagActive = (tag: GuideTag) =>
    selectedTags.includes(tag) ||
    (selectedTags.includes(GUIDE_TAGS.FREE) && isFreeTag(tag));

  const handleTagClick = (tag: GuideTag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
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

  const displayedTags = showAll ? uniqueTags : uniqueTags.slice(0, 5);

  const toggleMapDrawer = (open: boolean) => setIsMapDrawerOpen(open);

  const isTablet = useMatchMedia("(max-width: 768px)");

  const handleCardClick = (item: GuideTableItem) => () => {
    setSelectedItem(item.id);
    if (isTablet) {
      toggleMapDrawer(true);
    }
  };

  const selectedValue: GuideTypeOption = uniqueTypes.find(
    (option) => option === selectedType
  )
    ? { value: selectedType, label: selectedType }
    : { value: "all", label: "All Types" };

  const selectOptions: Array<GuideTypeOption> = [
    { value: "all", label: "All Types" },
    ...Object.values(GUIDE_TYPES).map((type) => ({
      value: type,
      label: type,
    })),
  ];

  return (
    <Page>
      <SplitView>
        <SplitPanel>
          <div data-id="guide-header">
            <h1>Barcelona Guide - Què faré avui?</h1>

            {isAdmin && (
              <Anchor
                link="/guide/barcelona/new"
                text="Create New"
                variant="button"
              />
            )}

            <p>
              Bon dia! There are many things to do in Barcelona but I always
              forget about them. This guide is a collection of my own
              recommendations.
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
                  <Select<GuideTypeOption>
                    id="type"
                    instanceId="type-select"
                    value={selectedValue}
                    onChange={(option) =>
                      setSelectedType(option?.value ?? "all")
                    }
                    options={selectOptions}
                    styles={customSelectStyles<GuideTypeOption>(lightTheme)}
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
                        text={getTagLabel(tag)}
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
          </div>

          <Grid>
            {displayedItems.map((item, index) => {
              return (
                <Card key={index} onClick={handleCardClick(item)}>
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
                    <h2>{item.title}</h2>
                    <p data-id="description">{item.description}</p>

                    {item.tags.length > 0 && (
                      <p data-id="tags">
                        {item.tags?.map((tag) => (
                          <FilterableTag
                            key={tag}
                            $isActive={isTagActive(tag)}
                            onClick={() => handleTagClick(tag)}
                          >
                            {getTagLabel(tag)}
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
                      onClick={(event) => event.stopPropagation()}
                    >
                      Info <ExternalLinkIcon />
                    </BasicLink>

                    {isAdmin && (
                      <EditLink
                        to={`/guide/barcelona/${item.id}`}
                        onClick={(event) => event.stopPropagation()}
                      >
                        Edit <SquarePenIcon />
                      </EditLink>
                    )}

                    <BasicLink
                      href={item.location}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(event) => event.stopPropagation()}
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
        </SplitPanel>
        <GuideMap selectedItem={selectedItem} />
      </SplitView>

      <MapDrawerTrigger onClick={() => toggleMapDrawer(true)}>
        Open map
      </MapDrawerTrigger>

      <Drawer
        title="Map view"
        description="Map of Barcelona with markers for each place."
        isOpen={isMapDrawerOpen}
        onOpenChange={toggleMapDrawer}
      >
        <MapDrawerContent>
          <MapDrawerHeader>
            <MapDrawerTitle>Map view</MapDrawerTitle>
            <MapDrawerClose onClick={() => toggleMapDrawer(false)}>
              Close
            </MapDrawerClose>
          </MapDrawerHeader>
          <MapDrawerMapArea data-vaul-no-drag>
            <GuideMap
              selectedItem={selectedItem}
              isSelectionActive={isMapDrawerOpen}
              withWrapper={false}
            />
          </MapDrawerMapArea>
        </MapDrawerContent>
      </Drawer>
    </Page>
  );
}
