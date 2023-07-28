import { MouseEvent } from "react";
import { Github, LinkedIn, Mail } from "components/Icons";
import styles from "./Contacts.module.scss";

const emailAddress = "michaelsavage940@gmail.com";

const copyEmail = (ev: MouseEvent) => {
  ev.preventDefault();
  navigator.clipboard.writeText(emailAddress);
};

export const Contacts = () => {
  return (
    <div className={styles.socials}>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href=""
        onClick={copyEmail}
        className={styles.iconAndText}
      >
        <>
          <Mail />
          <p>Email Me</p>
        </>
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/michaelssavage"
        className={styles.iconAndText}
      >
        <>
          <Github />
          <p>Github</p>
        </>
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://linkedin.com/in/michaelssavage"
        className={styles.iconAndText}
      >
        <>
          <LinkedIn />
          <p>LinkedIn</p>
        </>
      </a>
    </div>
  );
};
