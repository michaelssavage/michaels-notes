import { Buffer } from "buffer";
window.Buffer = Buffer;

export const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
export const client_secret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
export const refresh_token = import.meta.env.VITE_SPOTIFY_REFRESH_TOKEN;

export const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
export const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
export const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
export const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`;
