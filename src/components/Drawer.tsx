import styled from "@emotion/styled";
import { motion, useScroll, useTransform } from "framer-motion";
import type React from "react";
import { useRef } from "react";

const BannerContainer = styled(motion.div)`
  position: absolute;
  bottom: -4rem;
  left: 0;
  right: 0;
  height: 100vh;
  background-color: #ffffff;
  z-index: 10;
  overflow-y: auto;
  box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.1);
`;

const BannerContent = styled.div`
  padding: 2rem;
  min-height: 100%;
`;

interface ParallaxBannerProps {
  children: React.ReactNode;
}

export const Drawer: React.FC<ParallaxBannerProps> = ({ children }) => {
  const bannerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: bannerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);

  return (
    <BannerContainer ref={bannerRef} style={{ y }}>
      <BannerContent>{children}</BannerContent>
    </BannerContainer>
  );
};

export default Drawer;
