import { Group, Text } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import styles from "./navbar.module.scss";

interface NavItemProps {
  href: string;
  name: string;
}

const NavItem = ({ href, name }: NavItemProps) => {
  const router = useLocation();
  return (
    <Link to={href} className={router.pathname === href ? styles.navActive : styles.navItem}>
      <Text fz="lg">{name}</Text>
    </Link>
  );
};

export const Navbar = () => {
  return (
    <nav className={styles.container}>
      <Group position="apart">
        <NavItem href="/" name="Home" />
        <NavItem href="/interests" name="Interests" />
      </Group>
    </nav>
  );
};
