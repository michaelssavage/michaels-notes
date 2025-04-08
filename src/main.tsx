import { ContentProvider } from "@/context/ContentProvider";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
import { routeTree } from "./routeTree.gen";

// Set up a Router instance
const router = createRouter({
	routeTree,
});

// Register things for typesafety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}
const LazyPostHogProvider = lazy(
	() => import("@/components/atoms/PostHogContainer"),
);

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const rootElement = document.getElementById("root")!;

if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<React.StrictMode>
			<LazyPostHogProvider>
				<ContentProvider>
					<RouterProvider router={router} />
				</ContentProvider>
			</LazyPostHogProvider>
		</React.StrictMode>,
	);
}
