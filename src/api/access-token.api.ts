const SPOTIFY_TOKEN_KEY = "spotifyAccessToken";
const SPOTIFY_TOKEN_EXPIRY_KEY = "spotifyTokenExpiry";

export const getAccessToken = async () => {
	const accessToken = localStorage.getItem(SPOTIFY_TOKEN_KEY);
	const tokenExpiry = localStorage.getItem(SPOTIFY_TOKEN_EXPIRY_KEY);

	try {
		const response = await fetch("/.netlify/functions/get-spotify-token", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				currentToken: accessToken,
				tokenExpiry: tokenExpiry,
			}),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();

		if (data.error) {
			throw new Error(data.error);
		}

		localStorage.setItem(SPOTIFY_TOKEN_KEY, data.access_token);
		localStorage.setItem(SPOTIFY_TOKEN_EXPIRY_KEY, data.expires_at.toString());

		return data.access_token;
	} catch (error) {
		console.error("Failed to get access token:", error);
		// Clear potentially invalid tokens
		localStorage.removeItem(SPOTIFY_TOKEN_KEY);
		localStorage.removeItem(SPOTIFY_TOKEN_EXPIRY_KEY);
		throw error;
	}
};
