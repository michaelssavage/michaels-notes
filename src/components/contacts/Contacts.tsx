import { MouseEvent } from "react";
import Link from "next/link";
import { Github, LinkedIn, Mail } from "components/icons";
import styles from "./contacts.module.scss";

const emailAddress = "michaelsavage940@gmail.com";

const copyEmail = (ev: MouseEvent) => {
  ev.preventDefault();
  navigator.clipboard.writeText(emailAddress);
};

export const Contacts = () => {
  return (
    <div className={styles.socials}>
      <Link href="" onClick={copyEmail} className={styles.iconAndText}>
        <Mail />
        <p>Email Me</p>
      </Link>
      <Link
        href="https://github.com/michaelssavage"
        className={styles.iconAndText}
      >
        <Github />
        <p>Github</p>
      </Link>
      <Link
        href="https://linkedin.com/in/michaelssavage"
        className={styles.iconAndText}
      >
        <LinkedIn />
        <p>LinkedIn</p>
      </Link>
    </div>
  );
};
