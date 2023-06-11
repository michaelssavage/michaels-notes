export const TopLeft = () => {
  return (
    <svg
      id="sw-js-blob-svg"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="tlGradient" x1="0" x2="1" y1="1" y2="0">
          <stop id="stop1" stopColor="#da5c47" offset="0%"></stop>
          <stop id="stop2" stopColor="#EEA47F" offset="100%"></stop>
        </linearGradient>
      </defs>
      <path
        fill="url(#tlGradient)"
        d="M20.3,-24C25.2,-20.2,27.1,-12.6,26.9,-5.9C26.6,0.8,24.2,6.7,21.3,12.7C18.3,18.7,14.8,24.8,9.5,27.1C4.3,29.4,-2.7,28,-9.8,25.9C-16.9,23.7,-24.2,21,-29.7,15.3C-35.2,9.6,-38.8,1.1,-37.3,-6.4C-35.8,-13.8,-29,-20.2,-21.9,-23.6C-14.8,-27.1,-7.4,-27.6,0.2,-27.8C7.7,-28,15.5,-27.8,20.3,-24Z"
        width="100%"
        height="100%"
        transform="translate(50 50)"
        style={{ transition: "all 0.3s ease 0s" }}
        strokeWidth="0"
      ></path>
      <text
        x="40"
        y="65"
        fill="rgba(251, 83, 31, 1)"
        transform="rotate(-10,40,40)"
      >
        ABOUT
      </text>
    </svg>
  );
};
