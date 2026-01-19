import { createMiddleware, createServerFn } from "@tanstack/react-start";

const authMiddleware = createMiddleware().server(async ({ next, request }) => {
  return next({
    context: {
      request,
    },
  });
});

export const checkAuthFn = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const cookies = context.request.headers.get("Cookie") || "";
    const token = cookies
      .split("; ")
      .find((c) => c.startsWith("admin_token="))
      ?.split("=")[1];

    if (token === process.env.ADMIN_SECRET) {
      return { authenticated: true };
    }

    throw new Response(JSON.stringify({ authenticated: false }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  });
