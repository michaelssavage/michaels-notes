import type { NextApiRequest, NextApiResponse } from "next";
import { getContent } from "lib/github";
/* eslint-disable-next-line */
const path = require("path");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await getContent();

  const graphics = response
    .map((pic) => ({
      name: path.parse(pic.name).name,
      img: pic.download_url,
    }))
    .filter((pic) => pic.name !== "README");

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=30"
  );

  return res.status(200).json({ graphics });
}
