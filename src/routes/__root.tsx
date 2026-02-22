/// <reference types="vite/client" />
import { Layout } from "@/components/atoms/Layout";
import { NotFound } from "@/components/atoms/NotFound";
import PostHogProvider from "@/components/atoms/PostHogContainer";
import { TextBleed } from "@/components/atoms/TextBleed";
import { ToastProvider } from "@/components/atoms/ToastContainer";
import { Feedback } from "@/components/molecules/Feedback/Feedback";
import Footer from "@/components/molecules/Footer/Footer";
import Navbar from "@/components/molecules/Navbar/Navbar";
import { ContentProvider } from "@/context/ContentProvider";
import { ThemeProvider } from "@/context/ThemeProvider";
import { checkAuthFn } from "@/server/auth/check.api";
import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { StrictMode } from "react";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  beforeLoad: async () => {
    try {
      await checkAuthFn();
      return { isAdmin: true };
    } catch {
      return { isAdmin: false };
    }
  },
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
      { property: "og:image", content: "/portrait.jpg" },
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

const instagramDebugScript = `
(function () {
  if (!/Instagram/i.test(navigator.userAgent)) return;

  function renderDebug(message, stack) {
    var pre = document.createElement("pre");
    pre.setAttribute(
      "style",
      "position:fixed;inset:0;z-index:2147483647;margin:0;padding:20px;background:#111;color:#fff;font-size:12px;line-height:1.4;white-space:pre-wrap;overflow:auto;"
    );
    pre.textContent = String(message || "Unknown error") + "\\n\\n" + String(stack || "");

    if (document.body) {
      document.body.innerHTML = "";
      document.body.appendChild(pre);
      return;
    }

    document.documentElement.appendChild(pre);
  }

  window.onerror = function (msg, src, line, col, err) {
    renderDebug(
      String(msg) + "\\n" + String(src) + ":" + String(line) + ":" + String(col),
      err && err.stack ? err.stack : ""
    );
    return false;
  };

  window.onunhandledrejection = function (event) {
    var reason = event && event.reason ? event.reason : "Unhandled promise rejection";
    var stack = reason && reason.stack ? reason.stack : "";
    renderDebug(reason, stack);
  };

  window.addEventListener(
    "error",
    function (event) {
      if (!event || !event.message) return;
      renderDebug(
        String(event.message) +
          "\\n" +
          String(event.filename || "") +
          ":" +
          String(event.lineno || "") +
          ":" +
          String(event.colno || ""),
        event.error && event.error.stack ? event.error.stack : ""
      );
    },
    true
  );
})();
`;

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: instagramDebugScript }} />
        <HeadContent />
      </head>
      <body>
        <StrictMode>
          <Providers>
            <Navbar />
            <TextBleed />
            <Layout>{children}</Layout>
            <Feedback />
            <Footer />
          </Providers>
        </StrictMode>

        <ReactQueryDevtools buttonPosition="bottom-left" />
        <Scripts />
      </body>
    </html>
  );
}
