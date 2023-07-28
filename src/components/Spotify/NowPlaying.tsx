import useSWR from "swr";
import Image from "next/image";
import axios from "axios";
import { useState } from "react";
import { Spotify } from "components/Icons";
import { NowPlayingProps } from "types/spotify";
import styles from "./NowPlaying.module.scss";
import { AnimatedBars } from "./AnimatedBars";
import { SongModal } from "./SongModal/SongModal";

export const NowPlaying = () => {
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { data, isLoading } = useSWR<NowPlayingProps>(
    "/api/now-playing",
    fetcher
  );

  const [show, setShow] = useState(false);

  if (isLoading) return <div>loading...</div>;

  if (data && data.isPlaying)
    return (
      <>
        <SongModal show={show} setShow={setShow} data={data} />
        <div className={styles.container}>
          <button
            className={styles.card}
            onClick={() => setShow(!show)}
            role="button"
          >
            <div className={styles.nowPlayingCard}>
              <Image
                src={data.albumImageUrl}
                alt="spotify logo"
                width={120}
                height={120}
              />
              <AnimatedBars />
              <div className={styles.textAndMeta}>
                <p className={styles.song}>{data.title}</p>
                <p className={styles.artist}>{data.artist}</p>
              </div>
            </div>
          </button>
        </div>
      </>
    );

  return (
    <div className={styles.container}>
      <div className={styles.notPlaying}>
        <Spotify size={50} />
        <p>Nothing Currently </p>
      </div>
    </div>
  );
};
