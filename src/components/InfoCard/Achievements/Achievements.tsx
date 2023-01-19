import { List, Text, Title } from "@mantine/core";
import { ReactNode } from "react";
import { ExternalLink } from "components/ExternalLink";

interface AchievementsProp {
  year: string;
  group: ReactNode[];
}

const achievements = [
  {
    year: "2022",
    group: [
      <>
        Received 4{" "}
        <ExternalLink inline url="ra.co/promoters/103854" name="Resident Advisor Top Picks" /> for
        Plant Bass'd events.
      </>,
      "Earned the Professional Scrum Master™ I (PSM I) certificate.",
      "Successfully completed the Jaguar Land Rover Graduate Program.",
    ],
  },
  {
    year: "2021",
    group: [
      "Graduated with a First-Class Honours.",
      "Won best group research paper in 4th year on the topic of Global Software Engineering.",
    ],
  },
  {
    year: "2020",
    group: ["Climbed Carrauntoohil, Croagh Patrick, and cycled from Monaghan to Galway."],
  },
  {
    year: "2019",
    group: [
      "Winners of the Monaghan Senior Football Championship with Clontibret O'Neills.",
      "Successfully completed the DCU Mentoring Programme 2018-2019 and was shortlisted for best Reflect Portfolio as part of the programme.",
    ],
  },
  {
    year: "2017",
    group: [
      "Winners of the Nutty Crust Tournament, and Ulster Rugby Divison 1. League & Cup with Armagh Rugby Club u18's.",
      "Successfully completed the DCU Mentoring Programme 2018-2019 and was shortlisted for best Reflect Portfolio as part of the programme.",
    ],
  },
  {
    year: "2015",
    group: [
      "Represented Ulster Club Rugby u18s by starting at no.11 in the Inter-Provincial series.",
    ],
  },
];

export const Achievements = () => {
  return (
    <div>
      <Title order={2}>Achievements & Awards</Title>
      <List>
        {achievements.map((achievement: AchievementsProp) => (
          <>
            <Text key={achievement.year} weight={800}>
              {achievement.year}
            </Text>
            {achievement.group.map((sentence, idx) => (
              <List.Item key={idx}>{sentence}</List.Item>
            ))}
          </>
        ))}
      </List>
    </div>
  );
};
