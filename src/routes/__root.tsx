import ErrorBoundary from "@/components/atoms/ErrorBoundary";
import { MetaData } from "@/components/atoms/MetaData";
import { NotFound } from "@/components/atoms/NotFound";
import { ToastProvider } from "@/components/atoms/ToastContainer";
import Footer from "@/components/molecules/Footer/Footer";
import { Loading } from "@/components/molecules/Loading";
import Navbar from "@/components/molecules/Navbar/Navbar";
import { ThemeProvider } from "@/context/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFound,
});

function RootComponent() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <MetaData />
          <ToastProvider />
          <Navbar />

          <ErrorBoundary>
            <Suspense fallback={<Loading />}>
              <Outlet />
            </Suspense>
          </ErrorBoundary>
          <Footer />
          <TanStackRouterDevtools position="top-right" />
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}
