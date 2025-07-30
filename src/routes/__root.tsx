import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import { MetaData } from "@/components/atoms";
import ErrorBoundary from "@/components/atoms/ErrorBoundary";
import { NotFound } from "@/components/atoms/NotFound";
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
const LazyToastContainer = lazy(
	() => import("@/components/atoms/ToastContainer"),
);

export const Route = createRootRoute({
	component: RootComponent,
	notFoundComponent: NotFound,
});

function RootComponent() {
	return (
		<HelmetProvider>
			<QueryClientProvider client={queryClient}>
				<MetaData />

				<Suspense fallback={null}>
					<LazyToastContainer />
				</Suspense>

				<ThemeProvider>
					<Navbar />
					<Toggle />

					<ErrorBoundary>
						<Suspense fallback={<Loading />}>
							<Outlet />
						</Suspense>
					</ErrorBoundary>
					<Footer />
					<TanStackRouterDevtools position="bottom-right" />
				</ThemeProvider>
			</QueryClientProvider>
		</HelmetProvider>
	);
}
