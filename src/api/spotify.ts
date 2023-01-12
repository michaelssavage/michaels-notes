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
  const data = { grant_type: "refresh_token", refresh_token };
  const config = {
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  const res = await axios.post(TOKEN_ENDPOINT, data, config);

  return res.data;
};

export const getNowPlaying = async () => {
  const { access_token } = await getAccessToken();
  const config = { headers: { Authorization: `Bearer ${access_token}` } };

  const res = await axios.get(NOW_PLAYING_ENDPOINT, config);
  const song = await res.data;

  const isPlaying = song.is_playing;
  const title = song.item.name;
  const artist = song.item.artists.map((_artist: ArtistProp) => _artist.name).join(", ");
  const album = song.item.album.name;
  const albumImageUrl = song.item.album.images[0].url;
  const songUrl = song.item.external_urls.spotify;

  return { isPlaying, title, artist, album, albumImageUrl, songUrl };
};

export const getTopTracks = async () => {
  const { access_token } = await getAccessToken();
  const config = { headers: { Authorization: `Bearer ${access_token}` } };

  const res = await axios.get(TOP_TRACKS_ENDPOINT, config);
  const { items } = await res.data;

  const tracks = items.slice(0, 10).map((track: TrackProp) => ({
    artist: track.artists.map((_artist: ArtistProp) => _artist.name).join(", "),
    songUrl: track.external_urls.spotify,
    title: track.name,
  }));

  return tracks;
};
