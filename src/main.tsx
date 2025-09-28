import PostHogProvider from "@/components/atoms/PostHogContainer";
import { ContentProvider } from "@/context/ContentProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { createHead, UnheadProvider } from "@unhead/react/client";
import React from "react";
import ReactDOM from "react-dom/client";
import { routeTree } from "./routeTree.gen";

const head = createHead();
const queryClient = new QueryClient();
const router = createRouter({
  scrollRestoration: true,
  routeTree,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root")!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <UnheadProvider head={head}>
        <QueryClientProvider client={queryClient}>
          <PostHogProvider>
            <ContentProvider>
              <RouterProvider router={router} />
            </ContentProvider>
          </PostHogProvider>
        </QueryClientProvider>
      </UnheadProvider>
    </React.StrictMode>
  );
}
