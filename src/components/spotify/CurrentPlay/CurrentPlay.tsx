import { fetchCurrentTrack, fetchRecentTrack } from "@/api/fetch-current-track";
import { ExternalLinkIcon } from "@/components/icons";
import { AudioPlayer } from "@/components/molecules/AudioPlayer";
import useExtractColor from "@/lib/extractColor";
import type { IPlayTrack } from "@/types/Spotify";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { Comp, NowPlaying, Title } from "./CurrentPlay.styled";

export const CurrentPlay = () => {
	const currentTrack = useQuery<IPlayTrack>({
		queryKey: ["currentTrack"],
		queryFn: fetchCurrentTrack,
		refetchInterval: 30000, // Refetch every 30 seconds
	});

	const recentTrack = useQuery<IPlayTrack>({
		queryKey: ["recentTrack"],
		queryFn: fetchRecentTrack,
		enabled: !currentTrack?.data?.isPlaying,
	});

	const trackData = currentTrack?.data?.isPlaying
		? currentTrack?.data
		: recentTrack?.data;

	const { dominantColor } = useExtractColor(trackData?.albumArtUrl || "");

	const memoizedColor = useMemo(() => dominantColor, [dominantColor]);

	if (currentTrack?.isLoading || recentTrack?.isLoading)
		return <div>Loading...</div>;

	return (
		<Comp>
			<Title>
				{trackData?.isPlaying ? "Now Playing:" : "Recently Played:"}
			</Title>
			{trackData && (
				<NowPlaying color={memoizedColor ?? ""}>
					<AudioPlayer data={trackData} color={memoizedColor ?? ""} />

					<Link to={trackData?.trackUrl}>
						<ExternalLinkIcon />
					</Link>
				</NowPlaying>
			)}
		</Comp>
	);
};
