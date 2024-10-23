import { fetchTheWeather } from "@/api/get-weather";
import { Loading } from "@/components/molecules/Loading";
import { type IWeather, WeatherIcon } from "@/types/Weather";
import { useQuery } from "@tanstack/react-query";
import { SpeechBubble } from "./Weather.styled";

export const Weather = () => {
	const { data, isLoading } = useQuery<IWeather>({
		queryKey: ["top-tracks"],
		queryFn: fetchTheWeather,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
	});

	if (isLoading) {
		return <Loading />;
	}

	if (!data) {
		return null;
	}

	const icon = WeatherIcon[data?.current?.condition?.code];

	return (
		<SpeechBubble>
			{icon ? <img src={`/weather/${icon}.svg`} alt="" /> : null}
			Today it's {data?.current?.temp_c}°C
		</SpeechBubble>
	);
};
