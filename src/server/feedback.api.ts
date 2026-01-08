import { createMiddleware, createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getCollection } from "./db";

const MAX_LENGTH = 2000;
const MIN_INTERVAL_MS = 10_000;
const MAX_PER_HOUR = 20;

const FeedbackSchema = z.object({
  text: z.string().min(1).max(MAX_LENGTH),
});

const SPAM_PATTERNS = [
  /https?:\/\//gi, // URLs
  /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, // Emails
  /(.)\1{10,}/gi, // Repeated characters
];

const isSpam = (text: string): boolean => {
  return SPAM_PATTERNS.some((pattern) => pattern.test(text));
};

const getClientIp = (headers: Headers): string => {
  // If behind Cloudflare, trust their header
  const cfIp = headers.get("cf-connecting-ip");
  if (cfIp) return cfIp;

  // Parse x-forwarded-for (take first IP only)
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const ip = forwarded.split(",")[0].trim();
    if (ip) return ip;
  }

  if (process.env.NODE_ENV === "development") {
    return "127.0.0.1";
  }

  // Fallback - but this shouldn't happen in production
  return "unknown";
};

const authMiddleware = createMiddleware().server(async ({ next, request }) => {
  return next({
    context: {
      request,
    },
  });
});

export const submitFeedback = createServerFn({ method: "POST" })
  .inputValidator(FeedbackSchema)
  .middleware([authMiddleware])
  .handler(async ({ data, context }) => {
    const text = String(data.text ?? "").trim();

    if (!text || text.length > MAX_LENGTH) {
      console.log("Failed validation: empty or too long");
      throw new Response("Invalid input", { status: 400 });
    }

    if (isSpam(text)) {
      console.log("Failed spam check");
      throw new Response("Invalid content", { status: 400 });
    }

    const ip = getClientIp(context.request.headers);

    if (ip === "unknown") {
      throw new Response("Unable to process request", { status: 400 });
    }

    const now = new Date();
    const feedback = await getCollection("feedback");

    const last = await feedback.findOne({ ip }, { sort: { createdAt: -1 } });

    if (last && now.getTime() - last.createdAt.getTime() < MIN_INTERVAL_MS) {
      throw new Response("Too fast", { status: 429 });
    }

    const trackingKey = `${ip}:${now.getHours()}`;
    const tracking = await getCollection("feedback_tracking");

    const result = await tracking.findOneAndUpdate(
      { key: trackingKey },
      {
        $inc: { count: 1 },
        $setOnInsert: { createdAt: now },
      },
      { upsert: true, returnDocument: "after" }
    );

    if (!result) {
      throw new Response("Database error", { status: 500 });
    }

    if (result.count > MAX_PER_HOUR) {
      throw new Response("Rate limited", { status: 429 });
    }

    await feedback.insertOne({
      text,
      ip,
      createdAt: now,
    });

    return { ok: true };
  });
