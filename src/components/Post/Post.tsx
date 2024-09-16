import type { IBlog } from "@/types/Post";
import { Anchor } from "../Anchor";
import { ExternalLinkIcon } from "../icons";
import styles from "./Post.module.scss";

export const Post = ({ title, date, description, external, slug }: IBlog) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardInfo}>
        <div className={styles.o1}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.date}>{date}</p>
        </div>
        <div className={styles.o2}>
          {external ? (
            <Anchor
              link={external}
              icon={<ExternalLinkIcon />}
              text="Read More"
              style={{ width: "10rem" }}
              external
            />
          ) : (
            <Anchor text="Read More" link={slug} style={{ width: "10rem" }} />
          )}
        </div>
      </div>
      <p className={styles.description}>{description}</p>
    </div>
  );
};
