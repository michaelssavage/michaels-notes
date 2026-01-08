import { Collection, Document, MongoClient } from "mongodb";

const MONGODB_URI = process.env.VITE_MOVIES_STRING!;
const DB_NAME = "michaels-notes";

let cachedClient: MongoClient | null = null;

async function getMongoClient() {
  if (cachedClient) {
    return cachedClient;
  }

  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  cachedClient = client;
  return client;
}

export async function getCollection<T extends Document>(
  collectionName: string
): Promise<Collection<T>> {
  const client = await getMongoClient();
  const db = client.db(DB_NAME);
  return db.collection<T>(collectionName);
}
