export const TextBleed = () => (
  <svg width="0" height="0">
    <filter id="bleed">
      <feTurbulence
        type="turbulence"
        baseFrequency="0.01"
        numOctaves="1"
        result="noise"
      />
      <feDisplacementMap
        in="SourceGraphic"
        in2="noise"
        scale="2"
        xChannelSelector="R"
        yChannelSelector="G"
      />
    </filter>
  </svg>
);
