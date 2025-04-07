import { RouterProvider, createRouter } from "@tanstack/react-router";
import ReactDOM from "react-dom/client";
import { routeTree } from "./routeTree.gen";
import "highlight.js/styles/monokai.css";
import "react-toastify/dist/ReactToastify.min.css";
import { ContentProvider } from "@/context/ContentProvider";
import { PostHogProvider } from "posthog-js/react";
import React from "react";

const isDevelopment = import.meta.env.DEV;

const options = {
	api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
	autocapture: !isDevelopment,
	capture_pageview: !isDevelopment,
	disable_session_recording: isDevelopment,
	opt_out_capturing_by_default: isDevelopment,
};

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

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const rootElement = document.getElementById("root")!;

if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<React.StrictMode>
			<PostHogProvider
				apiKey={
					isDevelopment ? "" : import.meta.env.VITE_PUBLIC_POSTHOG_KEY || ""
				}
				options={options}
			>
				<ContentProvider>
					<RouterProvider router={router} />
				</ContentProvider>
			</PostHogProvider>
		</React.StrictMode>,
	);
}
