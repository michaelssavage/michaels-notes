import type {
  GetNowPlayingResponse,
  GetNowPlayingTransformed,
} from "~/types/Spotify";

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
