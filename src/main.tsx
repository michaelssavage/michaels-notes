import * as React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Navbar } from "components/Navbar";
import "styling/index.scss";
import { Home } from "components/Home";
import { Layout } from "components/Layout";

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Layout>
        <Home />
      </Layout>
    </BrowserRouter>
  </React.StrictMode>
);
