import { Loader } from "@mantine/core";
import styles from "./loading.module.scss";

export const Loading = () => {
  return (
    <div className={styles.container}>
      <Loader color="teal" variant="dots" size="xl" />
    </div>
  );
};
