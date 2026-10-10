import { createServerFn } from "@tanstack/react-start";
import { setResponseStatus } from "@tanstack/react-start/server";
import { env } from "cloudflare:workers";
import { z } from "zod";

const WORKSHEET_API_URL =
  "https://spanish-worksheets-production.up.railway.app/api/worksheet/";

export const WORKSHEET_LANGUAGES = ["es", "ca"] as const;
export const LanguageSchema = z.enum(WORKSHEET_LANGUAGES);
export type WorksheetLanguage = z.infer<typeof LanguageSchema>;

export const LANGUAGE_LABELS: Record<WorksheetLanguage, string> = {
  es: "Spanish",
  ca: "Catalan",
};

export type WorksheetItem = {
  prompt: string;
  answer: Array<string>;
};

export type Worksheet = {
  id: number;
  language: WorksheetLanguage;
  created_at: Date;
  themes: string[];
  content: Record<string, WorksheetItem[]>;
};

export type CustomWorksheet = {
  request: string;
  language: WorksheetLanguage;
  content: {
    exercises: WorksheetItem[];
  };
};

const LatestWorksheetSchema = z.object({
  language: LanguageSchema,
});

const CreateWorksheetSchema = z.object({
  request: z.string(),
  language: LanguageSchema,
});

async function worksheetApiFetch(
  path: string,
  init?: RequestInit,
): Promise<Response> {
  const token = env.SPANISH_API_TOKEN;

  if (!token) {
    setResponseStatus(500);
    throw new Error("Missing SPANISH_API_TOKEN");
  }

  return fetch(`${WORKSHEET_API_URL}${path}`, {
    ...init,
    headers: {
      Authorization: `Token ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
}

async function throwApiError(response: Response): Promise<never> {
  setResponseStatus(response.status);
  const body = await response.text();
  throw new Error(
    `Worksheet API error (${response.status}): ${body || "empty response"}`,
  );
}

/** Latest worksheet for a language, or null if none has been generated yet. */
export const getLatestWorksheet = createServerFn({
  method: "GET",
})
  .inputValidator(LatestWorksheetSchema)
  .handler(async ({ data }): Promise<Worksheet | null> => {
    const response = await worksheetApiFetch(`?language=${data.language}`, {
      method: "GET",
    });

    if (response.status === 404) return null;
    if (!response.ok) return throwApiError(response);

    return response.json() as Promise<Worksheet>;
  });

export const getCustomWorksheet = createServerFn({
  method: "GET",
})
  .inputValidator(CreateWorksheetSchema)
  .handler(async ({ data }): Promise<CustomWorksheet> => {
    const response = await worksheetApiFetch("custom/", {
      method: "POST",
      body: JSON.stringify({
        request: data.request,
        language: data.language,
      }),
    });

    if (!response.ok) return throwApiError(response);

    return response.json() as Promise<CustomWorksheet>;
  });
