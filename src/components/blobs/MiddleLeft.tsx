export const MiddleLeft = () => {
  return (
    <svg
      id="sw-js-blob-svg"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="mlGradient" x1="0" x2="1" y1="1" y2="0">
          <stop id="stop1" stopColor="#da5c47" offset="0%"></stop>
          <stop id="stop2" stopColor="#EEA47F" offset="100%"></stop>
        </linearGradient>{" "}
      </defs>
      <path
        fill="url(#mlGradient)"
        d="M29.7,-12.1C36.9,-4.7,40,10.1,34.4,13.9C28.8,17.7,14.4,10.6,4.4,8C-5.6,5.5,-11.2,7.6,-13.4,5.8C-15.6,3.9,-14.3,-1.8,-11.6,-6.7C-8.8,-11.5,-4.4,-15.4,3.4,-17.4C11.3,-19.4,22.5,-19.4,29.7,-12.1Z"
        width="100%"
        height="100%"
        transform="translate(50 50)"
        style={{ transition: "all 0.3s ease 0s" }}
        strokeWidth="0"
        stroke="url(#mlGradient)"
      ></path>
      <text
        x="40"
        y="20"
        fill="rgba(251, 83, 31, 1)"
        transform="rotate(20,20,40)"
      >
        CV
      </text>
    </svg>
  );
};
