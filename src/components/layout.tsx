import Link from "next/link";
import { ReactNode } from "react";
import { MiddleLeft, MiddleRight, TopLeft, TopRight } from "components/blobs";
import styles from "./layout.module.scss";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <main className={styles.main}>
      <div className={styles.topLeftTriangle}>
        <Link href="/about">
          <TopLeft />
        </Link>
      </div>

      <div className={styles.middleLeftTriangle}>
        <Link href="/interests">
          <MiddleLeft />
        </Link>
      </div>

      <div className={styles.middleRightTriangle}>
        <Link href="/cv">
          <MiddleRight />
        </Link>
      </div>

      <div className={styles.topRightTriangle}>
        <Link href="/projects">
          <TopRight />
        </Link>
      </div>

      <div className={styles.mainContainer}>{children}</div>
    </main>
  );
};
