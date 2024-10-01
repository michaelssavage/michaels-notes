import { Picture } from "@/components/Picture";
import { PauseIcon, PlayIcon } from "@/components/icons";
import { css } from "@emotion/react";
import type { ReactNode } from "@tanstack/react-router";
import { type FC, useRef, useState } from "react";
import { Control, Player } from "./AudioPlayer.styled";
import { Visualizer } from "./Visualizer";

interface AudioPlayerProps {
  audioUrl: string;
  pic: string;
  children: ReactNode;
}

export const AudioPlayer: FC<AudioPlayerProps> = ({
  pic,
  audioUrl,
  children,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <Player isPlaying={isPlaying}>
      <Picture
        src={pic}
        alt="Album Art"
        ar="1"
        style={css`
          width: 120px;
        `}
      />

      <audio ref={audioRef} src={audioUrl}>
        <track kind="captions" />
      </audio>

      <Control type="button" onClick={togglePlayPause}>
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </Control>

      {children}

      <Visualizer isPlaying={isPlaying} />
    </Player>
  );
};
