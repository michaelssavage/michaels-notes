import { useEffect, useState } from "react";
import { sortByDate } from "utils/sortByDate";
import styles from "./Timeline.module.scss";
import { data, TimelineProps } from "./data";

export const Timeline = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? (
    data.length > 0 && (
      <div className={styles.timelineContainer}>
        {data.sort(sortByDate).map((item, idx) => (
          <TimelineItem {...item} key={idx} />
        ))}
      </div>
    )
  ) : (
    <></>
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
