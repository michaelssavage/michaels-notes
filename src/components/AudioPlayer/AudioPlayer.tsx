import { Picture } from "@/components/Picture";
import { PauseIcon, PlayIcon } from "@/components/icons";
import type { IPlayTrack } from "@/types/Spotify";
import { css } from "@emotion/react";
import { type FC, useCallback, useEffect, useRef, useState } from "react";
import {
  Content,
  Control,
  InteractWrapper,
  Player,
} from "./AudioPlayer.styled";
import { Visualizer } from "./Visualizer";

interface AudioPlayerProps {
  data: IPlayTrack;
  color: string;
}

export const AudioPlayer: FC<AudioPlayerProps> = ({ data, color }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const updateProgress = useCallback(() => {
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime;
      const duration = audioRef.current.duration || 30;
      const progressPercentage = (currentTime / duration) * 100;
      setProgress(progressPercentage);

      animationFrameRef.current = requestAnimationFrame(updateProgress);
    }
  }, []);

  const togglePlayPause = useCallback(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      } else {
        audioRef.current.play();
        animationFrameRef.current = requestAnimationFrame(updateProgress);
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying, updateProgress]);

  const resetAudio = useCallback(() => {
    setIsPlaying(false);
    setProgress(0);
  }, []);

  return (
    <Player isPlaying={isPlaying} color={color}>
      <Picture
        src={data.albumArtUrl || ""}
        alt="Album Art"
        ar="1"
        style={css`
          width: 120px;
        `}
      />

      <Content>
        <h3>{data.trackTitle}</h3>
        <p>{data.artist}</p>
      </Content>

      <audio ref={audioRef} src={data.preview} onEnded={resetAudio}>
        <track kind="captions" />
      </audio>

      <InteractWrapper>
        {progress > 0 && isPlaying ? <p>{progress.toFixed(0)}%</p> : null}

        <Visualizer isPlaying={isPlaying} />

        <Control type="button" onClick={togglePlayPause}>
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </Control>
      </InteractWrapper>
    </Player>
  );
};
