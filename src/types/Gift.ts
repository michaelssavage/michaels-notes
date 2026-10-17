export const GIFT_CATEGORIES = [
  "accessories",
  "beauty",
  "books",
  "clothes",
  "experience",
  "food & drink",
  "football",
  "fragrance",
  "games",
  "home",
  "jewellery",
  "kitchen",
  "shoes",
  "subscription",
  "tech",
  "travel",
] as const;

export type GiftCategory = (typeof GIFT_CATEGORIES)[number];

export const giftCategoryOptions = GIFT_CATEGORIES.map((value) => ({
  value,
  label: value.charAt(0).toUpperCase() + value.slice(1),
}));

export type Gift = {
  id: string;
  name: string;
  category: GiftCategory;
  link: string;
  image: string;
  price: string;
  description: string;
};
