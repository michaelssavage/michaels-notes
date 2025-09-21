import { memo } from "react";
import { Container, Dot } from "./Loading.styled";

const DOTS = [0, 1, 2];

export const Loading = memo(() => {
  return (
    <Container data-testid="loading">
      <div>
        {DOTS.map((index) => (
          <Dot key={index} delay={index * 0.15} />
        ))}
      </div>
    </Container>
  );
});

Loading.displayName = "Loading";
