import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import ErrorBoundary from "@/components/atoms/ErrorBoundary";
import { MetaData } from "@/components/atoms/MetaData";
import { NotFound } from "@/components/atoms/NotFound";
import { ToastProvider } from "@/components/atoms/ToastContainer";
import Footer from "@/components/molecules/Footer/Footer";
import { Loading } from "@/components/molecules/Loading";
import Navbar from "@/components/molecules/Navbar/Navbar";
import { ThemeProvider } from "@/context/ThemeProvider";

const queryClient = new QueryClient();

const TanStackRouterDevtools =
	process.env.NODE_ENV === "production"
		? () => null
		: lazy(() =>
				import("@tanstack/router-devtools").then((res) => ({
					default: res.TanStackRouterDevtools,
				})),
			);

const Toggle = lazy(() => import("@/components/molecules/Toggle/Toggle"));

export const Route = createRootRoute({
	component: RootComponent,
	notFoundComponent: NotFound,
});

function RootComponent() {
	return (
		<HelmetProvider>
			<QueryClientProvider client={queryClient}>
				<MetaData />

				<ToastProvider />

				<ThemeProvider>
					<Navbar />
					<Toggle />

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
