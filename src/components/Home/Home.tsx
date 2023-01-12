import { NowPlaying } from "components/Spotify";

export const Home = () => {
  return (
    <div>
      <h1>Michael Savage</h1>

      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <p>michaelsavage940@gmail.com</p>
        <p>github.com/michaelssavage</p>
        <p>linkedin.com/in/michaelssavage</p>
      </div>

      <h2>Software Developer at Jaguar Land Rover, Ireland</h2>

      <p>
        Passionate about all things music, movies, sports, and travelling. Interested in front-end
        development, APIs, and automation.
      </p>

      <h2>Education</h2>
      <p>
        Graduated from DCU in Bsc. Computer Applications (2017 - 2021) with a First-Class Honours.
        Studied Object Oriented Analysis & Design, Data Structures & Object Oriented Programming,
        Software Testing, and Concurrent & Distributed Computing.
      </p>

      <h2>Achievements & Awards</h2>
      <ul>
        <li>2022 - Received 4 Resident Advisor Top Picks for Plant Bass'd events</li>
        <li>2022 - Earned the Professional Scrum Master™ I (PSM I) certificate</li>
        <li>2022 - Successfully completed the Jaguar Land Rover Graduate program.</li>
        <li>
          2021 - Won best group research paper in 4th year on the topic of Global Software
          Engineering.
        </li>
        <li>2020 - Climbed Carrauntoohil.</li>
        <li>2019 - Won the Monaghan Senior Football Championship with Clontibret O’Neills.</li>
        <li>
          2019 - Successfully completed the DCU Mentoring Programme 2018-2019 and was shortlisted
          for best Reflect Portfolio as part of the programme.
        </li>
        <li>
          2017 - Div.1 League, Div.1 Cup, and Nutty Crust Tournament winner with Armagh Rugby Club
          u18’s.
        </li>
        <li>
          2015 - Represented Ulster Club Rugby u18s by starting at no.11 in the Inter-Provincial
          series.
        </li>
      </ul>
      <NowPlaying />
    </div>
  );
};
