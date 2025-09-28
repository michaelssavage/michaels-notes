import { fetchTheWeather } from "@/api/get-weather.api";
import { Loading } from "@/components/molecules/Loading";
import { type IWeather, WeatherIcon } from "@/types/Weather";
import { useQuery } from "@tanstack/react-query";
import { SpeechBubble } from "./Weather.styled";

export const Weather = () => {
  const { data, isLoading } = useQuery<IWeather>({
    queryKey: ["top-tracks"],
    queryFn: fetchTheWeather,
    refetchOnMount: false,
    refetchOnWindowFocus: true,
  });

  if (isLoading) {
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
