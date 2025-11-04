export type GuideTags =
  | "Free"
  | "Expensive"
  | "Free 1st Sunday"
  | "Free every Sunday 11am"
  | "Free after Sunday 3pm"
  | "Free after Saturday 3pm"
  | "Free after Saturday 4pm"
  | "Can't Miss"
  | "Stamp of Approval"
  | "Winter"
  | "Day Trip"
  | "Cash only"
  | "Live Music";

export interface GuideTableItem {
  title: string;
  type: "Fun" | "Activity" | "Place" | "Music";
  location: string;
  link: string;
  price: string;
  tags: Array<GuideTags>;
  image: string;
  description?: string;
}
