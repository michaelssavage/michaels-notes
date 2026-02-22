/// <reference types="vite/client" />
import { Layout } from "@/components/atoms/Layout";
import { NotFound } from "@/components/atoms/NotFound";
import { TextBleed } from "@/components/atoms/TextBleed";
import { ToastProvider } from "@/components/atoms/ToastContainer";
import { Feedback } from "@/components/molecules/Feedback/Feedback";
import Footer from "@/components/molecules/Footer/Footer";
import Navbar from "@/components/molecules/Navbar/Navbar";
import { ContentProvider } from "@/context/ContentProvider";
import PostHogProvider from "@/context/PostHogContainer";
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
      const { authenticated } = await checkAuthFn();
      return { isAdmin: authenticated };
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

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function () {
  if (!/Instagram/i.test(navigator.userAgent)) return;

  var logs = [];

  function serialize(val) {
    if (val === null) return "null";
    if (val === undefined) return "undefined";
    var type = typeof val;
    if (type === "string") return val;
    if (type === "number" || type === "boolean") return String(val);
    try {
      var obj = {
        type: type,
        constructor: val && val.constructor && val.constructor.name,
        message: val && val.message,
        status: val && val.status,
        statusText: val && val.statusText,
        stack: val && val.stack,
        keys: val ? Object.keys(val) : [],
        json: JSON.stringify(val, null, 2),
      };
      return JSON.stringify(obj, null, 2);
    } catch (e) {
      return "serialize failed: " + e.message;
    }
  }

  function render() {
    var existing = document.getElementById("__debug_overlay");
    if (existing) existing.remove();

    var pre = document.createElement("pre");
    pre.id = "__debug_overlay";
    pre.style.cssText = [
      "position:fixed",
      "inset:0",
      "z-index:2147483647",
      "margin:0",
      "padding:16px",
      "background:#0a0a0a",
      "color:#00ff88",
      "font-size:11px",
      "line-height:1.5",
      "white-space:pre-wrap",
      "overflow:auto",
      "font-family:monospace",
    ].join(";");
    pre.textContent = logs.join("\\n\\n---\\n\\n");
    var target = document.body || document.documentElement;
    if (target) target.appendChild(pre);
  }

  function log(label, val, stack) {
    var entry = "[" + label + "]\\n" + serialize(val);
    if (stack) entry += "\\n\\nSTACK:\\n" + stack;
    logs.push(entry);
    render();
  }

  // Catch sync errors
  window.onerror = function (msg, src, line, col, err) {
    log("onerror", {
      message: msg,
      source: src,
      line: line,
      col: col,
    }, err && err.stack);
    return false;
  };

  // Catch unhandled promise rejections
  window.addEventListener("unhandledrejection", function (event) {
    log("unhandledrejection", event.reason, event.reason && event.reason.stack);
  });

  // Catch all errors in capture phase
  window.addEventListener("error", function (event) {
    log("error event", {
      message: event.message,
      filename: event.filename,
      line: event.lineno,
      col: event.colno,
    }, event.error && event.error.stack);
  }, true);

  // Log basic env info immediately
  log("env", {
    ua: navigator.userAgent,
    matchMedia: typeof window.matchMedia,
    sessionStorage: (function() { try { sessionStorage.setItem("t","1"); sessionStorage.removeItem("t"); return "ok"; } catch(e) { return "blocked: " + e.message; } })(),
    localStorage: (function() { try { localStorage.setItem("t","1"); localStorage.removeItem("t"); return "ok"; } catch(e) { return "blocked: " + e.message; } })(),
    performance: typeof window.performance,
    crypto: typeof window.crypto,
    fetch: typeof window.fetch,
  }, null);
})();
`,
          }}
        />
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
