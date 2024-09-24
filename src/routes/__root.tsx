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
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();

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
          <TanStackRouterDevtools position="bottom-right" />
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}
