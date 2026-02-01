import { IMovie } from "@/types/Movie";
import { createServerFn } from "@tanstack/react-start";
import { getCollection } from "./db";

const COLLECTION_NAME = "movies";

export const getMovies = createServerFn({
  method: "GET",
}).handler(async (): Promise<Array<IMovie>> => {
  try {
    const collection = await getCollection<IMovie>(COLLECTION_NAME);

    const movies = await collection
      .find({})
      .project({
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

    return movies as IMovie[];
  } catch (error) {
    console.error("Error fetching movies from MongoDB:", error);
    throw new Error("Failed to fetch movies");
  }
});
