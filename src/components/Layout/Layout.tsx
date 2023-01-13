import { Outlet } from "react-router-dom";
import { NotificationsProvider } from "@mantine/notifications";
import { Navbar } from "./Navbar";

export const Layout = () => {
  return (
    <NotificationsProvider>
      <Navbar />
      <main style={{ margin: "0 5%" }}>
        <Outlet />
      </main>
    </NotificationsProvider>
  );
};
