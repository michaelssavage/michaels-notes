import { execute, queryOne } from "@/api/d1/api";
import { createMiddleware, createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const ViewsSchema = z.object({
  slug: z.string().min(1),
  category: z.string().min(1),
});

const getClientIp = (headers: Headers): string => {
  const cfIp = headers.get("cf-connecting-ip");
  if (cfIp) return cfIp;
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  if (process.env.NODE_ENV === "development") return "127.0.0.1";
  return "unknown";
};

const requestContextMiddleware = createMiddleware().server(async ({ next, request }) =>
  next({ context: { request } }),
);

export const getViews = createServerFn({ method: "GET" })
  .inputValidator(ViewsSchema)
  .handler(async ({ data }): Promise<{ count: number }> => {
    const row = await queryOne<{ count: number }>(
      "SELECT count FROM page_views WHERE slug = ? AND category = ?",
      [data.slug, data.category],
    );
    return { count: row?.count ?? 0 };
  });

export const recordView = createServerFn({ method: "POST" })
  .inputValidator(ViewsSchema)
  .middleware([requestContextMiddleware])
  .handler(async ({ data, context }) => {
    const ip = getClientIp(context.request.headers);
    if (ip === "unknown") return { ok: false };

    const today = new Date().toISOString().slice(0, 10);

    const insert = await execute(
      "INSERT OR IGNORE INTO page_view_ips (slug, category, ip, date) VALUES (?, ?, ?, ?)",
      [data.slug, data.category, ip, today],
    );

    if (insert.meta.changes === 0) return { ok: true, counted: false };

    await execute(
      `INSERT INTO page_views (slug, category, count) VALUES (?, ?, 1)
       ON CONFLICT(slug, category) DO UPDATE SET count = count + 1`,
      [data.slug, data.category],
    );

    return { ok: true, counted: true };
  });
