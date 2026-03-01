import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const MapsLinkSchema = z.object({
  link: z.string().min(1),
});

type LatLng = { lat: number; lng: number } | null;

export const mapsLinkCache = new Map<string, LatLng>();

function extractCoordsFromUrl(url: string): LatLng {
  // ?q=lat,lng
  const qMatch = url.match(/[?&]q=(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (qMatch) {
    return { lat: Number(qMatch[1]), lng: Number(qMatch[2]) };
  }

  // /@lat,lng,zoom
  const atMatch = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (atMatch) {
    return { lat: Number(atMatch[1]), lng: Number(atMatch[2]) };
  }

  return null;
}

export const resolveMapsCoordsFn = createServerFn({ method: "GET" })
  .inputValidator(MapsLinkSchema)
  .handler(async ({ data }) => {
    let finalUrl = data.link;

    if (data.link.includes("goo.gl")) {
      const res = await fetch(data.link, { redirect: "follow" });
      finalUrl = res.url;
    }

    const coords = extractCoordsFromUrl(finalUrl);
    if (coords) return coords;
  });
