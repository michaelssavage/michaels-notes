import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { CV } from "components/CV";
import { Home } from "components/Home";
import { Layout } from "components/Layout";
import { Interests } from "components/Interests";
import { Projects } from "components/Projects";

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
            <Route element={<CV />} path="cv" />
            <Route element={<Interests />} path="interests" />
            <Route element={<Projects />} path="projects" />
          </Route>
        </Routes>
      </NotificationsProvider>
    </MantineProvider>
  </BrowserRouter>
);
