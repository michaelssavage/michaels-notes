import { Collection, Document, MongoClient, WithId } from "mongodb";

const DB_NAME = "michaels-notes";
let mongoClientPromise: Promise<MongoClient> | null = null;

function getMongoClientPromise(): Promise<MongoClient> {
  if (!mongoClientPromise) {
    const uri = process.env.MONGO_DB_URI;
    if (!uri) throw new Error("MONGO_DB_URI not defined");
    const client = new MongoClient(uri);
    mongoClientPromise = client.connect().then(() => client);
  }
  return mongoClientPromise;
}

async function getMongoClient() {
  return getMongoClientPromise();
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
