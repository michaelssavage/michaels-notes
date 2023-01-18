import { Outlet } from "react-router-dom";
import { Navbar } from "components/Layout";

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
