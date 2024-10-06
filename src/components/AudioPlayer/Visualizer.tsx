import { Bar, BarWrapper } from "@/components/AudioPlayer/AudioPlayer.styled";
import { AnimatePresence } from "framer-motion";
import type { FC } from "react";

interface MusicVisualizerProps {
  isPlaying?: boolean;
}

export const Visualizer: FC<MusicVisualizerProps> = ({ isPlaying }) => {
  return (
    <AnimatePresence mode="wait">
      {isPlaying ? (
        <BarWrapper
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {Array.from({ length: 4 }, (_, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: Index doesn't matter here
            <Bar key={index} />
          ))}
        </BarWrapper>
      ) : null}
    </AnimatePresence>
  );
};
