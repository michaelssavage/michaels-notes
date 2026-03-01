import { createMiddleware, createServerFn } from "@tanstack/react-start";
import { env } from "cloudflare:workers";

const authMiddleware = createMiddleware().server(async ({ next, request }) => {
  return next({ context: { request } });
});

export const checkAuthFn = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const cookies = context.request.headers.get("Cookie") || "";
    const token = cookies
      .split("; ")
      .find((c) => c.startsWith("admin_token="))
      ?.split("=")[1];

    if (token === env.ADMIN_SECRET) {
      return { authenticated: true };
    }

    return { authenticated: false };
  });
