import { getGifts } from "@/api/d1/gifts.api";
import { Group } from "@/components/atoms/Group";
import { FormSelect } from "@/components/form/molecules/FormSelect";
import { SquarePenIcon } from "@/components/icons/SquarePen";
import { Anchor } from "@/components/molecules/Anchor";
import { websites } from "@/content/gifts/ideas";
import { shuffleArray } from "@/lib/utils";
import { MovieInfo, Page, Panel } from "@/styles/routes/blog.styled";
import {
  CategoryHeading,
  EditGiftLink,
  IdeaCard,
  IdeaCategory,
  IdeaImage,
  IdeaPrice,
  IdeasGrid,
  SelectsItems,
  WebsitesList,
} from "@/styles/routes/gifts.styled";
import { Gift, GiftCategory, giftCategoryOptions } from "@/types/Gift";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { createFileRoute, useRouteContext } from "@tanstack/react-router";
import { useMemo, useState } from "react";

const title = "Gift Ideas | Michael Savage";
const description =
  "A curated list of gift ideas collected over the years by an Irish person living in Barcelona.";
const url = "https://michaelsavage.com/gifts";

type SortOrder =
  | "default"
  | "price-asc"
  | "price-desc"
  | "category-asc"
  | "category-desc";

const sortOptions: Array<{ value: SortOrder; label: string }> = [
  { value: "default", label: "Default" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "category-asc", label: "Category: A to Z" },
  { value: "category-desc", label: "Category: Z to A" },
];

// "From €35" / "€90 each" -> 35 / 90
const parsePrice = (price: string) => {
  const match = price.match(/\d+(\.\d+)?/);
  return match ? Number(match[0]) : Number.POSITIVE_INFINITY;
};

const giftsQuery = queryOptions({
  queryKey: ["gifts"],
  queryFn: () => getGifts(),
  staleTime: 5 * 60 * 1000,
});

export const Route = createFileRoute("/gifts")({
  // shuffled in the loader so the server and client render the same order
  loader: async ({ context }) => {
    const gifts = await context.queryClient.ensureQueryData(giftsQuery);
    return { order: shuffleArray(gifts.map((gift) => gift.id)) };
  },
  component: GiftComponent,
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

function GiftComponent() {
  const { order } = Route.useLoaderData();
  const [categories, setCategories] = useState<GiftCategory[]>([]);
  const [sortOrder, setSortOrder] = useState<SortOrder>("default");
  const { isAdmin } = useRouteContext({ from: "__root__" });

  const { data: gifts = [] } = useQuery(giftsQuery);

  // gifts added since the loader ran aren't in `order`, so they go last
  const shuffledIdeas = useMemo(() => {
    const position = new Map(order.map((id, i) => [id, i]));
    const rank = (gift: Gift) => position.get(gift.id) ?? Infinity;
    return [...gifts].sort((a, b) => rank(a) - rank(b));
  }, [gifts, order]);

  const visibleIdeas = useMemo(() => {
    const filtered =
      categories.length === 0
        ? shuffledIdeas
        : shuffledIdeas.filter((idea) => categories.includes(idea.category));

    if (sortOrder === "default") return filtered;

    const direction = sortOrder.endsWith("-asc") ? 1 : -1;

    if (sortOrder.startsWith("category")) {
      return [...filtered].sort(
        (a, b) => direction * a.category.localeCompare(b.category),
      );
    }

    return [...filtered].sort(
      (a, b) => direction * (parsePrice(a.price) - parsePrice(b.price)),
    );
  }, [shuffledIdeas, categories, sortOrder]);

  // ideas are already sorted by category, so consecutive runs form the groups
  const categoryGroups = useMemo(() => {
    if (!sortOrder.startsWith("category")) return null;

    const groups: Array<{ category: GiftCategory; items: Gift[] }> = [];
    for (const idea of visibleIdeas) {
      const last = groups[groups.length - 1];
      if (last?.category === idea.category) last.items.push(idea);
      else groups.push({ category: idea.category, items: [idea] });
    }
    return groups;
  }, [visibleIdeas, sortOrder]);

  const renderIdea = (idea: Gift, showCategory = true) => (
    <IdeaCard key={idea.id} href={idea.link}>
      {idea.image ? (
        <IdeaImage>
          <img src={idea.image} alt={idea.name} />
          {idea.price && <IdeaPrice>{idea.price}</IdeaPrice>}
        </IdeaImage>
      ) : (
        idea.price && <IdeaPrice>{idea.price}</IdeaPrice>
      )}
      {showCategory && <IdeaCategory>{idea.category}</IdeaCategory>}
      <h3>{idea.name}</h3>
      {idea.description && <p>{idea.description}</p>}

      {isAdmin && (
        <EditGiftLink to={`/gifts/${idea.id}`}>
          Edit <SquarePenIcon />
        </EditGiftLink>
      )}
    </IdeaCard>
  );

  return (
    <Page>
      <Panel>
        <Group align="center" justify="space-between">
          <h1>Gift Ideas</h1>
          {isAdmin && (
            <Anchor link="/gifts/new" text="Add gift" variant="button" />
          )}
        </Group>

        <MovieInfo>
          A list of ideas that I&apos;ve been collecting over the years as an
          Irish person living in Barcelona. Some things may be niche, but there
          are no affiliate links and it might help you find something.
        </MovieInfo>

        <SelectsItems>
          <FormSelect<GiftCategory>
            id="category"
            name="Category"
            options={giftCategoryOptions}
            placeholder="All"
            value={categories}
            onChange={(value) => setCategories(value as GiftCategory[])}
            multiSelect
          />
          <FormSelect<SortOrder>
            id="sort"
            name="Sort by"
            options={sortOptions}
            placeholder="Sort by"
            value={sortOrder}
            onChange={(value) => setSortOrder(value as SortOrder)}
          />
        </SelectsItems>

        {categoryGroups ? (
          categoryGroups.map((group) => (
            <section key={group.category}>
              <CategoryHeading>{group.category}</CategoryHeading>
              <IdeasGrid>
                {group.items.map((idea) => renderIdea(idea, false))}
              </IdeasGrid>
            </section>
          ))
        ) : (
          <IdeasGrid>{visibleIdeas.map((idea) => renderIdea(idea))}</IdeasGrid>
        )}

        <h2>Websites</h2>
        <WebsitesList>
          {websites.map((website) => (
            <p key={website.name}>
              <Anchor link={website.url} text={website.name} variant="link" /> -{" "}
              {website.description}
            </p>
          ))}
        </WebsitesList>
      </Panel>
    </Page>
  );
}
