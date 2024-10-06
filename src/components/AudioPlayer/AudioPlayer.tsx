import { Picture } from "@/components/Picture";
import { PauseIcon, PlayIcon } from "@/components/icons";
import type { IPlayTrack } from "@/types/Spotify";
import { css } from "@emotion/react";
import { type FC, useRef, useState } from "react";
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

      <audio ref={audioRef} src={data.preview}>
        <track kind="captions" />
      </audio>

      <InteractWrapper>
        <Visualizer isPlaying={isPlaying} />

        <Control type="button" onClick={togglePlayPause}>
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </Control>
      </InteractWrapper>
    </Player>
  );
};
