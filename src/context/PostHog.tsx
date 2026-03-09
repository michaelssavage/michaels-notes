import { PostHogProvider as PostHogProviderReact } from "posthog-js/react";

interface HogProps {
  children: React.ReactNode;
}

const isDevelopment = import.meta.env.DEV;
const VITE_PUBLIC_POSTHOG_KEY =
  "phc_LfqrRjpFLLYlfzOFSENrOUqDYFtXWwJwKpc6mzszh3q";

export default function PostHogProvider({ children }: HogProps) {
  if (isDevelopment || typeof window === "undefined") {
    return <>{children}</>;
  }

  return (
    <PostHogProviderReact
      apiKey={VITE_PUBLIC_POSTHOG_KEY}
      options={{
        api_host: "https://e.michaelsavage.ie",
        ui_host: "https://eu.posthog.com",
        defaults: "2026-01-30",
        capture_exceptions: true,
      }}
    >
      {children}
    </PostHogProviderReact>
  );
}
