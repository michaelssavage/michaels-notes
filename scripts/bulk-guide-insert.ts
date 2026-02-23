import "dotenv/config";
import { getCollection } from "../src/api/mongo/db";
import { items } from "../src/content/guide/barcelona";
import type { GuideTableItem } from "../src/types/Guide";

async function seed() {
  const collection = await getCollection<GuideTableItem>("barcelona-guide");

  // optionally wipe first
  // await collection.deleteMany({});

  await collection.insertMany(items);

  console.log(`Inserted ${items.length} guides`);
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
