const SPOTIFY_TOKEN_KEY = "spotifyAccessToken";
const SPOTIFY_TOKEN_EXPIRY_KEY = "spotifyTokenExpiry";
const REFRESH_TOKEN = import.meta.env.VITE_SPOTIFY_REFRESH_TOKEN;
const BASE64_AUTH = import.meta.env.VITE_SPOTIFY_BASE64_AUTH;

const refreshToken = async () => {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${BASE64_AUTH}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: REFRESH_TOKEN,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to refresh token");
  }

  const data = await response.json();
  if (data.access_token) {
    const expiresAt = Date.now() + data.expires_in * 1000;
    localStorage.setItem(SPOTIFY_TOKEN_KEY, data.access_token);
    localStorage.setItem(SPOTIFY_TOKEN_EXPIRY_KEY, expiresAt.toString());
    return data.access_token;
  }
  throw new Error("Failed to refresh token");
};

export const getAccessToken = async () => {
  const accessToken = localStorage.getItem(SPOTIFY_TOKEN_KEY);
  const tokenExpiry = localStorage.getItem(SPOTIFY_TOKEN_EXPIRY_KEY);

  if (
    !accessToken ||
    !tokenExpiry ||
    Date.now() > Number.parseInt(tokenExpiry)
  ) {
    return refreshToken();
  }

  return accessToken;
};
