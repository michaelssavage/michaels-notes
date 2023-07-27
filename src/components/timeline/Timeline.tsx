import styles from "./Timeline.module.scss";

interface TimelineProps {
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

const data: TimelineProps[] = [
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
      color: "#018f69",
    },
  },
  {
    text: "Successfully completed the Jaguar Land Rover Graduate Program.",
    date: "December 2022",
    category: {
      tag: "Tech",
      color: "#018f69",
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
      color: "#018f69",
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
      color: "#62018f",
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
      color: "#62018f",
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
      color: "#62018f",
    },
  },
];

export const Timeline = () => {
  return (
    data.length > 0 && (
      <div className={styles.timelineContainer}>
        {data.map((item, idx) => (
          <TimelineItem {...item} key={idx} />
        ))}
      </div>
    )
  );
};

const TimelineItem = ({ text, category, date, link }: TimelineProps) => {
  return (
    <div className={styles.timelineItem}>
      <div className={styles.itemContent}>
        {category && (
          <span className={styles.tag} style={{ background: category.color }}>
            {category.tag}
          </span>
        )}
        <time>{date}</time>
        <p>{text}</p>
        {link && (
          <a href={link.url} target="_blank" rel="noopener noreferrer">
            {link.text}
          </a>
        )}
        <span className={styles.circle} />
      </div>
    </div>
  );
};
