import type { AccessTokenI, SpotifyTopTracksI } from '~/types/Spotify';

export default defineEventHandler(async (_event) => {
	const { spotifyClientId, spotifyClientSecret, spotifyRefreshToken } = useRuntimeConfig();
	const basic = Buffer.from(`${spotifyClientId}:${spotifyClientSecret}`).toString('base64');

	const headers = {
		'Authorization': `Basic ${basic}`,
		'Content-Type': 'application/x-www-form-urlencoded',
	};

	const getAccessToken = async () => {
		const data = await $fetch<AccessTokenI>('https://accounts.spotify.com/api/token', {
			method: 'POST',
			headers: headers,
			body: new URLSearchParams({
				grant_type: 'refresh_token',
				refresh_token: spotifyRefreshToken,
			}).toString(),
		});
		return data;
	};

	const getTopTracks = async () => {
		const { access_token } = await getAccessToken();

		return $fetch<SpotifyTopTracksI>('https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=5', {
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		});
	};
	return (await getTopTracks()).items;
});

// not going to work because of insufficient client scope
