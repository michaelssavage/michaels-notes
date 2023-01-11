import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { CV } from "components/CV";
import { Home } from "components/Home";
import { Layout } from "components/Layout";

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
      <Routes>
        <Route element={<Layout />} path="/">
          <Route element={<Home />} index />
          <Route element={<CV />} path="cv" />
        </Route>
      </Routes>
    </MantineProvider>
  </BrowserRouter>
);
