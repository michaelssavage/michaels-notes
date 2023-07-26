import useSWR from "swr";
import Image from "next/image";
import axios from "axios";
import { Spotify } from "components/icons";
import { NowPlayingProps } from "types/spotify";
import styles from "./NowPlaying.module.scss";
import { AnimatedBars } from "./AnimatedBars";

export const NowPlaying = () => {
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { data, isLoading } = useSWR<NowPlayingProps>(
    "/api/now-playing",
    fetcher
  );

  if (isLoading) return <div>loading...</div>;

  const showIsPlaying = (isPlaying?: boolean) => {
    if (data && isPlaying)
      return (
        <div className={styles.nowPlayingCard}>
          <Image
            src={data.albumImageUrl}
            alt="spotify logo"
            width={120}
            height={120}
          />
          <div className={styles.textAndMeta}>
            <p className={styles.yearAlbum}>
              {data.album} ({data.year})
            </p>
            <p className={styles.artist}>{data.artist}</p>
            <p className={styles.song}>
              <AnimatedBars /> {data.title}
            </p>
          </div>
        </div>
      );

    return (
      <div className={styles.notPlaying}>
        <Spotify size={50} />
        <p>Nothing Currently </p>
      </div>
    );
  };

  return (
    <div className={styles.container}>{showIsPlaying(data?.isPlaying)}</div>
  );
};
