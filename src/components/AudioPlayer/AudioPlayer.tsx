import { Player } from "@/components/AudioPlayer/AudioPlayer.styled";
import { Picture } from "@/components/Picture";
import { PauseIcon, PlayIcon } from "@/components/icons";
import { css } from "@emotion/react";
import { type FC, useRef, useState } from "react";

interface AudioPlayerProps {
  audioUrl: string;
  pic: string;
}

export const AudioPlayer: FC<AudioPlayerProps> = ({ pic, audioUrl }) => {
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
    <Player>
      <Picture
        src={pic}
        alt="Album Art"
        ar="1"
        style={css`
          width: 100%;
        `}
      />
      <button type="button" onClick={togglePlayPause}>
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>

      <audio ref={audioRef} src={audioUrl}>
        <track kind="captions" />
      </audio>
    </Player>
  );
};
