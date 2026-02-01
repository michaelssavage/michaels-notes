import { Collection, Document, MongoClient, WithId } from "mongodb";

const MONGODB_URI = process.env.VITE_MOVIES_STRING;
const DB_NAME = "michaels-notes";

type GlobalWithMongoClient = typeof globalThis & {
  __mongoClientPromise?: Promise<MongoClient>;
};

const globalForMongo = globalThis as GlobalWithMongoClient;

const createMongoClientPromise = () => {
  if (!MONGODB_URI) throw new Error("MONGODB_URI not defined");
  const client = new MongoClient(MONGODB_URI);
  return client.connect().then(() => client);
};

const mongoClientPromise =
  globalForMongo.__mongoClientPromise ?? createMongoClientPromise();

if (process.env.NODE_ENV !== "production") {
  globalForMongo.__mongoClientPromise = mongoClientPromise;
}

async function getMongoClient() {
  return mongoClientPromise;
}

export async function getCollection<T extends Document>(
  collectionName: string,
  dbName: string = DB_NAME
): Promise<Collection<T>> {
  const client = await getMongoClient();
  const db = client.db(dbName);
  return db.collection<T>(collectionName);
}

/**
 * Serializes MongoDB documents for transmission over the wire.
 * Converts ObjectId _id to string and handles nested ObjectIds.
 */
export function serializeMongoDoc<T extends Document>(
  doc: WithId<T> | null
): (Omit<T, "_id"> & { _id: string }) | null {
  if (!doc) return null;

  const { _id, ...rest } = doc;
  return {
    ...rest,
    _id: _id.toString(),
  } as Omit<T, "_id"> & { _id: string };
}

/**
 * Serializes an array of MongoDB documents
 */
export function serializeMongoDocs<T extends Document>(
  docs: WithId<T>[]
): (Omit<T, "_id"> & { _id: string })[] {
  return docs.map((doc) => serializeMongoDoc(doc)!);
}
