import { getLastFmTrack } from "@/api/lastfm-track.api";
import { getSpotifyTrack } from "@/api/spotify-track.api";
import { Group } from "@/components/atoms/Group";
import {
  ExternalLinkIcon,
  MaximiseIcon,
  MinimiseIcon,
} from "@/components/icons";
import { Picture } from "@/components/molecules/Picture";
import { CurrentPlaySkeleton } from "@/components/spotify/CurrentPlay/CurrentPlaySkeleton";
import { useSanitizedHTML } from "@/hooks/use-sanitized-html.hook";
import { getContrastYIQ, getRandomColor } from "@/lib/colors";
import useExtractColor from "@/lib/extractColor";
import { css } from "@emotion/react";
import { animated, useSpring } from "@react-spring/web";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Comp,
  Content,
  ExpandButton,
  FactContent,
  FactLink,
  NowPlaying,
  Title,
} from "./CurrentPlay.styled";

const COLLAPSED_HEIGHT = 15;

export const CurrentPlay = () => {
  // Which artist's bio is expanded; a new artist starts collapsed.
  const [expandedArtist, setExpandedArtist] = useState<string | null>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const spotifyFn = useServerFn(getSpotifyTrack);
  const factFn = useServerFn(getLastFmTrack);

  const trackQuery = useQuery({
    queryKey: ["spotifyTrack"],
    queryFn: spotifyFn,
    refetchInterval: 10000,
  });
  const trackData = trackQuery.data;

  const { data: trackFact, error: trackFactError } = useQuery({
    queryKey: ["trackFact", trackData?.artist],
    queryFn: () => factFn({ data: { artist: trackData?.artist ?? "" } }),
    enabled: Boolean(trackData?.artist),
    throwOnError: false,
  });

  const { dominantColor } = useExtractColor(trackData?.albumArtUrl || "");

  const factColor = useMemo(
    () =>
      dominantColor ? getContrastYIQ(dominantColor) : "var(--color-gray600)",
    [dominantColor],
  );

  const bio = trackFact?.artist?.bio;
  const fact = useSanitizedHTML(bio?.summary ?? "");
  const factDisplay: "none" | "summary" | "expandable" =
    !bio || !fact ? "none" : bio.content === "" ? "summary" : "expandable";

  const expanded =
    Boolean(trackData?.artist) && expandedArtist === trackData?.artist;

  useEffect(() => {
    if (contentRef.current && fact) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [fact]);

  useEffect(() => {
    const element = contentRef.current;
    if (!element) return;

    const resizeObserver = new ResizeObserver(() => {
      const fullHeight = element.scrollHeight;
      setContentHeight(fullHeight);
    });

    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, [factDisplay]);

  const randomColor = useMemo(() => getRandomColor(), []);

  const springs = useSpring({
    opacity: fact ? 1 : 0,
    height: expanded ? contentHeight : COLLAPSED_HEIGHT,
    config: { duration: 300 },
  });

  if (trackFactError) {
    console.log("Last fm error: ", trackFactError);
  }

  if (trackQuery.status === "pending") return <CurrentPlaySkeleton />;
  if (!trackData?.trackTitle) return null;

  return (
    <Comp>
      <Title>{trackData.isPlaying ? "Now Playing:" : "Recently Played:"}</Title>
      <NowPlaying color={dominantColor ?? ""}>
        <Group direction="row" gap="0" align="center">
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
            {factDisplay === "summary" && (
              <FactLink
                ref={contentRef}
                factColor={factColor}
                dangerouslySetInnerHTML={{ __html: fact }}
              />
            )}
          </Content>
        </Group>

        {factDisplay === "expandable" && (
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
              onClick={() =>
                setExpandedArtist(expanded ? null : (trackData.artist ?? null))
              }
              color={randomColor}
            >
              {expanded ? <MinimiseIcon /> : <MaximiseIcon />}
              {expanded ? "minimise" : "read more"}
            </ExpandButton>
          </>
        )}

        <Link id="external-track-url" to={trackData.trackUrl}>
          <ExternalLinkIcon />
        </Link>
      </NowPlaying>
    </Comp>
  );
};
