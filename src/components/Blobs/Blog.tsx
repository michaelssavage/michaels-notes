export const Blog = () => {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="mrGradient" x1="0" x2="1" y1="1" y2="0">
          <stop id="stop1" stopColor="#da5c47" offset="0%"></stop>
          <stop id="stop2" stopColor="#EEA47F" offset="100%"></stop>
        </linearGradient>
      </defs>
      <path
        fill="url(#mrGradient)"
        d="M13.6,-11.4C20.9,-10,32.3,-8.9,35.1,-4.5C37.9,-0.1,32,7.5,26.5,13.9C21.1,20.3,16.2,25.5,10.1,27.9C4,30.2,-3.3,29.6,-9.8,27.1C-16.3,24.7,-22,20.4,-28.1,14.2C-34.1,7.9,-40.5,-0.2,-38.7,-6.3C-37,-12.4,-27.1,-16.5,-19.3,-17.7C-11.5,-19,-5.8,-17.4,-1.3,-15.8C3.1,-14.3,6.3,-12.7,13.6,-11.4Z"
        width="100%"
        height="100%"
        transform="translate(50 50)"
        style={{ transition: "all 0.3s ease 0s" }}
        strokeWidth="0"
      ></path>
      <text
        x="25"
        y="85"
        fill="rgba(251, 83, 31, 1)"
        transform="rotate(-5,40,40)"
      >
        BLOG
      </text>
    </svg>
  );
};
