import {
	fetchCurrentTrack,
	fetchRecentTrack,
} from "@/api/fetch-current-track.api";
import { getFact } from "@/api/lastfm-fact.api";
import {
	ExternalLinkIcon,
	MaximiseIcon,
	MinimiseIcon,
} from "@/components/icons";
import {
	Content,
	Player,
} from "@/components/molecules/AudioPlayer/AudioPlayer.styled";
import { Picture } from "@/components/molecules/Picture";
import { getRandomColor } from "@/lib/colors";
import useExtractColor from "@/lib/extractColor";
import type { IPlayTrack } from "@/types/Spotify";
import { css } from "@emotion/react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import DOMPurify from "dompurify";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import {
	Box,
	Comp,
	ExpandButton,
	FactContent,
	NowPlaying,
	Title,
} from "./CurrentPlay.styled";

export const CurrentPlay = () => {
	const [expanded, setExpanded] = useState(false);

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

	const trackFact = useQuery({
		queryKey: ["trackFact", trackData?.artist],
		queryFn: () => getFact(trackData?.artist ?? ""),
		enabled: Boolean(trackData?.artist),
	});

	const { dominantColor } = useExtractColor(trackData?.albumArtUrl || "");

	const memoizedColor = useMemo(() => dominantColor, [dominantColor]);

	const fact = useMemo(
		() => DOMPurify.sanitize(trackFact.data ?? ""),
		[trackFact.data],
	);

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
							style={css`width: 120px; flex-shrink: 0;`}
						/>
						<Content>
							<h3>{trackData.trackTitle}</h3>
							<Box layout>
								<p id="artist-name">{trackData.artist}</p>
							</Box>
						</Content>
					</Player>

					<AnimatePresence initial={false}>
						{trackFact.data && (
							<motion.div
								key="fact"
								layout
								initial={{ opacity: 0, height: 0 }}
								animate={{ height: expanded ? "auto" : 12 }}
								exit={{ opacity: 0, height: 0 }}
								transition={{ duration: 0.3 }}
								style={{ overflow: "hidden" }}
							>
								<FactContent
									// biome-ignore lint/security/noDangerouslySetInnerHtml: dom sanitised
									dangerouslySetInnerHTML={{ __html: fact }}
								/>
							</motion.div>
						)}
					</AnimatePresence>

					<ExpandButton
						onClick={() => setExpanded((prev) => !prev)}
						color={getRandomColor()}
					>
						{expanded ? <MinimiseIcon /> : <MaximiseIcon />}
						{expanded ? "minimise" : "read more"}
					</ExpandButton>

					<Link id="external-track-url" to={trackData?.trackUrl}>
						<ExternalLinkIcon />
					</Link>
				</NowPlaying>
			)}
		</Comp>
	);
};
