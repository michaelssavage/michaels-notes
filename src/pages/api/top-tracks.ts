import { NextApiRequest, NextApiResponse } from "next";
import { getTopTracks } from "lib/spotify";
import { TrackProp } from "../../types/spotify";

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  const response = await getTopTracks();

  const tracks = response.data.items.slice(0, 10).map((track: TrackProp) => ({
    artist: track.artists.map((_artist) => _artist.name).join(", "),
    songUrl: track.external_urls.spotify,
    title: track.name,
  }));

  return res.status(200).json({ tracks });
};
