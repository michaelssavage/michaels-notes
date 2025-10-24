import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { memo } from "react";
import { BiteItem, Text } from "./Bite.styled";

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const SkeletonElement = styled.div<{ width?: string; height?: string }>`
  background: linear-gradient(90deg, #f8f9fa 25%, #e9ecef 50%, #f8f9fa 75%);
  background-size: 200px 100%;
  animation: ${shimmer} 2s infinite ease-in-out;
  border-radius: 4px;
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "1rem"};
`;

const BiteSkeleton = memo(() => {
  return (
    <BiteItem style={{ pointerEvents: "none" }}>
      <Text>
        <p data-id="date">
          <SkeletonElement width="6rem" height="0.9rem" />
        </p>
        <p data-id="description">
          <SkeletonElement
            width="90%"
            height="1rem"
            style={{ marginBottom: "0.25rem" }}
          />
          <SkeletonElement width="70%" height="1rem" />
        </p>
      </Text>
      <div
        style={{
          fontWeight: "bold",
          textTransform: "uppercase",
          transform: "rotate(90deg)",
          marginRight: "-1rem",
        }}
      >
        <SkeletonElement width="3rem" height="1rem" />
      </div>
    </BiteItem>
  );
});

BiteSkeleton.displayName = "BiteSkeleton";

export default BiteSkeleton;
