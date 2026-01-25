import styled from "@emotion/styled";

export const GuideHeader = styled.h2`
  font-size: 1.2rem;
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

export const GuideLink = styled.a`
  color: ${({ theme }) => theme.blue200};
  font-weight: bold;
  &&& {
    margin: 0;
  }
`;

export const GuideDescription = styled.p`
  font-size: 0.8rem;
  &&& {
    margin: 0.5rem 0;
  }
`;
