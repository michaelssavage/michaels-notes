import { MetaData } from "@/components/atoms";
import ErrorBoundary from "@/components/atoms/ErrorBoundary";
import { NotFound } from "@/components/atoms/NotFound";
import { Loading } from "@/components/molecules/Loading";
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
				})),
			);

const Toggle = lazy(() => import("@/components/molecules/Toggle/Toggle"));
const Navbar = lazy(() => import("@/components/molecules/Navbar/Navbar"));
const Footer = lazy(() => import("@/components/molecules/Footer/Footer"));
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
				<Suspense fallback={<Loading />}>
					<MetaData />
					<LazyToastContainer />
					<ThemeProvider>
						<Navbar />
						<Toggle />
						<ScrollRestoration />
						<ErrorBoundary>
							<Outlet />
						</ErrorBoundary>
						<Footer />
						<TanStackRouterDevtools position="bottom-right" />
					</ThemeProvider>
				</Suspense>
			</QueryClientProvider>
		</HelmetProvider>
	);
}
