import { NextApiRequest, NextApiResponse } from "next";
import { getNowPlaying } from "lib/spotify";

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  const response = await getNowPlaying();
  const data = await response.json();

  // const isPlaying = data.is_playing;
  // const year = data.item.album.release_date.split("-")[0];
  // const title = data.item.name;
  // const artist = data.item.artists
  //   .map((_artist: ArtistProp) => _artist.name)
  //   .join(", ");
  // const album = data.item.album.name;
  // const albumImageUrl = data.item.album.images[0].url;
  // const songUrl = data.item.external_urls.spotify;

  return res.status(200).json(data);
};
