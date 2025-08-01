import { PostHogProvider } from "posthog-js/react";

const isDevelopment = import.meta.env.DEV;

const options = {
	api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
	autocapture: !isDevelopment,
	capture_pageview: !isDevelopment,
	disable_session_recording: isDevelopment,
	opt_out_capturing_by_default: isDevelopment,
};

export default function LazyPostHogProvider({
	children,
}: { children: React.ReactNode }) {
	if (isDevelopment) return <>{children}</>;

	return (
		<PostHogProvider
			apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY || ""}
			options={options}
		>
			{children}
		</PostHogProvider>
	);
}
