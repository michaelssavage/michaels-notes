import { type SerializedStyles, css } from "@emotion/react";
import type { ReactNode } from "@tanstack/react-router";
import { useRef } from "react";
import {
  ComponentWrapper,
  ItemContainer,
  LeftScrollButton,
  RightScrollButton,
  ScrollContainer,
  Title,
} from "./Scroll.styled";

interface Props {
  title?: string;
  children: ReactNode;
  useNav?: boolean;
  spacing?: SerializedStyles;
}

export const Scroll = ({ title, children, spacing, useNav = true }: Props) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const currentScroll = scrollContainerRef.current.scrollLeft;
      scrollContainerRef.current.scrollTo({
        left:
          direction === "left"
            ? currentScroll - scrollAmount
            : currentScroll + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const defaultSpace = css`
    margin: 0 3rem;
  `;

  return (
    <ComponentWrapper css={spacing ? spacing : defaultSpace}>
      {title ? <Title>{title}:</Title> : null}
      <ScrollContainer ref={scrollContainerRef}>
        <ItemContainer>{children}</ItemContainer>

        {useNav ? (
          <>
            <LeftScrollButton onClick={() => handleScroll("left")}>
              &lt;
            </LeftScrollButton>
            <RightScrollButton onClick={() => handleScroll("right")}>
              &gt;
            </RightScrollButton>
          </>
        ) : null}
      </ScrollContainer>
    </ComponentWrapper>
  );
};
