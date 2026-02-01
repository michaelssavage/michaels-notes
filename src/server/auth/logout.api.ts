import { createServerFn } from "@tanstack/react-start";

export const logoutFn = createServerFn({ method: "POST" }).handler(async () => {
  return new Response(null, {
    status: 204,
    headers: {
      "Set-Cookie": [
        "admin_token=;",
        "Path=/;",
        "HttpOnly;",
        "SameSite=Lax;",
        "Max-Age=0;",
      ].join(" "),
    },
  });
});
