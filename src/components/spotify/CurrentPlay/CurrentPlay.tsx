import {
	fetchCurrentTrack,
	fetchRecentTrack,
} from "@/api/fetch-current-track.api";
import { ExternalLinkIcon } from "@/components/icons";
import {
	Content,
	Player,
} from "@/components/molecules/AudioPlayer/AudioPlayer.styled";
import { Picture } from "@/components/molecules/Picture";
import useExtractColor from "@/lib/extractColor";
import type { IPlayTrack } from "@/types/Spotify";
import { css } from "@emotion/react";
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

	console.log("!!!!", {
		currentTrack,
		recentTrack,
	});

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
					<Player color={memoizedColor ?? ""}>
						<Picture
							src={trackData.albumArtUrl || ""}
							alt="Album Art"
							ar="1"
							style={css`width: 120px;`}
						/>
						<Content>
							<h3>{trackData.trackTitle}</h3>
							<p>{trackData.artist}</p>
						</Content>
					</Player>

					<Link to={trackData?.trackUrl}>
						<ExternalLinkIcon />
					</Link>
				</NowPlaying>
			)}
		</Comp>
	);
};
