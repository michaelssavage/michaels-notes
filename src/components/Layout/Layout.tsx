import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

export const Layout = () => {
  return (
    <>
      <Navbar />
      <main style={{ margin: "0 10%" }}>
        <Outlet />
      </main>
    </>
  );
};
