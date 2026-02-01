import { Group } from "@/components/atoms/Group";
import { Slider } from "@/components/form/Slider";
import {
  PauseIcon,
  PlayIcon,
  SkipBackIcon,
  SkipForwardIcon,
} from "@/components/icons";
import { Anchor } from "@/components/molecules/Anchor";
import { Button } from "@/components/molecules/Button";
import { css } from "@emotion/react";
import { useWavesurfer } from "@wavesurfer/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Description, MixCard, MixDate, Time } from "./AudioStreamer.styled";

const formatTime = (seconds: number) => {
  if (!seconds || Number.isNaN(seconds)) return "0:00";

  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  return hours > 0
    ? `${hours}:${mins.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`
    : `${mins}:${secs.toString().padStart(2, "0")}`;
};

const extractServiceName = (url: string) => {
  if (url.includes("mixcloud")) return "Mixcloud";
  if (url.includes("soundcloud")) return "SoundCloud";
  if (url.includes("spotify")) return "Spotify";
  return "External";
};

interface WaveformDataI {
  version: number;
  channels: number;
  sample_rate: number;
  samples_per_pixel: number;
  bits: number;
  length: number;
  data: Array<number>;
}

interface Props {
  title: string;
  date?: string;
  description?: string;
  audioUrl: string;
  waveFormData: string;
  externalUrl?: string;
}

const groupStyle = css`
  margin: 1rem 0;
`;

export const AudioStreamer = ({
  title,
  date,
  description,
  audioUrl,
  waveFormData,
  externalUrl,
}: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [zoom, setZoom] = useState(1);
  const [waveformDataObj, setWaveformDataObj] = useState<WaveformDataI | null>(
    null
  );

  useEffect(() => {
    const fetchWaveformData = async () => {
      try {
        const response = await fetch(waveFormData);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch waveform data: ${response.statusText}`
          );
        }
        const data: WaveformDataI = await response.json();
        setWaveformDataObj(data);
      } catch (error) {
        console.error("Error fetching waveform data:", error);
      }
    };

    if (waveFormData) {
      fetchWaveformData();
    }
  }, [waveFormData]);

  const peaks = useMemo(
    () => (waveformDataObj ? [waveformDataObj.data] : undefined),
    [waveformDataObj]
  );

  const { wavesurfer, isReady, isPlaying, currentTime } = useWavesurfer({
    container: containerRef,
    url: audioUrl,
    waveColor: "#716eef",
    peaks,
    height: 75,
    minPxPerSec: 100,
    dragToSeek: true,
    autoScroll: false,
    autoCenter: false,
  });

  const duration = wavesurfer?.getDuration() ?? 0;

  const onPlayPause = () => wavesurfer?.playPause();
  const onBackward = () => wavesurfer?.skip(-15);
  const onForward = () => wavesurfer?.skip(15);

  useEffect(() => {
    if (wavesurfer && isReady) {
      wavesurfer.zoom(zoom);
    }
  }, [wavesurfer, zoom, isReady]);

  const getWrapper = useCallback((): HTMLElement | null => {
    return wavesurfer?.getWrapper() ?? null;
  }, [wavesurfer]);

  const getClientWidth = useCallback((): number => {
    return (
      wavesurfer?.getWidth() ||
      getWrapper()?.clientWidth ||
      containerRef.current?.clientWidth ||
      0
    );
  }, [getWrapper, wavesurfer]);

  const getScrollLeft = useCallback((): number => {
    return wavesurfer?.getScroll() || getWrapper()?.scrollLeft || 0;
  }, [getWrapper, wavesurfer]);

  const setScrollLeft = useCallback(
    (value: number) => {
      const wrapper = getWrapper();
      if (wavesurfer?.setScroll) {
        wavesurfer.setScroll(value);
      } else if (wrapper) {
        wrapper.scrollLeft = value;
      }
    },
    [getWrapper, wavesurfer]
  );

  const handleZoom = useCallback(
    (deltaY: number) => {
      const ZOOM_STEP = 5;
      const newZoom = Math.min(
        100,
        Math.max(1, zoom + (deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP))
      );
      setZoom(newZoom);
    },
    [zoom]
  );

  const handlePan = useCallback(
    (deltaX: number) => {
      const wrapper = getWrapper();
      if (!wrapper) return;

      const clientWidth = getClientWidth();
      const maxScroll = wrapper.scrollWidth - clientWidth;
      if (maxScroll <= 0) return;

      const SCROLL_MULTIPLIER = 1;
      let newScroll = getScrollLeft() + deltaX * SCROLL_MULTIPLIER;
      newScroll = Math.max(0, Math.min(maxScroll, newScroll));
      setScrollLeft(newScroll);
    },
    [getClientWidth, getScrollLeft, setScrollLeft, getWrapper]
  );

  useEffect(() => {
    if (!wavesurfer) return;

    const handleWheel = (e: WheelEvent) => {
      const container = containerRef.current;
      if (!container || !container.contains(e.target as Node)) return;

      const { deltaX, deltaY } = e;
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);
      const THRESHOLD = 0.5;
      if (absX < THRESHOLD && absY < THRESHOLD) return;

      if (absX > absY) {
        // horizontal → pan
        e.preventDefault();
        handlePan(deltaX);
      } else {
        // vertical → zoom
        e.preventDefault();
        handleZoom(deltaY);
      }
    };

    const container = containerRef.current;
    container?.addEventListener("wheel", handleWheel, { passive: false });
    return () => container?.removeEventListener("wheel", handleWheel);
  }, [wavesurfer, handlePan, handleZoom]);

  return (
    <MixCard>
      <Group direction="row" gap="2rem" justify="space-between" align="center">
        <h2>{title}</h2>
        {date && <MixDate>{date}</MixDate>}
      </Group>

      <div ref={containerRef} />

      <Group
        direction="row"
        align="center"
        gap="1rem"
        justify="space-between"
        wrap="wrap"
        css={groupStyle}
      >
        <Group direction="row" align="center" gap="1rem">
          <Button
            variant="ghost"
            onClick={onBackward}
            icon={<SkipBackIcon size={24} />}
          />
          <Button
            variant="ghost"
            onClick={onPlayPause}
            icon={isPlaying ? <PauseIcon size={24} /> : <PlayIcon size={24} />}
          />
          <Button
            variant="ghost"
            onClick={onForward}
            icon={<SkipForwardIcon size={24} />}
          />
          <Time>
            {formatTime(currentTime)} / {formatTime(duration)}
          </Time>
        </Group>

        <Group direction="row" align="center" gap="1rem">
          <p>Zoom:</p>
          <Slider value={zoom} onChange={setZoom} min={1} max={100} />
        </Group>
      </Group>

      {description && <Description>{description}</Description>}
      {externalUrl && (
        <Description>
          Listen on{" "}
          <Anchor
            link={externalUrl}
            text={extractServiceName(externalUrl)}
            isExternal
          />
        </Description>
      )}
    </MixCard>
  );
};
