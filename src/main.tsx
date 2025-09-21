import PostHogProvider from "@/components/atoms/PostHogContainer";
import { ContentProvider } from "@/context/ContentProvider";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import React from "react";
import ReactDOM from "react-dom/client";
import { routeTree } from "./routeTree.gen";

const router = createRouter({
  scrollRestoration: true,
  routeTree,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// biome-ignore lint/style/noNonNullAssertion: is root
const rootElement = document.getElementById("root")!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <PostHogProvider>
        <ContentProvider>
          <RouterProvider router={router} />
        </ContentProvider>
      </PostHogProvider>
    </React.StrictMode>,
  );
}
