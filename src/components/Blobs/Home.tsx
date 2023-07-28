export const Home = () => {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sw-gradient" x1="0" x2="1" y1="1" y2="0">
          <stop id="stop1" stopColor="#da5c47" offset="0%"></stop>
          <stop id="stop2" stopColor="#EEA47F" offset="100%"></stop>
        </linearGradient>
      </defs>
      <path
        fill="url(#sw-gradient)"
        d="M15.8,-22C21.3,-17.7,27.1,-14.2,28.5,-9.4C29.9,-4.5,26.9,1.6,24.9,8.1C22.8,14.6,21.7,21.4,17.7,27.3C13.7,33.2,6.8,38.1,-0.3,38.5C-7.4,38.8,-14.7,34.6,-18.6,28.7C-22.5,22.8,-23,15.2,-24.4,8.5C-25.7,1.8,-28.1,-4,-27.4,-9.8C-26.7,-15.5,-23,-21.1,-18,-25.5C-12.9,-29.9,-6.5,-33,-0.7,-32.1C5.2,-31.2,10.3,-26.3,15.8,-22Z"
        width="100%"
        height="100%"
        transform="translate(50 50)"
        style={{ transition: "all 0.3s ease 0s" }}
        strokeWidth="0"
      ></path>
      <text
        x="50"
        y="60"
        fill="rgba(251, 83, 31, 1)"
        transform="rotate(10,20,40)"
      >
        HOME
      </text>
    </svg>
  );
};
