import { MetaData } from "@/components/MetaData";
import { Navbar } from "@/components/Navbar";
import { PageTransition } from "@/components/PageTransition";
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
        <Navbar />
        <PageTransition>
          <ScrollRestoration />
          <Outlet />
        </PageTransition>
        <TanStackRouterDevtools position="bottom-right" />
      </QueryClientProvider>
    </HelmetProvider>
  );
}
