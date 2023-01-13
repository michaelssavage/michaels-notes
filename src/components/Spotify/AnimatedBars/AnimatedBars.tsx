import { animate } from "motion";
import { useEffect } from "react";
import styles from "./animatedBars.module.scss";

export const AnimatedBars = () => {
  useEffect(() => {
    animate(
      "#bar1",
      {
        transform: [
          "scaleY(1.0) translateY(0rem)",
          "scaleY(1.5) translateY(-0.082rem)",
          "scaleY(1.0) translateY(0rem)",
        ],
      },
      {
        duration: 1.0,
        repeat: Infinity,
        easing: ["ease-in-out"],
      }
    );
    animate(
      "#bar2",
      {
        transform: [
          "scaleY(1.0) translateY(0rem)",
          "scaleY(3) translateY(-0.083rem)",
          "scaleY(1.0) translateY(0rem)",
        ],
      },
      {
        delay: 0.2,
        duration: 1.5,
        repeat: Infinity,
        easing: ["ease-in-out"],
      }
    );
    animate(
      "#bar3",
      {
        transform: [
          "scaleY(1.0)  translateY(0rem)",
          "scaleY(0.8) translateY(0.37rem)",
          "scaleY(1.0)  translateY(0rem)",
        ],
      },
      {
        delay: 0.3,
        duration: 1.5,
        repeat: Infinity,
        easing: ["ease-in-out"],
      }
    );
    animate(
      "#bar4",
      {
        transform: [
          "scaleY(1.0)  translateY(0rem)",
          "scaleY(0.5) translateY(0.5rem)",
          "scaleY(1.0)  translateY(0rem)",
        ],
      },
      {
        delay: 0.1,
        duration: 1.2,
        repeat: Infinity,
        easing: ["ease-in-out"],
      }
    );
  }, []);

  return (
    <div className={styles.animatedBars}>
      <span id="bar1" className={styles.bar1} />
      <span id="bar2" className={styles.bar2} />
      <span id="bar3" className={styles.bar3} />
      <span id="bar4" className={styles.bar4} />
    </div>
  );
};
