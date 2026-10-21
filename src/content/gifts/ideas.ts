import { GiftCategory } from "@/types/Gift";

type Website = {
  name: string;
  category: GiftCategory;
  url: string;
  description: string;
};

const websites: Website[] = [
  {
    name: "Seven Store",
    category: "clothes",
    url: "https://www.sevenstore.com/",
    description: "clothes",
  },
  {
    name: "Nude Project",
    category: "clothes",
    url: "https://nude-project.com",
    description: "clothes",
  },
  {
    name: "Blacksmith Store",
    category: "clothes",
    url: "https://www.blacksmith-store.com/",
    description: "jumpers",
  },
  {
    name: "Create Store",
    category: "kitchen",
    url: "https://create-store.com",
    description: "crockery",
  },
  {
    name: "Kaotiko",
    category: "clothes",
    url: "https://www.kaotikobcn.com/",
    description: "shoes / tops",
  },
  {
    name: "Twothirds",
    category: "clothes",
    url: "https://Twothirds.com",
    description: "scandinavian tops",
  },
  {
    name: "Fleek Brand",
    category: "clothes",
    url: "https://fleekbrand.com",
    description: "oversized tees",
  },
  {
    name: "Flamingos Life",
    category: "shoes",
    url: "https://flamingoslife.com",
    description: "portuguese shoes",
  },
  {
    name: "Hobibear",
    category: "shoes",
    url: "https://hobibear.es",
    description: "shoes",
  },
  {
    name: "Grow Old",
    category: "clothes",
    url: "https://growoldbcn.com/",
    description: "portuguese tops",
  },
  {
    name: "Ementas B",
    category: "clothes",
    url: "https://ementasb.com/",
    description: "portuguese tops",
  },
  {
    name: "Els Ximplets",
    category: "clothes",
    url: "https://elsximplets.com/",
    description: "Funny Catalan tops",
  },
  {
    name: "Vasha",
    category: "clothes",
    url: "https://vasha.live",
    description: "catalan tops",
  },
  {
    name: "Casa Pampa",
    category: "home",
    url: "https://casapampa.net",
    description: "creative plants",
  },
  {
    name: "Posthog",
    category: "clothes",
    url: "https://posthog.com/merch",
    description: "merch",
  },
  {
    name: "Hollister",
    category: "clothes",
    url: "https://hollister.com",
    description: "clothes",
  },
  {
    name: "P&Co",
    category: "clothes",
    url: "https://pand.co/",
    description: "clothes",
  },
  {
    name: "Beetle Moses",
    category: "books",
    url: "https://beetlemoses.bigcartel.com/",
    description: "comic strips",
  },
  {
    name: "Patagonia",
    category: "clothes",
    url: "https://www.patagonia.com/home/",
    description: "clothes",
  },

  {
    name: "Afends",
    category: "food & drink",
    url: "https://afends.com/",
    description: "Australian lifestyle brand",
  },

  {
    name: "G Adventures",
    category: "travel",
    url: "https://www.gadventures.com/",
    description: "travel groups",
  },

  {
    name: "Last Minute",
    category: "travel",
    url: "https://www.lastminute.com/",
    description: "cheap travel packages",
  },

  {
    name: "Sunny Souls",
    category: "clothes",
    url: "https://sunnysouls.ie/",
    description: "Marino wool gilets",
  },
];

export { websites };
