export const Projects = () => {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="trGradient" x1="0" x2="1" y1="1" y2="0">
          <stop id="stop1" stopColor="#da5c47" offset="0%"></stop>
          <stop id="stop2" stopColor="#EEA47F" offset="100%"></stop>
        </linearGradient>
      </defs>
      <path
        fill="url(#trGradient)"
        d="M30,-18.3C34.3,-10,29.8,2.3,23.4,12.7C16.9,23.1,8.5,31.6,-0.2,31.7C-8.9,31.9,-17.9,23.7,-23.7,13.6C-29.6,3.6,-32.4,-8.4,-27.9,-16.8C-23.4,-25.1,-11.7,-30,0.6,-30.3C12.9,-30.7,25.8,-26.5,30,-18.3Z"
        width="100%"
        height="100%"
        transform="translate(50 50)"
        style={{ transition: "all 0.3s ease 0s" }}
        strokeWidth="0"
      ></path>
      <text
        x="5"
        y="50"
        fill="rgba(251, 83, 31, 1)"
        transform="rotate(10,20,30)"
      >
        PROJECTS
      </text>
    </svg>
  );
};
