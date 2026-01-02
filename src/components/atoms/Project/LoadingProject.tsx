import { shimmerAnimation } from "@/styles/abstracts/animations.styled";
import styled from "@emotion/styled";

export const LoadingCard = styled.div`
  height: 4rem;
  background: linear-gradient(90deg, #f8f9fa 25%, #e9ecef 50%, #f8f9fa 75%);
  background-size: 200px 100%;
  ${shimmerAnimation()};
  border-radius: 0.4rem;
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.2);
  filter: url(#bleed);
`;

export const LoadingProject = () => {
  return Array.from({ length: 10 }).map((_, index) => (
    <LoadingCard key={index} />
  ));
};
