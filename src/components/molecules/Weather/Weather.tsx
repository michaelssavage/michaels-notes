import { Loading } from "@/components/molecules/Loading";
import { getWeather } from "@/server/weather.api";
import { WeatherIcon } from "@/types/Weather";
import { useQuery } from "@tanstack/react-query";
import { useHydrated } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { SpeechBubble } from "./Weather.styled";

export const Weather = () => {
  const fetchMovies = useServerFn(getWeather);

  const hydrated = useHydrated();

  const { data, isLoading } = useQuery({
    queryKey: ["weather"],
    queryFn: () => fetchMovies(),
    refetchOnMount: false,
    refetchOnWindowFocus: true,
    enabled: hydrated,
  });

  if (!hydrated || isLoading) {
    return <Loading />;
  }

  if (!data || !data.current) {
    return null;
  }

  const icon = WeatherIcon[data.current.condition?.code];

  return (
    <SpeechBubble>
      {icon ? <img src={`/weather/${icon}.svg`} alt="" /> : null}
      <p>It&apos;s {data.current.temp_c}°C</p>
    </SpeechBubble>
  );
};
