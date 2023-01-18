import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { Resume } from "components/Resume";
import { Home } from "components/Home";
import { Layout } from "components/Layout";
import { Interests } from "components/Interests";

export const App = () => (
  <BrowserRouter>
    <MantineProvider
      theme={{
        fontFamily: "Open Sans, sans serif",
        spacing: { xs: 15, sm: 20, md: 25, lg: 30, xl: 40 },
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      <NotificationsProvider position="top-center" zIndex={100}>
        <Routes>
          <Route element={<Layout />} path="/">
            <Route element={<Home />} index />
            <Route element={<Interests />} path="interests" />
            <Route element={<Resume />} path="resume" />
          </Route>
        </Routes>
      </NotificationsProvider>
    </MantineProvider>
  </BrowserRouter>
);
