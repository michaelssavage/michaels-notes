import { queryAll } from "@/api/d1/api";
import { type IMovie } from "@/types/Movie";
import { createServerFn } from "@tanstack/react-start";

export const getMovies = createServerFn({ method: "GET" }).handler(
  async (): Promise<IMovie[]> => {
    return queryAll<IMovie>(
      "SELECT id, title, year, status, image_url, link_url FROM movies ORDER BY id ASC"
    );
  }
);
