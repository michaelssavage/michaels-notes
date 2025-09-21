export const fetchFavouriteMovies = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/movies_movie?select=id,title,year,status,image_url,link_url`,
      {
        headers: {
          apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) throw new Error("Failed to fetch");
    return await response.json();
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw new Error("Failed to fetch movies");
  }
};
