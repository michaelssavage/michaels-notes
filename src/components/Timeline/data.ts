export interface TimelineProps {
  text: string;
  date: string;
  category?: {
    tag: string;
    color: string;
  };
  link?: {
    url: string;
    text: string;
  };
}

const techColor = "#419989";
const sportColor = "#4045b4";

export const data: TimelineProps[] = [
  {
    text: "Received 4 Resident Advisor Top Picks for Plant Bass'd events.",
    date: "2022",
    link: {
      url: "https://ra.co/promoters/103854",
      text: "Read more",
    },
  },
  {
    text: "Earned the Professional Scrum Master™ I (PSM I) certificate.",
    date: "2022",
    category: {
      tag: "Tech",
      color: techColor,
    },
  },
  {
    text: "Successfully completed the Jaguar Land Rover Graduate Program.",
    date: "2022",
    category: {
      tag: "Tech",
      color: techColor,
    },
  },
  {
    text: "Graduated with a 1.1 in Bsc. in Computer Applications from Dublin City University.",
    date: "2021",
  },
  {
    text: "Won best group research paper in 4th year on the topic of Global Software Engineering.",
    date: "2021",
    category: {
      tag: "Tech",
      color: techColor,
    },
  },
  {
    text: "Climbed Carrauntoohil, Croagh Patrick, and cycled from Monaghan to Galway.",
    date: "2020",
  },
  {
    text: "Winners of the Monaghan Senior Football Championship with Clontibret O'Neills.",
    date: "2019",
    category: {
      tag: "Sport",
      color: sportColor,
    },
  },
  {
    text: "Successfully completed the DCU Mentoring Programme 2018-2019 and was shortlisted for best Reflect Portfolio as part of the programme.",
    date: "2019",
  },
  {
    text: "Winners of the Nutty Crust Tournament, and Ulster Rugby Divison 1. League & Cup with Armagh Rugby Club u18's.",
    date: "2017",
    category: {
      tag: "Sport",
      color: sportColor,
    },
  },
  {
    text: "Successfully completed the DCU Mentoring Programme 2018-2019 and was shortlisted for best Reflect Portfolio as part of the programme.",
    date: "2017",
  },
  {
    text: "Represented Ulster Club Rugby u18s by starting at no.11 in the Inter-Provincial series.",
    date: "2015",
    category: {
      tag: "Sport",
      color: sportColor,
    },
  },
];
