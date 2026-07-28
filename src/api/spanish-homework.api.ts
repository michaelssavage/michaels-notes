import { createServerFn } from "@tanstack/react-start";
import { setResponseStatus } from "@tanstack/react-start/server";
import { env } from "cloudflare:workers";
import { z } from "zod";

const SPANISH_WORKSHEET_URL =
  "https://spanish-worksheets-production.up.railway.app/api/worksheet/";

export type SWItem = {
  prompt: string;
  answer: Array<string>;
};

export type SpanishWorksheet = {
  created_at: Date;
  themes: string[];
  content: Record<string, SWItem[]>;
};

export type CustomWorksheet = {
  request: string;
  content: {
    exercises: SWItem[];
  };
};

const CreateWorksheetSchema = z.object({
  request: z.string(),
});

export const getLatestSpanishWorksheet = createServerFn({
  method: "GET",
}).handler(async (): Promise<SpanishWorksheet> => {
  const token = env.SPANISH_API_TOKEN;

  if (!token) {
    setResponseStatus(500);
    throw new Error("Missing SPANISH_API_TOKEN");
  }

  const response = await fetch(SPANISH_WORKSHEET_URL, {
    method: "GET",
    headers: {
      Authorization: `Token ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    setResponseStatus(response.status);
    const body = await response.text();
    throw new Error(
      `Spanish worksheet API error (${response.status}): ${body || "empty response"}`,
    );
  }

  return response.json() as Promise<SpanishWorksheet>;
});

export const getCustomWorksheet = createServerFn({
  method: "GET",
})
  .inputValidator(CreateWorksheetSchema)
  .handler(async ({ data }): Promise<CustomWorksheet> => {
    const token = env.SPANISH_API_TOKEN;

    if (!token) {
      setResponseStatus(500);
      throw new Error("Missing SPANISH_API_TOKEN");
    }

    const response = await fetch(`${SPANISH_WORKSHEET_URL}custom/`, {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        request: data.request,
      }),
    });

    if (!response.ok) {
      setResponseStatus(response.status);
      const body = await response.text();
      throw new Error(
        `Spanish worksheet API error (${response.status}): ${body || "empty response"}`,
      );
    }

    return response.json() as Promise<CustomWorksheet>;
  });
