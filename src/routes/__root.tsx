import ErrorBoundary from "@/components/atoms/ErrorBoundary";
import { NotFound } from "@/components/atoms/NotFound";
import { ToastProvider } from "@/components/atoms/ToastContainer";
import Footer from "@/components/molecules/Footer/Footer";
import { Loading } from "@/components/molecules/Loading";
import Navbar from "@/components/molecules/Navbar/Navbar";
import { ThemeProvider } from "@/context/ThemeProvider";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useHead } from "@unhead/react";
import { Suspense } from "react";

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFound,
});

function RootComponent() {
  useHead({ titleTemplate: "%s | Michael Savage" });

  return (
    <ThemeProvider>
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
  );
}
