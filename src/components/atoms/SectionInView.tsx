import { Section } from "@/styles/routes/home.styled";
import { useSpring } from "@react-spring/web";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

interface SectionI {
  children: ReactNode;
  delay?: number;
}

export const SectionInView = ({ children, delay = 0 }: SectionI) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect(); // Trigger once
          }
        });
      },
      {
        threshold: 0.2,
      },
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  const spring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0px)" : "translateY(40px)",
    config: {
      tension: 280,
      friction: 60,
    },
    delay: inView ? delay : 0,
  });

  return (
    <Section ref={ref} style={spring}>
      {children}
    </Section>
  );
};
