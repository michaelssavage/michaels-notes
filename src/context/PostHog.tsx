import { PostHogProvider as PostHogProviderReact } from "posthog-js/react";

interface HogProps {
  children: React.ReactNode;
}

const isDevelopment = import.meta.env.DEV;

export default function PostHogProvider({ children }: HogProps) {
  if (isDevelopment) {
    return <>{children}</>;
  }

  return (
    <PostHogProviderReact
      apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY}
      options={{
        api_host: "https://e.michaelsavage.ie",
        defaults: "2026-01-30",
        capture_exceptions: true,
      }}
    >
      {children}
    </PostHogProviderReact>
  );
}
