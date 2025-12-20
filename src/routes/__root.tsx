/// <reference types="vite/client" />
import { NotFound } from "@/components/atoms/NotFound";
import PostHogProvider from "@/components/atoms/PostHogContainer";
import { ToastProvider } from "@/components/atoms/ToastContainer";
import Footer from "@/components/molecules/Footer/Footer";
import Navbar from "@/components/molecules/Navbar/Navbar";
import { ContentProvider } from "@/context/ContentProvider";
import { ThemeProvider } from "@/context/ThemeProvider";
import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { title: "Michael Savage" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { property: "og:title", content: "Michael Savage" },
      { name: "robots", content: "index,follow" },
      { name: "author", content: "Michael Savage" },
      { name: "description", content: "Personal website of Michael Savage" },
      { property: "og:site_name", content: "Michael Savage" },
      { property: "og:image", content: "/images/me.jpg" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://michaelsavage.com" },
      {
        property: "og:description",
        content: "Personal website of Michael Savage",
      },
      { name: "theme-color", content: "#FFFCF8" },
      { name: "apple-mobile-web-app-title", content: "Notes" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Mona+Sans:ital,wght@0,200..900;1,200..900&display=swap",
      },
      {
        rel: "icon",
        type: "image/png",
        href: "/favicon-96x96.png",
        sizes: "96x96",
      },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "shortcut icon", href: "/favicon.ico" },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
    ],
  }),
  notFoundComponent: NotFound,
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <PostHogProvider>
        <ContentProvider>
          <ToastProvider />
          {children}
        </ContentProvider>
      </PostHogProvider>
    </ThemeProvider>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>

        <ReactQueryDevtools position="bottom" />
        <Scripts />
      </body>
    </html>
  );
}
