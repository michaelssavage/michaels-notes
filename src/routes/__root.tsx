import { MetaData } from "@/components/atoms";
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
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

const TanStackRouterDevtools =
	process.env.NODE_ENV === "production"
		? () => null
		: lazy(() =>
				import("@tanstack/router-devtools").then((res) => ({
					default: res.TanStackRouterDevtools,
				})),
			);

const Navbar = lazy(() =>
	import("@/components/molecules/Toggle").then((module) => ({
		default: module.Toggle,
	})),
);

const Toggle = lazy(() =>
	import("@/components/molecules/Navbar").then((module) => ({
		default: module.Navbar,
	})),
);

const Footer = lazy(() =>
	import("@/components/molecules/Footer").then((module) => ({
		default: module.Footer,
	})),
);

export const Route = createRootRoute({
	component: RootComponent,
});

function RootComponent() {
	return (
		<HelmetProvider>
			<QueryClientProvider client={queryClient}>
				<Suspense fallback={<Loading />}>
					<MetaData />
					<ToastContainer />
					<ThemeProvider>
						<Navbar />
						<Toggle />
						<ScrollRestoration />
						<Outlet />
						<Footer />
						<TanStackRouterDevtools position="bottom-right" />
					</ThemeProvider>
				</Suspense>
			</QueryClientProvider>
		</HelmetProvider>
	);
}
