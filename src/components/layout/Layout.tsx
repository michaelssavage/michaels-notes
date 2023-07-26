/* eslint-disable id-length */
import { ReactNode } from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import styles from "./Layout.module.scss";

interface LayoutProps {
  children: ReactNode;
  title: string;
}

const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
};

export const Layout = ({ children, title }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <motion.main
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        transition={{ type: "linear" }}
        className={styles.mainContainer}
      >
        {children}
      </motion.main>
    </>
  );
};
