export interface GuideTableItem {
  title: string;
  type: "Fun" | "Activity" | "Place" | "Music";
  location: string;
  link: string;
  price?: string;
  tags?: Array<
    | "Free"
    | "Expensive"
    | "Free 1st Sunday"
    | "Free every Sunday 11am"
    | "Free after Saturday 3pm"
    | "Free after Saturday 4pm"
    | "Can't Miss"
    | "Stamp of Approval"
    | "Winter"
    | "Day Trip"
    | "Cash only"
  >;
  description?: string;
}
