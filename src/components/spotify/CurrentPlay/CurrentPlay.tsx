import {
  ExternalLinkIcon,
  MaximiseIcon,
  MinimiseIcon,
} from "@/components/icons";
import { Picture } from "@/components/molecules/Picture";
import { useTheme } from "@/context/ThemeProvider";
import { getContrastYIQ, getRandomColor } from "@/lib/colors";
import useExtractColor from "@/lib/extractColor";
import { getLastFmTrack } from "@/server/lastfm-track.api";
import { getSpotifyTrack } from "@/server/spotify-track.api";
import { css } from "@emotion/react";
import { animated, useSpring } from "@react-spring/web";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import DOMPurify from "isomorphic-dompurify";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Comp,
  Content,
  ExpandButton,
  FactContent,
  FactLink,
  NowPlaying,
  Player,
  Title,
} from "./CurrentPlay.styled";

export const CurrentPlay = () => {
  const [expanded, setExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const { lightTheme: theme } = useTheme();

  const spotifyFn = useServerFn(getSpotifyTrack);
  const factFn = useServerFn(getLastFmTrack);

  const { data: trackData, isLoading } = useQuery({
    queryKey: ["spotifyTrack"],
    queryFn: spotifyFn,
    refetchInterval: 10000,
  });

  const { data: trackFact, error: trackFactError } = useQuery({
    queryKey: ["trackFact", trackData?.artist],
    queryFn: () => factFn({ data: { artist: trackData?.artist ?? "" } }),
    enabled: Boolean(trackData?.artist),
  });

  const { dominantColor } = useExtractColor(trackData?.albumArtUrl || "");

  const factColor = useMemo(
    () => (dominantColor ? getContrastYIQ(dominantColor) : theme.gray400),
    [dominantColor, theme.gray400]
  );

  const fact = DOMPurify.sanitize(trackFact?.artist?.bio?.summary ?? "");
  const hasFact = trackFact?.artist?.bio?.content !== "";

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

  const randomColor = useMemo(() => getRandomColor(), []);

  const springs = useSpring({
    opacity: fact ? 1 : 0,
    height: expanded ? contentHeight : 15,
    config: { duration: 300 },
  });

  if (trackFactError) {
    console.log("Last fm error: ", trackFactError);
  }

  if (isLoading) return <div>Loading...</div>;

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
              {!hasFact && (
                <FactLink
                  factColor={factColor}
                  dangerouslySetInnerHTML={{ __html: fact }}
                />
              )}
            </Content>
          </Player>

          {hasFact && (
            <>
              <animated.div style={{ ...springs, overflow: "hidden" }}>
                <FactContent
                  ref={contentRef}
                  color={dominantColor ?? ""}
                  factColor={factColor}
                  dangerouslySetInnerHTML={{ __html: fact }}
                />
              </animated.div>

              <ExpandButton
                onClick={() => setExpanded((prev) => !prev)}
                color={randomColor}
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
