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
import { Picture } from "@/components/molecules/Picture";
import { getRandomColor } from "@/lib/colors";
import useExtractColor from "@/lib/extractColor";
import type { IPlayTrack } from "@/types/Spotify";
import { css } from "@emotion/react";
import { animated, useSpring } from "@react-spring/web";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Comp,
  Content,
  ExpandButton,
  FactContent,
  NowPlaying,
  Player,
  Title,
} from "./CurrentPlay.styled";

export const CurrentPlay = () => {
  const [expanded, setExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const currentTrack = useQuery<IPlayTrack>({
    queryKey: ["currentTrack"],
    queryFn: fetchCurrentTrack,
    refetchInterval: 10000, // Refetch every 10 seconds
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

  const fact = trackFact.data?.artist?.bio?.summary ?? "";

  useEffect(() => {
    const element = contentRef.current;
    if (!element) return;

    const resizeObserver = new ResizeObserver(() => {
      setContentHeight(element.scrollHeight);
    });

    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const springs = useSpring({
    opacity: fact ? 1 : 0,
    height: expanded ? contentHeight : 12,
    config: { duration: 300 },
  });

  if (trackFact.error) {
    console.log("Last fm error: ", trackFact.error);
  }

  if (currentTrack?.isLoading || recentTrack?.isLoading)
    return <div>Loading...</div>;

  return (
    <Comp>
      <Title>
        {trackData?.isPlaying ? "Now Playing:" : "Recently Played:"}
      </Title>
      {trackData && (
        <NowPlaying color={dominantColor ?? ""}>
          <Player color={dominantColor ?? ""}>
            <Picture
              src={trackData.albumArtUrl || ""}
              alt="Album Art"
              ar="1"
              style={css`
                width: 120px;
                flex-shrink: 0;
              `}
            />
            <Content>
              <h3>{trackData.trackTitle}</h3>
              <p id="artist-name">{trackData.artist}</p>
            </Content>
          </Player>

          {fact && (
            <>
              <animated.div style={{ ...springs, overflow: "hidden" }}>
                <FactContent
                  ref={contentRef}
                  color={dominantColor ?? ""}
                  dangerouslySetInnerHTML={{ __html: fact }}
                />
              </animated.div>

              <ExpandButton
                onClick={() => setExpanded((prev) => !prev)}
                color={getRandomColor()}
              >
                {expanded ? <MinimiseIcon /> : <MaximiseIcon />}
                {expanded ? "minimise" : "read more"}
              </ExpandButton>
            </>
          )}

          <Link id="external-track-url" to={trackData?.trackUrl}>
            <ExternalLinkIcon />
          </Link>
        </NowPlaying>
      )}
    </Comp>
  );
};
