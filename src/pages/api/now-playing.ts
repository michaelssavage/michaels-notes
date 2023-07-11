import { NextApiRequest, NextApiResponse } from "next";
import { getNowPlaying } from "lib/spotify";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const response = await getNowPlaying();

    if (
      response.status === 204 ||
      response.status > 400 ||
      response.data.currently_playing_type !== "track"
    ) {
      //? s-maxage=180 because song usually lasts 3 minutes
      res.setHeader(
        "Cache-Control",
        "public, s-maxage=180, stale-while-revalidate=90"
      );
      return res.status(200).json({ isPlaying: false });
    }
    const data = {
      isPlaying: response.data.is_playing,
      title: response.data.item.name,
      album: response.data.item.album.name,
      artist: response.data.item.album.artists
        .map((artist) => artist.name)
        .join(", "),
      albumImageUrl: response.data.item.album.images[0].url,
      songUrl: response.data.item.external_urls.spotify,
      year: response.data.item.album.release_date.split("-")[0],
    };

    res.setHeader(
      "Cache-Control",
      "public, s-maxage=180, stale-while-revalidate=90"
    );
    return res.status(200).json(data);
  }
};
