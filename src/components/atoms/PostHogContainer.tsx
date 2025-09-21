import { lazy, Suspense } from "react";

const isDevelopment = import.meta.env.DEV;

const options = {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
  autocapture: !isDevelopment,
  capture_pageview: !isDevelopment,
  disable_session_recording: isDevelopment,
  opt_out_capturing_by_default: isDevelopment,
};

const PostHogProviderLazy = lazy(() =>
  import("posthog-js/react").then((mod) => ({ default: mod.PostHogProvider })),
);

export default function PostHogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  if (isDevelopment) return <>{children}</>;

  return (
    <Suspense fallback={null}>
      <PostHogProviderLazy
        apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY || ""}
        options={options}
      >
        {children}
      </PostHogProviderLazy>
    </Suspense>
  );
}
