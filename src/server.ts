import { emotionCache } from "@/context/EmotionCache";
import createEmotionServer from "@emotion/server/create-instance";
import handler, { createServerEntry } from "@tanstack/react-start/server-entry";

const { extractCriticalToChunks, constructStyleTagsFromChunks } =
  createEmotionServer(emotionCache);

export default createServerEntry({
  async fetch(request) {
    const response = await handler.fetch(request);

    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.includes("text/html")) {
      return response;
    }

    const html = await response.text();
    const chunks = extractCriticalToChunks(html);
    const styles = constructStyleTagsFromChunks(chunks);

    const finalHtml = html.replace(/<head>/i, `<head>${styles}`);

    // Rebuild headers (Response headers are immutable)
    const headers = new Headers(response.headers);

    return new Response(finalHtml, {
      status: response.status,
      headers,
    });
  },
});
