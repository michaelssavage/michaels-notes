import { getRequest } from "@tanstack/react-start/server";
import { env } from "cloudflare:workers";

// Server-only guard for mutations: same cookie check as checkAuthFn
export function requireAdmin() {
  const cookies = getRequest().headers.get("Cookie") || "";
  const token = cookies
    .split("; ")
    .find((c) => c.startsWith("admin_token="))
    ?.split("=")[1];

  if (!token || token !== env.ADMIN_SECRET) {
    throw new Error("Unauthorized");
  }
}
