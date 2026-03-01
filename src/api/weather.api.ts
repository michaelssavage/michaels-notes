import { IWeather } from "@/types/Weather";
import { createServerFn } from "@tanstack/react-start";
import { env } from "cloudflare:workers";

const WEATHER_API = env.VITE_WEATHER_API;

export const getWeather = createServerFn({
  method: "GET",
}).handler(async (): Promise<IWeather> => {
  const response = await fetch(
    "https://api.weatherapi.com/v1/current.json?q=Barcelona",
    {
      method: "POST",
      headers: {
        key: WEATHER_API,
        accept: "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data: IWeather = await response.json();
  return data;
});
