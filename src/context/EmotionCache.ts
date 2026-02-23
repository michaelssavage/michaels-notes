import createCache from "@emotion/cache";

// Shared cache key for client/server markup consistency.
export const emotionCache = createCache({ key: "css" });
