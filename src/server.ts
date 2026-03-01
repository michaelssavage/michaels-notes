import { emotionCache } from "@/context/EmotionCache";
import createEmotionServer from "@emotion/server/create-instance";
import handler, { createServerEntry } from "@tanstack/react-start/server-entry";

const { extractCriticalToChunks, constructStyleTagsFromChunks } =
  createEmotionServer(emotionCache);

// Security headers applied to every response (ported from netlify.toml [[headers]])
const SECURITY_HEADERS: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "SAMEORIGIN",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Content-Security-Policy":
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://eu.i.posthog.com https://eu-assets.i.posthog.com; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "img-src 'self' data: blob: https://*.ucarecdn.net; " +
    "connect-src 'self' https://eu.i.posthog.com https://eu-assets.i.posthog.com; " +
    "frame-src 'none'; frame-ancestors 'none'; object-src 'none'; base-uri 'self';",
};

function applySecurityHeaders(headers: Headers): void {
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    headers.set(key, value);
  }
}

const entry = createServerEntry({
  async fetch(request) {
    const response = await handler.fetch(request);

    const contentType = response.headers.get("content-type") ?? "";

    // Rebuild headers (Response headers are immutable)
    const headers = new Headers(response.headers);
    applySecurityHeaders(headers);

    if (!contentType.includes("text/html")) {
      return new Response(response.body, {
        status: response.status,
        headers,
      });
    }

    const html = await response.text();
    const chunks = extractCriticalToChunks(html);
    const styles = constructStyleTagsFromChunks(chunks);

    const finalHtml = html.replace(/<head>/i, `<head>${styles}`);

    return new Response(finalHtml, {
      status: response.status,
      headers,
    });
  },
});

export default {
  async fetch(request: Request, env: Record<string, string>) {
    Object.assign(process.env, env);
    return entry.fetch(request);
  },
};
