import { fetchTopTracks } from "@/api/fetch-top-tracks";
import { ExternalLinkIcon } from "@/components/icons";
import { getRandomColor } from "@/lib/colors";
import type { ITopTrack } from "@/types/Spotify";
import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import {
  ArtistName,
  Card,
  CardContainer,
  ComponentWrapper,
  LeftScrollButton,
  RightScrollButton,
  ScrollContainer,
  Title,
  TrackName,
} from "./TopTracks.styled";

export const TopTracks = () => {
  const { data, isLoading } = useQuery<Array<ITopTrack>>({
    queryKey: ["top-tracks"],
    queryFn: fetchTopTracks,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const currentScroll = scrollContainerRef.current.scrollLeft;
      scrollContainerRef.current.scrollTo({
        left:
          direction === "left"
            ? currentScroll - scrollAmount
            : currentScroll + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No tracks available</div>;
  }

  return (
    <ComponentWrapper>
      <Title>Most played tracks:</Title>
      <ScrollContainer ref={scrollContainerRef}>
        <CardContainer>
          {data.map((track) => (
            <Card key={track.name} to={track.url} color={getRandomColor()}>
              <ExternalLinkIcon />
              <TrackName>{track.name}</TrackName>
              <ArtistName>{track.artists}</ArtistName>
            </Card>
          ))}
        </CardContainer>
        <LeftScrollButton onClick={() => handleScroll("left")}>
          &lt;
        </LeftScrollButton>
        <RightScrollButton onClick={() => handleScroll("right")}>
          &gt;
        </RightScrollButton>
      </ScrollContainer>
    </ComponentWrapper>
  );
};
