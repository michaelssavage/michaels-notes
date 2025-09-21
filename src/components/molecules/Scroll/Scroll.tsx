import { LeftIcon, RightIcon } from "@/components/icons";
import { type SerializedStyles, css } from "@emotion/react";
import { type ReactNode, useRef } from "react";
import {
  ComponentWrapper,
  ItemContainer,
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
    margin: 0 1rem;
  `;

  return (
    <ComponentWrapper css={spacing ? spacing : defaultSpace}>
      {title ? <Title>{title}:</Title> : null}
      <ScrollContainer ref={scrollContainerRef}>
        <ItemContainer>{children}</ItemContainer>

        {useNav ? (
          <>
            <LeftIcon onClick={() => handleScroll("left")} />
            <RightIcon onClick={() => handleScroll("right")} />
          </>
        ) : null}
      </ScrollContainer>
    </ComponentWrapper>
  );
};
