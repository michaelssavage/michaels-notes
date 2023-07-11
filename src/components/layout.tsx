import { ReactNode } from "react";
import styles from "./layout.module.scss";
import { Nav } from "./nav";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <main>
      <Nav />
      <div className={styles.mainContainer}>{children}</div>
    </main>
  );
};
