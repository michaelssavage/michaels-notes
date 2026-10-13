import { FormSelect } from "@/components/form/molecules/FormSelect";
import { Anchor } from "@/components/molecules/Anchor";
import {
  Category,
  categoryOptions,
  ideas,
  websites,
} from "@/content/gifts/ideas";
import { MovieInfo, Page, Panel } from "@/styles/routes/blog.styled";
import {
  IdeaCard,
  IdeaCategory,
  IdeaImage,
  IdeaPrice,
  IdeasGrid,
  SelectsItems,
  WebsitesList,
} from "@/styles/routes/gifts.styled";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/gifts")({
  // shuffled in the loader so the server and client render the same order
  loader: () => ({ order: shuffledIndexes(ideas.length) }),
  component: GiftComponent,
});

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

// Fisher-Yates shuffle of [0, 1, ..., length - 1]
function shuffledIndexes(length: number) {
  const indexes = Array.from({ length }, (_, i) => i);
  for (let i = length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indexes[i], indexes[j]] = [indexes[j], indexes[i]];
  }
  return indexes;
}

// "From €35" / "€90 each" -> 35 / 90
const parsePrice = (price: string) => {
  const match = price.match(/\d+(\.\d+)?/);
  return match ? Number(match[0]) : Number.POSITIVE_INFINITY;
};

function GiftComponent() {
  const { order } = Route.useLoaderData();
  const [categories, setCategories] = useState<Category[]>([]);
  const [sortOrder, setSortOrder] = useState<SortOrder>("default");

  const shuffledIdeas = useMemo(() => order.map((i) => ideas[i]), [order]);

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

  return (
    <Page>
      <Panel>
        <h1>Gift Ideas</h1>

        <MovieInfo>
          A list of ideas that I&apos;ve been collecting over the years as an Irish person living in Barcelona. Some things may be too niche, but this isn’t targeted at Gen Z or a North American audience, and there are no affiliate links.
        </MovieInfo>

        <SelectsItems>
          <FormSelect<Category>
            id="category"
            name="Category"
            options={categoryOptions}
            placeholder="All"
            value={categories}
            onChange={(value) => setCategories(value as Category[])}
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

        <IdeasGrid>
          {visibleIdeas.map((idea) => (
            <IdeaCard key={idea.name} href={idea.link}>
              {idea.image ? (
                <IdeaImage>
                  <img src={idea.image} alt={idea.name} />
                  {idea.price && <IdeaPrice>{idea.price}</IdeaPrice>}
                </IdeaImage>
              ) : (
                idea.price && <IdeaPrice>{idea.price}</IdeaPrice>
              )}
              <IdeaCategory>{idea.category}</IdeaCategory>
              <h3>{idea.name}</h3>
              {idea.description && <p>{idea.description}</p>}
            </IdeaCard>
          ))}
        </IdeasGrid>

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
