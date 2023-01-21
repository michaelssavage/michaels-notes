import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { Home } from "components/Home";
import { Layout } from "components/Layout";
import { Interests } from "components/Interests";
import { XyzTransition } from "@animxyz/react";

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
        <XyzTransition appear xyz="fade in-left-100% out-right-100%" mode="out-in">
          <Routes>
            <Route element={<Layout />} path="/">
              <Route element={<Home />} index />
              <Route element={<Interests />} path="interests" />
            </Route>
          </Routes>
        </XyzTransition>
      </NotificationsProvider>
    </MantineProvider>
  </BrowserRouter>
);
