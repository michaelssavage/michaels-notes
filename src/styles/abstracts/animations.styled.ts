/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";

export const expandAndAppear = (duration = "0.5s") => {
  const expandAndAppearKeyframes = keyframes`
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

  return css`
    animation: ${expandAndAppearKeyframes} ${duration} ease-in-out forwards;
  `;
};

export const animateMusicBars = () => {
  const bounce = keyframes`
  10% { transform: scaleY(0.3); }
  30% { transform: scaleY(1); }
  60% { transform: scaleY(0.5); }
  80% { transform: scaleY(0.75); }
  100% { transform: scaleY(0.6); } 
`;

  return css`
    span {
      animation: ${bounce} 2.2s ease infinite alternate;
      &:nth-of-type(2) {
        animation-delay: -2.2s;
      }
      &:nth-of-type(3) {
        animation-delay: -3.7s;
      }
    }
  `;
};

export const slideInAnimation = (
  from: string,
  direction = "vertical",
  duration = "0.25s",
  fillMode = "none"
) => {
  const transform = direction === "horizontal" ? "translateX" : "translateY";

  return css`
    animation: ${keyframes`
      from {
        opacity: 0;
        transform: ${transform}(${from});
      }
      to {
        opacity: 1;
        transform: ${transform}(0px);
      }
    `} ${duration} ${fillMode};
  `;
};

export const flashAnimation = () => {
  const flashKeyframes = keyframes`
  0% {
    opacity: 0;
  }
  80% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

  return css`
    animation: ${flashKeyframes} 1.25s ease-in-out;
  `;
};

export const shimmerAnimation = () => {
  const shimmerKeyframes = keyframes`
0% {
  background-position: -200% 0;
}
100% {
  background-position: 200% 0;
}
`;

  return css`
    animation: ${shimmerKeyframes} 1.5s infinite;
  `;
};

export const hoverVertically = (distance = "10px", duration = "1s") => {
  const hoverKeyframes = (distance: string) => keyframes`
0%,
100% {
  transform: translateY(0);
}
50% {
  transform: translateY(-${distance});
}
`;
  return css`
    animation: ${hoverKeyframes(distance)} ${duration} ease-in-out infinite;
  `;
};

export const pageTransitions = css`
  &.page-enter-active,
  &.page-leave-active {
    transition: all 0.1s;
  }

  &.page-enter-from,
  &.page-leave-to {
    opacity: 0;
    filter: blur(1rem);
  }
`;
