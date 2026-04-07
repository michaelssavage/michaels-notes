import { Container, Dot } from "./Loading.styled";

const DOTS = [0, 1, 2];

export function Loading() {
  return (
    <Container data-testid="loading">
      <div>
        {DOTS.map((index) => (
          <Dot key={index} delay={index * 0.15} />
        ))}
      </div>
    </Container>
  );
}
