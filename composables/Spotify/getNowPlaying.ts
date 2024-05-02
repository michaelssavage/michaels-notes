import type { GetNowPlayingResponse, GetNowPlayingTransformed } from "./Types";

export const getNowPlaying = async (accessToken: string) => {
  return await $fetch<GetNowPlayingResponse>(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

export const transformNowPlaying = (res: GetNowPlayingResponse) => {
  const data: GetNowPlayingTransformed = {
    isPlaying: res.is_playing,
    trackTitle: res.item.name,
    artist: res.item.album.artists.map(({ name }) => name).join(", "),
    album: res.item.album.name,
    albumArtUrl: res.item.album.images[0].url,
    trackUrl: res.item.external_urls.spotify,
  };

  return data;
};
