import { useHydrated } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

interface HogProps {
  children: React.ReactNode;
}

const isDevelopment = import.meta.env.DEV;

const PostHogReact = lazy(() =>
  import("@posthog/react").then((mod) => ({
    default: mod.PostHogProvider,
  }))
);

const PostHogErrorBoundaryLazy = lazy(() =>
  import("@posthog/react").then((mod) => ({
    default: mod.PostHogErrorBoundary,
  }))
);

const options = {
  api_host: "https://eu.i.posthog.com",
  autocapture: !isDevelopment,
  capture_pageview: !isDevelopment,
  disable_session_recording: isDevelopment,
  opt_out_capturing_by_default: isDevelopment,
};

const apiKey = import.meta.env.VITE_PUBLIC_POSTHOG_KEY || "";

export default function PostHogProvider({ children }: HogProps) {
  const hydrated = useHydrated();

  if (isDevelopment || !hydrated || !apiKey) {
    return <>{children}</>;
  }

  return (
    <Suspense fallback={null}>
      <PostHogReact apiKey={apiKey} options={options}>
        <PostHogErrorBoundaryLazy>{children}</PostHogErrorBoundaryLazy>
      </PostHogReact>
    </Suspense>
  );
}
