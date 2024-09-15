import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { HelmetProvider } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { MetaData } from "@/components/MetaData";
import { PageTransition } from "@/components/PageTransition";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <HelmetProvider>
      <MetaData />
      <Navbar />
      <PageTransition>
        <Outlet />
      </PageTransition>
      <TanStackRouterDevtools position="bottom-right" />
    </HelmetProvider>
  );
}
