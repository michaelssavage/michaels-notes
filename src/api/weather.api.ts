import { IWeather } from "@/types/Weather";
import { createServerFn } from "@tanstack/react-start";
import { env } from "cloudflare:workers";

const WEATHER_API = env.VITE_WEATHER_API;

export const getWeather = createServerFn({
  method: "GET",
}).handler(async (): Promise<IWeather> => {
  const url = new URL("https://api.weatherapi.com/v1/current.json");
  url.searchParams.set("q", "Barcelona");
  url.searchParams.set("key", WEATHER_API);

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: { accept: "application/json" },
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `Weather API error (${response.status}): ${body || "empty response"}`
    );
  }
  const data: IWeather = await response.json();
  return data;
});
