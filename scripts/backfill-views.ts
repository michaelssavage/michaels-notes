/**
 * One-time backfill: reads historical pageview counts from PostHog
 * and upserts them into D1 page_views without overwriting higher existing counts.
 *
 * Usage:
 *   pnpm tsx scripts/backfill-views.ts
 *
 * Get your personal API key: PostHog → Settings → Personal API keys
 * Get your project ID from the URL: eu.posthog.com/project/XXXXX/...
 */

import { execSync } from "child_process";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";

dotenv.config();

const API_KEY = process.env.POSTHOG_API_KEY;
const PROJECT_ID = process.env.POSTHOG_PROJECT_ID;

if (!API_KEY || !PROJECT_ID) {
  console.error(
    "Missing env vars.\n" +
      "  POSTHOG_API_KEY     — from PostHog → Settings → Personal API keys\n" +
      "  POSTHOG_PROJECT_ID  — numeric ID in the PostHog URL",
  );
  process.exit(1);
}

const SOURCES = [
  { prefix: "/blog/", category: "blogs" },
  { prefix: "/projects/", category: "projects" },
  { prefix: "/review/", category: "reviews" },
] as const;

async function queryPostHog(prefix: string): Promise<[string, number][]> {
  const res = await fetch(
    `https://eu.posthog.com/api/projects/${PROJECT_ID}/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: {
          kind: "HogQLQuery",
          query: `
            SELECT properties.$pathname, count() AS views
            FROM events
            WHERE event = '$pageview'
              AND properties.$pathname LIKE '${prefix}%'
            GROUP BY properties.$pathname
            ORDER BY views DESC
          `,
        },
      }),
    },
  );

  if (!res.ok) {
    console.error(`PostHog API error ${res.status} for ${prefix}:`, await res.text());
    process.exit(1);
  }

  const { results } = (await res.json()) as { results: [string, number][] };
  return results;
}

const statements: string[] = [];

for (const { prefix, category } of SOURCES) {
  console.log(`Querying PostHog for ${prefix}* pageviews…`);
  const results = await queryPostHog(prefix);

  if (!results.length) {
    console.log(`  (no data)\n`);
    continue;
  }

  for (const [pathname, count] of results) {
    const slug = pathname.replace(prefix, "").replace(/\/$/, "");
    if (!slug) continue;

    const safeSlug = slug.replace(/'/g, "''");
    statements.push(
      `INSERT INTO page_views (slug, category, count) VALUES ('${safeSlug}', '${category}', ${count}) ` +
        `ON CONFLICT(slug, category) DO UPDATE SET count = MAX(count, excluded.count);`,
    );

    console.log(`  ${pathname.padEnd(50)} ${count} views`);
  }

  console.log();
}

if (!statements.length) {
  console.log("No valid slugs to insert.");
  process.exit(0);
}

const sqlFile = path.join(os.tmpdir(), "backfill-views.sql");
fs.writeFileSync(sqlFile, statements.join("\n"));

console.log(`Upserting ${statements.length} rows into D1 (remote)…`);
execSync(`wrangler d1 execute michaels-notes --remote --file=${sqlFile}`, {
  stdio: "inherit",
});

fs.unlinkSync(sqlFile);
console.log("Done.");
