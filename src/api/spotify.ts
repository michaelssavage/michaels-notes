import axios from "axios";
import {
  basic,
  NOW_PLAYING_ENDPOINT,
  refresh_token,
  TOKEN_ENDPOINT,
  TOP_TRACKS_ENDPOINT,
} from "utils/constants";
import { ArtistProp, TrackProp } from "utils/spotify-types";

const getAccessToken = async () => {
  const payload = { grant_type: "refresh_token", refresh_token };
  const config = {
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  const { data } = await axios.post(TOKEN_ENDPOINT, payload, config);
  return { headers: { Authorization: `Bearer ${data.access_token}` } };
};

export const getNowPlaying = async () => {
  const config = await getAccessToken();

  const { data } = await axios.get(NOW_PLAYING_ENDPOINT, config);

  const isPlaying = data.is_playing;
  const title = data.item.name;
  const artist = data.item.artists.map((_artist: ArtistProp) => _artist.name).join(", ");
  const album = data.item.album.name;
  const albumImageUrl = data.item.album.images[0].url;
  const songUrl = data.item.external_urls.spotify;

  return { isPlaying, title, artist, album, albumImageUrl, songUrl };
};

export const getTopTracks = async () => {
  const config = await getAccessToken();

  const res = await axios.get(TOP_TRACKS_ENDPOINT, config);
  const { items } = res.data;

  const tracks = items.slice(0, 12).map((track: TrackProp) => ({
    artist: track.artists.map((_artist: ArtistProp) => _artist.name).join(", "),
    albumImageUrl: track.album.images[0].url,
    songUrl: track.external_urls.spotify,
    title: track.name,
  }));

  return tracks;
};
