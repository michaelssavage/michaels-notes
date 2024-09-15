import { Link } from "@tanstack/react-router";
import { RightIcon } from "@/components/icons";
import styles from "./PagePath.module.scss";

interface Props {
  page: string;
  style: string;
}

export const PagePath = ({ page, style }: Props) => {
  return (
    <div className={`${styles.navigator} ${style}`}>
      <Link to="/" className={`extLink ${styles.pageLink}`}>
        home
      </Link>
      <RightIcon />
      <Link to={`/${page}`} className={`extLink ${styles.pageLink}`}>
        {page}
      </Link>
      <RightIcon />
    </div>
  );
};
