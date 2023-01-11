import { Outlet } from "react-router-dom";
import styles from "./layout.module.scss";
import { Navbar } from "../Navbar";

export const Layout = () => {
  return (
    <>
      <Navbar />
      <main className={styles.layout}>
        <Outlet />
      </main>
    </>
  );
};
