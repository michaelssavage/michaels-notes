import type { Handler } from "@netlify/functions";

const corsHeaders = {
	"Content-Type": "application/json",
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Headers": "Content-Type",
	"Access-Control-Allow-Methods": "POST, OPTIONS",
};

const handler: Handler = async (event, context) => {
	if (event.httpMethod === "OPTIONS") {
		return {
			statusCode: 200,
			headers: corsHeaders,
			body: "",
		};
	}

	if (event.httpMethod !== "POST") {
		return {
			statusCode: 405,
			body: JSON.stringify({ error: "Method not allowed" }),
		};
	}

	const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;
	const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
	const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

	if (!REFRESH_TOKEN || !CLIENT_ID || !CLIENT_SECRET) {
		return {
			statusCode: 500,
			body: JSON.stringify({ error: "Missing Spotify credentials" }),
		};
	}

	try {
		const body = JSON.parse(event.body || "{}");
		const { currentToken, tokenExpiry } = body;

		if (currentToken && tokenExpiry && Date.now() < Number(tokenExpiry)) {
			return {
				statusCode: 200,
				headers: corsHeaders,
				body: JSON.stringify({
					access_token: currentToken,
					expires_at: tokenExpiry,
				}),
			};
		}

		const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");

		const response = await fetch("https://accounts.spotify.com/api/token", {
			method: "POST",
			headers: {
				Authorization: `Basic ${auth}`,
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: new URLSearchParams({
				grant_type: "refresh_token",
				refresh_token: REFRESH_TOKEN,
			}),
		});

		if (!response.ok) {
			const errorData = await response.text();
			console.error("Spotify token refresh failed:", errorData);
			return {
				statusCode: 500,
				body: JSON.stringify({ error: "Failed to refresh token" }),
			};
		}

		const data = await response.json();

		if (!data.access_token) {
			return {
				statusCode: 500,
				body: JSON.stringify({ error: "No access token received" }),
			};
		}

		const expiresAt = Date.now() + data.expires_in * 1000;

		return {
			statusCode: 200,
			headers: corsHeaders,
			body: JSON.stringify({
				access_token: data.access_token,
				expires_at: expiresAt,
			}),
		};
	} catch (error) {
		console.error("Error in get-spotify-token function:", error);
		return {
			statusCode: 500,
			body: JSON.stringify({ error: "Internal server error" }),
		};
	}
};

export { handler };
