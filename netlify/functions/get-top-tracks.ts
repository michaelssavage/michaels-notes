import type { Handler } from "@netlify/functions";
import type { ITopTrackResponse } from "../../src/types/Spotify";

const corsHeaders = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Headers": "Content-Type, Accept",
	"Access-Control-Allow-Methods": "GET, OPTIONS",
	"Content-Type": "application/json",
};

const handler: Handler = async (event, _context) => {
	// Handle CORS preflight
	if (event.httpMethod === "OPTIONS") {
		return {
			statusCode: 200,
			headers: corsHeaders,
			body: "",
		};
	}

	// Only allow GET requests
	if (event.httpMethod !== "GET") {
		return {
			statusCode: 405,
			headers: corsHeaders,
			body: JSON.stringify({ error: "Method not allowed" }),
		};
	}

	const REFRESH_TOKEN = process.env.VITE_SPOTIFY_REFRESH_TOKEN;
	const CLIENT_ID = process.env.VITE_SPOTIFY_CLIENT_ID;
	const CLIENT_SECRET = process.env.VITE_SPOTIFY_CLIENT_SECRET;

	if (!REFRESH_TOKEN || !CLIENT_ID || !CLIENT_SECRET) {
		return {
			statusCode: 500,
			headers: corsHeaders,
			body: JSON.stringify({ error: "Missing Spotify credentials" }),
		};
	}

	try {
		// First, get a fresh access token
		const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
			"base64",
		);

		const tokenResponse = await fetch(
			"https://accounts.spotify.com/api/token",
			{
				method: "POST",
				headers: {
					Authorization: `Basic ${auth}`,
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: new URLSearchParams({
					grant_type: "refresh_token",
					refresh_token: REFRESH_TOKEN,
				}),
			},
		);

		if (!tokenResponse.ok) {
			console.error("Failed to refresh token:", await tokenResponse.text());
			return {
				statusCode: 500,
				headers: corsHeaders,
				body: JSON.stringify({ error: "Failed to refresh token" }),
			};
		}

		const tokenData = await tokenResponse.json();

		if (!tokenData.access_token) {
			return {
				statusCode: 500,
				headers: corsHeaders,
				body: JSON.stringify({ error: "No access token received" }),
			};
		}

		// Now fetch the top tracks
		const res = await fetch(
			"https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10", // Corrected Spotify API endpoint
			{
				headers: {
					Authorization: `Bearer ${tokenData.access_token}`,
				},
			},
		);

		if (!res.ok) {
			const errorData = await res.text();
			console.error("Failed to fetch top tracks:", errorData);
			return {
				statusCode: res.status,
				headers: corsHeaders,
				body: JSON.stringify({ error: "Failed to fetch top tracks" }),
			};
		}

		const tracksData: ITopTrackResponse = await res.json();

		const transformedTracks = tracksData.items.map((item) => ({
			name: item.name,
			artists: item.artists.map(({ name }) => name).join(", "),
			url: item.external_urls.spotify,
			img: item.album.images[0]?.url || null,
		}));

		return {
			statusCode: 200,
			headers: corsHeaders,
			body: JSON.stringify(transformedTracks),
		};
	} catch (error) {
		console.error("Error in get-top-tracks function:", error);
		return {
			statusCode: 500,
			headers: corsHeaders,
			body: JSON.stringify({ error: "Internal server error" }),
		};
	}
};

export { handler };
