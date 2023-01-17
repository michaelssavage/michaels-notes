import { Buffer } from "buffer";
window.Buffer = Buffer;

const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const client_secret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
export const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
export const refresh_token = import.meta.env.VITE_SPOTIFY_REFRESH_TOKEN;

export const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
export const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
export const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`;

const user = import.meta.env.VITE_GITHUB_USER;
const repo = import.meta.env.VITE_GITHUB_REPO;
export const token = import.meta.env.VITE_GITHUB_TOKEN;
export const GITHUB_CONTENT = `https://api.github.com/repos/${user}/${repo}/contents`;

export const LETTERBOXD_URI = "https://letterboxd.com/ottobio/list/my-favourites-1/";
