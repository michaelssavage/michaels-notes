import type { Handler } from "@netlify/functions";

export const handler: Handler = async (event) => {
	const artist = event.queryStringParameters?.artist;

	if (!artist) {
		return {
			statusCode: 400,
			body: JSON.stringify({ error: "Missing 'artist' query parameter" }),
		};
	}

	const API_KEY = process.env.VITE_LASTFM_API_KEY;

	const url = `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artist}&api_key=${API_KEY}&format=json`;

	try {
		const res = await fetch(url, {
			headers: {
				"User-Agent": "michaelsavage.ie/1.0 (Last.fm integration)",
			},
		});

		if (!res.ok) {
			return {
				statusCode: res.status,
				body: JSON.stringify({ error: "Failed to fetch from Last.fm" }),
			};
		}

		const data = await res.json();

		return {
			statusCode: 200,
			body: JSON.stringify(data),
		};
	} catch (err) {
		return {
			statusCode: 500,
			body: JSON.stringify({ error: "Internal server error" }),
		};
	}
};
