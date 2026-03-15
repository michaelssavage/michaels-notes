import { LeftIcon, RightIcon } from "@/components/icons";
import { SelectControl } from "@/components/molecules/SelectControl/SelectControl";
import { TimeRange } from "@/types/Spotify";
import { type ReactNode, useRef } from "react";
import { ItemContainer, Navigation, ScrollContainer } from "./Scroll.styled";

interface Props {
  children: ReactNode;
  term: TimeRange;
  setTerm: (term: TimeRange) => void;
}

const options = [
  { value: "long_term", label: "Last Year" },
  { value: "medium_term", label: "Last 6 Months" },
  { value: "short_term", label: "Last Month" },
];

export const Scroll = ({ children, term, setTerm }: Props) => {
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

  return (
    <>
      <SelectControl
        value={term}
        options={options}
        onChange={(v) => setTerm(v as TimeRange)}
      />
      <ScrollContainer ref={scrollContainerRef}>
        <ItemContainer>{children}</ItemContainer>
      </ScrollContainer>

      <Navigation>
        <button onClick={() => handleScroll("left")}>
          <LeftIcon />
          Scroll Left
        </button>
        <button onClick={() => handleScroll("right")}>
          <RightIcon />
          Scroll Right
        </button>
      </Navigation>
    </>
  );
};
