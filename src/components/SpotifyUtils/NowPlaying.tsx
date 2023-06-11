import useSWR from "swr";
import Image from "next/image";
import { NOW_PLAYING_ENDPOINT } from "utils/constants";
import { getNowPlaying } from "api/spotify";
import { NowPlayingProps } from "utils/spotify-types";
import styles from "./spotify.module.scss";
import { Spotify } from "../icons";
import { AnimatedBars } from ".";

export const NowPlaying = () => {
  const { data } = useSWR<NowPlayingProps>(NOW_PLAYING_ENDPOINT, getNowPlaying);

  return (
    <div className={styles.container}>
      <div className={styles.itemsInRow}>
        {data?.isPlaying ? (
          <>
            <Image src={data.albumImageUrl} alt="spotify logo" width={90} />
            <AnimatedBars />
            <div className={styles.textAndMeta}>
              <p className={styles.songInfo}>
                {data.artist} - {data.title}
              </p>
              <p>
                {data.year} - {data.album}
              </p>
            </div>
          </>
        ) : (
          <>
            <Spotify size={90} />
            <p>Nothing Currently </p>
          </>
        )}
      </div>
    </div>
  );
};
