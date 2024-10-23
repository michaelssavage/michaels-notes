import { fetchTopTracks } from "@/api/top-tracks";
import { ExternalLinkIcon } from "@/components/icons";
import { Scroll } from "@/components/molecules/Scroll";
import { getRandomColor } from "@/lib/colors";
import type { ITopTrack } from "@/types/Spotify";
import { useQuery } from "@tanstack/react-query";
import { ArtistName, Card, TrackName } from "./TopTracks.styled";

export const TopTracks = () => {
	const { data, isLoading } = useQuery<Array<ITopTrack>>({
		queryKey: ["top-tracks"],
		queryFn: fetchTopTracks,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
	});

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (!data || data.length === 0 || !Array.isArray(data)) {
		return <div>No tracks available</div>;
	}

	return (
		<Scroll title="Most played tracks">
			{data.map((track) => (
				<Card key={track.name} to={track.url} color={getRandomColor()}>
					<ExternalLinkIcon />
					<TrackName>{track.name}</TrackName>
					<ArtistName>{track.artists}</ArtistName>
				</Card>
			))}
		</Scroll>
	);
};
