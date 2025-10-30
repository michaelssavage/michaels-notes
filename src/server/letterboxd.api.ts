import { IMovie } from "@/types/Movie";
import { createServerFn } from "@tanstack/react-start";
import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.VITE_MOVIES_STRING!;
const DB_NAME = "michaels-notes";
const COLLECTION_NAME = "movies";

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

export const getMovies = createServerFn({
  method: "GET",
}).handler(async (): Promise<Array<IMovie>> => {
  try {
    const client = await getMongoClient();
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    const movies = await collection
      .find({})
      .project<IMovie>({
        _id: 0,
        id: 1,
        title: 1,
        year: 1,
        status: 1,
        image_url: 1,
        link_url: 1,
      })
      .sort({ id: 1 })
      .toArray();

    return movies;
  } catch (error) {
    console.error("Error fetching movies from MongoDB:", error);
    throw new Error("Failed to fetch movies");
  }
});
