import { transformNowPlaying } from '~/composables/transformNowPlaying';
import type { AccessTokenI, GetNowPlayingResponse, GetNowPlayingTransformed, NotPlayingI } from '~/types/Spotify';

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

	const getNowPlaying = async (): Promise<GetNowPlayingTransformed | NotPlayingI> => {
		const { access_token } = await getAccessToken();
		const res = await $fetch<GetNowPlayingResponse>('https://api.spotify.com/v1/me/player/currently-playing', {
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		});

		if (!res || !res.item) return { isPlaying: false };
		return transformNowPlaying(res);
	};

	return getNowPlaying();
});
