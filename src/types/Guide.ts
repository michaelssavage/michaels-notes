export const GUIDE_TAGS = {
  FREE: "free",
  FREE_1ST_SUNDAY: "free-1st-sunday",
  FREE_EVERY_SUNDAY_11AM: "free-every-sunday-11am",
  FREE_AFTER_SUNDAY_3PM: "free-after-sunday-3pm",
  FREE_AFTER_SATURDAY_3PM: "free-after-saturday-3pm",
  FREE_AFTER_SATURDAY_4PM: "free-after-saturday-4pm",

  NATURE: "nature",
  LIVE_MUSIC: "live-music",
  DAY_TRIP: "day-trip",
  EXPENSIVE: "expensive",
  CANT_MISS: "cant-miss",
  WINTER: "winter",
  CASH_ONLY: "cash-only",
  LIVING_WORLD: "living-world",
  RELAXING: "relaxing",
} as const;

export type GuideTag = (typeof GUIDE_TAGS)[keyof typeof GUIDE_TAGS];

export const GUIDE_TYPES = {
  PLACE: "place",
  ACTIVITY: "activity",
  FUN: "fun",
  MUSIC: "music",
} as const;

export type GuideType = (typeof GUIDE_TYPES)[keyof typeof GUIDE_TYPES];

export interface GuideTableItem {
  id: string;
  title: string;
  location: string;
  link: string;
  price: string;
  image: string;
  description: string;
  tags: Array<GuideTag>;
  type: GuideType;
  coordinates?: { lat: number; lng: number };
}

export const TAG_META: Record<string, { label: string; priority?: number }> = {
  [GUIDE_TAGS.FREE]: { label: "Free", priority: 1 },
  [GUIDE_TAGS.FREE_1ST_SUNDAY]: { label: "Free 1st Sunday" },
  [GUIDE_TAGS.FREE_EVERY_SUNDAY_11AM]: { label: "Free every Sunday 11am" },
  [GUIDE_TAGS.FREE_AFTER_SUNDAY_3PM]: { label: "Free after Sunday 3pm" },
  [GUIDE_TAGS.FREE_AFTER_SATURDAY_3PM]: { label: "Free after Saturday 3pm" },
  [GUIDE_TAGS.FREE_AFTER_SATURDAY_4PM]: { label: "Free after Saturday 4pm" },

  [GUIDE_TAGS.NATURE]: { label: "Nature" },
  [GUIDE_TAGS.LIVE_MUSIC]: { label: "Live Music" },
  [GUIDE_TAGS.DAY_TRIP]: { label: "Day Trip" },
  [GUIDE_TAGS.EXPENSIVE]: { label: "Expensive" },
  [GUIDE_TAGS.CANT_MISS]: { label: "Can't Miss", priority: 0 },
  [GUIDE_TAGS.WINTER]: { label: "Winter" },
  [GUIDE_TAGS.CASH_ONLY]: { label: "Cash Only" },
  [GUIDE_TAGS.LIVING_WORLD]: { label: "Living World" },
  [GUIDE_TAGS.RELAXING]: { label: "Relaxing" },
};
