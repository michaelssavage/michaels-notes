import { createMiddleware, createServerFn } from "@tanstack/react-start";
import { env } from "cloudflare:workers";
import { z } from "zod";

const LoginSchema = z.object({
  password: z.string(),
});

const authMiddleware = createMiddleware().server(async ({ next, request }) => {
  return next({
    context: {
      request,
    },
  });
});

export const loginFn = createServerFn({ method: "POST" })
  .inputValidator(LoginSchema)
  .middleware([authMiddleware])
  .handler(async ({ data }) => {
    if (data.password === env.ADMIN_PASSWORD) {
      const cookie = `admin_token=${env.ADMIN_SECRET}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${60 * 60 * 24 * 30}`;

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: {
          "Set-Cookie": cookie,
          "Content-Type": "application/json",
        },
      });
    }

    throw new Response(JSON.stringify({ error: "Invalid password" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  });
