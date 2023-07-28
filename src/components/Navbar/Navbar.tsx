import Link from "next/link";
import { usePathname } from "next/navigation";
import { isActiveLink } from "utils/IsActiveLink";
import styles from "./Navbar.module.scss";

const navLinks: { href: string; name: string }[] = [
  { href: "/blog", name: "Blog" },
  { href: "/projects", name: "Projects" },
  { href: "/", name: "Home" },
];

export const Navbar = () => {
  const pathName = usePathname();
  return (
    <nav className={styles.container}>
      <div>
        {navLinks.map(({ name, href }) => {
          return (
            <Link
              key={name}
              href={href}
              className={
                isActiveLink(href, pathName) ? styles.navActive : styles.navItem
              }
            >
              <p>{name}</p>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
