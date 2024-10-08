const LETTERBOXD_BEARER_TOKEN = import.meta.env.VITE_LETTERBOXD_BEARER_TOKEN;

export const fetchFavouriteMovies = async () => {
  const response = await fetch("/.netlify/functions/movies", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${LETTERBOXD_BEARER_TOKEN}`,
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
};
