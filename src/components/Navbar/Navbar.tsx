import { Link, useLocation } from "react-router-dom";
import { Card } from "@mantine/core";
import styles from "./navbar.module.scss";

interface NavItemProps {
  href: string;
  name: string;
}

const NavItem = ({ href, name }: NavItemProps) => {
  const router = useLocation();
  return (
    <Link href={href} className={router.pathname === href ? styles.navActive : styles.navItem}>
      {name}
    </Link>
  );
};

export const Navbar = () => {
  return (
    <div className={styles.container}>
      <nav>
        <div className={styles.navItems}>
          <NavItem href="/" name="Home" />
          <NavItem href="/interests" name="Interests" />
          <NavItem href="/projects" name="Projects" />
          <NavItem href="/cv" name="CV" />
        </div>
        <Card shadow="sm" p="lg" radius="md" withBorder className={styles.spotifyListening}>
          What am I listening too?
        </Card>
      </nav>
    </div>
  );
};
