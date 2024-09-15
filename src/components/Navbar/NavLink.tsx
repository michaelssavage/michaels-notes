import { Link } from "@tanstack/react-router";
import styles from "./Navbar.module.scss";

interface Props {
  to: string;
  text: string;
}

export const NavLink = ({ to, text }: Props) => {
  return (
    <Link
      to={to}
      activeProps={{
        className: styles.active,
      }}
    >
      {text}
    </Link>
  );
};
