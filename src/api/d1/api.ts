import { getRequest } from "@tanstack/react-start/server";
import { env } from "cloudflare:workers";

interface D1Request extends Request {
  cloudflare?: { env?: Record<string, unknown> };
}

function getDB(): D1Database {
  const request: D1Request = getRequest();
  const requestEnv = request?.cloudflare?.env;
  const workerEnv = env as unknown as Record<string, unknown>;
  const bindingCandidates = ["DB", "michaels_notes"];

  for (const binding of bindingCandidates) {
    const db = requestEnv?.[binding] ?? workerEnv?.[binding];
    if (db) return db as D1Database;
  }

  const requestKeys = Object.keys(requestEnv ?? {}).sort();
  const workerKeys = Object.keys(workerEnv ?? {}).sort();
  throw new Error(
    `D1 binding not found. Tried: ${bindingCandidates.join(", ")}. Request env keys: ${requestKeys.join(", ") || "(none)"}. Worker env keys: ${workerKeys.join(", ") || "(none)"}.`
  );
}

export type Row = object;

export async function queryAll<T extends Row>(
  sql: string,
  params: unknown[] = []
): Promise<T[]> {
  const db = getDB();
  const { results } = await db
    .prepare(sql)
    .bind(...params)
    .all<T>();
  return results;
}

export async function queryOne<T extends Row>(
  sql: string,
  params: unknown[] = []
): Promise<T | null> {
  const db = getDB();
  return db
    .prepare(sql)
    .bind(...params)
    .first<T>();
}

export async function execute(
  sql: string,
  params: unknown[] = []
): Promise<D1Result> {
  const db = getDB();
  return db
    .prepare(sql)
    .bind(...params)
    .run();
}
