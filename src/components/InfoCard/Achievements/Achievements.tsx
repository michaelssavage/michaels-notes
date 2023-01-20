import { Text, Title } from "@mantine/core";
import { ReactNode } from "react";
import { ExternalLink } from "components/ExternalLink";

interface GroupProp {
  id: number;
  val: ReactNode;
}

interface AchievementsProp {
  year: number;
  group: GroupProp[];
}

const achievements = [
  {
    year: 2022,
    group: [
      {
        id: 20221,
        val: (
          <>
            Received 4{" "}
            <ExternalLink inline url="ra.co/promoters/103854" name="Resident Advisor Top Picks" />{" "}
            for Plant Bass'd events.
          </>
        ),
      },
      { id: 20222, val: "Earned the Professional Scrum Master™ I (PSM I) certificate." },
      { id: 20223, val: "Successfully completed the Jaguar Land Rover Graduate Program." },
    ],
  },
  {
    year: 2021,
    group: [
      { id: 20211, val: "Graduated with a First-Class Honours." },
      {
        id: 20212,
        val: "Won best group research paper in 4th year on the topic of Global Software Engineering.",
      },
    ],
  },
  {
    year: 2020,
    group: [
      {
        id: 20201,
        val: "Climbed Carrauntoohil, Croagh Patrick, and cycled from Monaghan to Galway.",
      },
    ],
  },
  {
    year: 2019,
    group: [
      {
        id: 20191,
        val: "Winners of the Monaghan Senior Football Championship with Clontibret O'Neills.",
      },
      {
        id: 20192,
        val: "Successfully completed the DCU Mentoring Programme 2018-2019 and was shortlisted for best Reflect Portfolio as part of the programme.",
      },
    ],
  },
  {
    year: 2017,
    group: [
      {
        id: 20171,
        val: "Winners of the Nutty Crust Tournament, and Ulster Rugby Divison 1. League & Cup with Armagh Rugby Club u18's.",
      },
      {
        id: 20172,
        val: "Successfully completed the DCU Mentoring Programme 2018-2019 and was shortlisted for best Reflect Portfolio as part of the programme.",
      },
    ],
  },
  {
    year: 2015,
    group: [
      {
        id: 20151,
        val: "Represented Ulster Club Rugby u18s by starting at no.11 in the Inter-Provincial series.",
      },
    ],
  },
];

export const Achievements = () => {
  return (
    <div>
      <Title order={2}>Achievements & Awards</Title>
      {achievements.map((achievement: AchievementsProp) => (
        <div key={achievement.year}>
          <Text weight={800}>{achievement.year}</Text>
          <ul>
            {achievement.group.map((sentence) => (
              <li key={sentence.id}>{sentence.val}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
