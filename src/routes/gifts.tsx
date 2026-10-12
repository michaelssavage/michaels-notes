import { Group } from "@/components/atoms/Group";
import { FormSelect } from "@/components/form/molecules/FormSelect";
import { Anchor } from "@/components/molecules/Anchor";
import {
  Category,
  categoryOptions,
  ideas,
  websites,
} from "@/content/gifts/ideas";
import { Page, Panel } from "@/styles/routes/blog.styled";
import {
  IdeaCard,
  IdeaCategory,
  IdeaImage,
  IdeaPrice,
  IdeasGrid,
  WebsitesList,
} from "@/styles/routes/gifts.styled";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/gifts")({
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

// "From €35" / "€90 each" -> 35 / 90
const parsePrice = (price: string) => {
  const match = price.match(/\d+(\.\d+)?/);
  return match ? Number(match[0]) : Number.POSITIVE_INFINITY;
};

function GiftComponent() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [sortOrder, setSortOrder] = useState<SortOrder>("default");

  const visibleIdeas = useMemo(() => {
    const filtered =
      categories.length === 0
        ? ideas
        : ideas.filter((idea) => categories.includes(idea.category));

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
  }, [categories, sortOrder]);

  return (
    <Page>
      <Panel>
        <h1>Gift Guide</h1>

        <h2>Ideas</h2>

        <Group gap="1rem" margin="0 0 1rem">
          <FormSelect<Category>
            id="category"
            name="Category"
            options={categoryOptions}
            placeholder="All categories"
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
        </Group>

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
