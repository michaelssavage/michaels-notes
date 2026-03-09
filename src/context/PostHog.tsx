import {
  PostHogErrorBoundary,
  PostHogProvider as PostHogProviderReact,
} from "@posthog/react";

interface HogProps {
  children: React.ReactNode;
}

const isDevelopment = import.meta.env.DEV;

const apiKey = import.meta.env.VITE_PUBLIC_POSTHOG_KEY || "";

export default function PostHogProvider({ children }: HogProps) {
  if (isDevelopment || !apiKey) {
    return <>{children}</>;
  }

  return (
    <PostHogProviderReact
      apiKey={apiKey}
      options={{
        api_host: "https://e.michaelsavage.ie",
        defaults: "2026-01-30",
        capture_exceptions: true,
      }}
    >
      <PostHogErrorBoundary>{children}</PostHogErrorBoundary>
    </PostHogProviderReact>
  );
}
