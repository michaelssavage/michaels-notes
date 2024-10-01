import { Navbar } from "@/components/Navbar";
import { Toggle } from "@/components/Toggle";
import { MetaData, PageTransition } from "@/components/atoms";
import { ThemeProvider } from "@/context/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  ScrollRestoration,
  createRootRoute,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();

const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null
    : lazy(() =>
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
        }))
      );

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <MetaData />
        <ThemeProvider>
          <Navbar />
          <Toggle />
          <PageTransition>
            <ScrollRestoration />
            <Outlet />
          </PageTransition>
          <Suspense>
            <TanStackRouterDevtools position="bottom-right" />
          </Suspense>
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}
