import styled from "@emotion/styled";

export const GuideHeader = styled.p`
  font-size: clamp(0.8rem, 0.8rem + 0.4vw, 0.9rem);
  text-wrap: pretty;
  font-weight: bold;
  &&& {
    margin: 0;
  }
`;

export const GuidePrice = styled.p`
  color: ${({ theme }) => theme.green};
  font-weight: bold;
  &&& {
    margin: 0;
  }
`;

export const GuideType = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.gray600};
  &&& {
    margin: 0;
  }
`;
