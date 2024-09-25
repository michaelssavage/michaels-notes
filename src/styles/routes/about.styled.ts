import { forPhoneOnly } from "@/styles/abstracts/mixins.styled";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5rem;
  width: 60%;
  margin: 1rem auto 2rem auto;

  ${forPhoneOnly(css`
    flex-direction: column;
    margin-left: 5%;
  `)}
`;

export const Paragraphs = styled.div`
  font-size: 1.2rem;

  p {
    margin-bottom: 1rem;
  }
`;

export const imageWrapperStyle = css`
  overflow: hidden;
  border-top-left-radius: 5rem;
  border-top-right-radius: 5rem;
  width: 100%;

  img {
    aspect-ratio: unset;
    transition: transform 0.2s ease-in-out;

    &:hover {
      transform: scale(1.2);
    }
  }

  ${forPhoneOnly(css`
    margin: -2rem 5% 2rem 0;
    img {
      width: 240px;
      min-width: 140px;
      padding-right: 2.5rem;
    }
  `)}
`;
