import Image from "next/image";
import { Modal } from "components/modal";
import { NowPlayingProps } from "types/spotify";
import styles from "../NowPlaying.module.scss";

interface SongModalProps {
  show: boolean;
  setShow: (val: boolean) => void;
  data: NowPlayingProps;
}

export const SongModal = ({ show, setShow, data }: SongModalProps) => {
  return (
    <Modal isOpen={show} setIsOpen={setShow}>
      <div className={styles.modalSongInfo}>
        <Image
          src={data.albumImageUrl}
          alt="spotify logo"
          width={400}
          height={400}
        />
        <p className={styles.songModal}>{data.title}</p>
        <p className={styles.artist}>Artist: {data.artist}</p>
        <p>Album: {data.album}</p>
        <p className={styles.yearAlbum}>{data.year}</p>
        <a
          href={data.songUrl}
          className={styles.songUrlLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open In Spotify
        </a>
      </div>
    </Modal>
  );
};
