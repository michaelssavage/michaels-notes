import { execute, queryAll, queryOne } from "@/api/d1/api";
import { createMiddleware, createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const MAX_LENGTH = 2000;
const MIN_INTERVAL_MS = 10_000;
const MAX_PER_HOUR = 20;

const FeedbackSchema = z.object({ text: z.string().min(1).max(MAX_LENGTH) });

const SPAM_PATTERNS = [
  /https?:\/\//gi,
  /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi,
  /(.)\1{10,}/gi,
];

const isSpam = (text: string) => SPAM_PATTERNS.some((p) => p.test(text));

const getClientIp = (headers: Headers): string => {
  const cfIp = headers.get("cf-connecting-ip");
  if (cfIp) return cfIp;
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  if (process.env.NODE_ENV === "development") return "127.0.0.1";
  return "unknown";
};

const authMiddleware = createMiddleware().server(async ({ next, request }) =>
  next({ context: { request } })
);

export const submitFeedback = createServerFn({ method: "POST" })
  .inputValidator(FeedbackSchema)
  .middleware([authMiddleware])
  .handler(async ({ data, context }) => {
    const text = String(data.text ?? "").trim();
    if (!text || text.length > MAX_LENGTH)
      throw new Response("Invalid input", { status: 400 });
    if (isSpam(text)) throw new Response("Invalid content", { status: 400 });

    const ip = getClientIp(context.request.headers);
    if (ip === "unknown")
      throw new Response("Unable to process request", { status: 400 });

    const now = new Date();
    const nowIso = now.toISOString();

    // Check minimum interval
    const last = await queryOne<{ created_at: string }>(
      "SELECT created_at FROM feedback WHERE ip = ? ORDER BY created_at DESC LIMIT 1",
      [ip]
    );
    if (
      last &&
      now.getTime() - new Date(last.created_at).getTime() < MIN_INTERVAL_MS
    ) {
      throw new Response("Too fast", { status: 429 });
    }

    // Rate limiting via feedback_tracking
    const trackingKey = `${ip}:${now.getUTCHours()}`;
    const existing = await queryOne<{ count: number }>(
      "SELECT count FROM feedback_tracking WHERE key = ?",
      [trackingKey]
    );

    if (existing) {
      if (existing.count >= MAX_PER_HOUR)
        throw new Response("Rate limited", { status: 429 });
      await execute(
        "UPDATE feedback_tracking SET count = count + 1 WHERE key = ?",
        [trackingKey]
      );
    } else {
      await execute(
        "INSERT INTO feedback_tracking (key, count, created_at) VALUES (?, 1, ?)",
        [trackingKey, nowIso]
      );
    }

    await execute(
      "INSERT INTO feedback (text, ip, created_at) VALUES (?, ?, ?)",
      [text, ip, nowIso]
    );

    return { ok: true };
  });

interface IFeedback {
  text: string;
  ip: string;
  createdAt: string;
}

export const getFeedback = createServerFn({ method: "GET" }).handler(
  async (): Promise<IFeedback[]> => {
    const rows = await queryAll<{
      text: string;
      ip: string;
      created_at: string;
    }>("SELECT text, ip, created_at FROM feedback ORDER BY created_at DESC");
    // Map snake_case column back to camelCase to match existing IFeedback interface
    return rows.map((r) => ({
      text: r.text,
      ip: r.ip,
      createdAt: r.created_at,
    }));
  }
);
