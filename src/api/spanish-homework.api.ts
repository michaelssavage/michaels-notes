import { createServerFn } from "@tanstack/react-start";
import { env } from "cloudflare:workers";

const SPANISH_WORKSHEET_LATEST_URL =
  "https://spanish-worksheets-production.up.railway.app/api/worksheet/latest/";

export type SWItem = {
  prompt: string;
  answer: string;
};

export type SpanishWorksheet = {
  created_at: Date;
  themes: string[];
  content: {
    past: SWItem[];
    present: SWItem[];
    future: SWItem[];
    translation: SWItem[];
  };
};

export const getLatestSpanishWorksheet = createServerFn({
  method: "GET",
}).handler(async (): Promise<SpanishWorksheet> => {
  const token = env.SPANISH_API_TOKEN;

  if (!token) {
    throw new Error("Missing SPANISH_API_TOKEN");
  }

  const response = await fetch(SPANISH_WORKSHEET_LATEST_URL, {
    method: "GET",
    headers: {
      Authorization: `Token ${token}`,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `Spanish worksheet API error (${response.status}): ${body || "empty response"}`,
    );
  }

  return response.json() as Promise<SpanishWorksheet>;
});
