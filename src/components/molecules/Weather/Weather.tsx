import { getWeather } from "@/api/weather.api";
import { Group } from "@/components/atoms/Group";
import { Loading } from "@/components/molecules/Loading";
import { useQuery } from "@tanstack/react-query";
import { useHydrated } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { SpeechBubble } from "./Weather.styled";

export const Weather = () => {
  const fetchWeather = useServerFn(getWeather);

  const hydrated = useHydrated();

  const { data, isLoading } = useQuery({
    queryKey: ["weather"],
    queryFn: fetchWeather,
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

  return (
    <SpeechBubble>
      <Group direction="row" gap="4px" justify="center">
        {data.current.condition?.icon ? (
          <img src={data.current.condition?.icon} alt="" />
        ) : null}

        <p>It&apos;s {data.current.temp_c}°C</p>
      </Group>
      <p>{data.current.condition?.text}</p>
    </SpeechBubble>
  );
};
