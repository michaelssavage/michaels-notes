import { requireAdmin } from "@/api/auth/require-admin";
import { executeBatch, queryAll } from "@/api/d1/api";
import { type IMovie } from "@/types/Movie";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const COLUMNS = "id, title, year, status, image_url, link_url";

const MovieSchema = z.object({
  title: z.string().min(1),
  year: z.string(),
  status: z.string(),
  image_url: z.string().min(1),
  link_url: z.string().min(1),
});

const UpdateMoviesSchema = z.object({
  movies: z.array(MovieSchema).min(1),
});

export const getMovies = createServerFn({ method: "GET" }).handler(
  async (): Promise<IMovie[]> => {
    return queryAll<IMovie>(`SELECT ${COLUMNS} FROM movies ORDER BY id ASC`);
  },
);

// Replaces the whole list; ids are reassigned from the array order
export const updateMovies = createServerFn({ method: "POST" })
  .inputValidator(UpdateMoviesSchema)
  .handler(async ({ data }): Promise<IMovie[]> => {
    requireAdmin();
    const movies = data.movies.map((movie, index) => ({
      id: index + 1,
      ...movie,
    }));

    await executeBatch([
      { sql: "DELETE FROM movies" },
      ...movies.map((movie) => ({
        sql: `INSERT INTO movies (${COLUMNS}) VALUES (?, ?, ?, ?, ?, ?)`,
        params: [
          movie.id,
          movie.title,
          movie.year,
          movie.status,
          movie.image_url,
          movie.link_url,
        ],
      })),
    ]);

    return movies;
  });
