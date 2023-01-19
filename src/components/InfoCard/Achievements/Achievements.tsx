import { List, Text, Title } from "@mantine/core";
import { ReactNode } from "react";
import { ExternalLink } from "components/ExternalLink";

interface GroupProp {
  key: number;
  val: ReactNode;
}

interface AchievementsProp {
  year: string;
  group: GroupProp[];
}

const achievements = [
  {
    year: "2022",
    group: [
      {
        key: 20220,
        val: (
          <>
            Received 4{" "}
            <ExternalLink inline url="ra.co/promoters/103854" name="Resident Advisor Top Picks" />{" "}
            for Plant Bass'd events.
          </>
        ),
      },
      { key: 20221, val: "Earned the Professional Scrum Master™ I (PSM I) certificate." },
      { key: 20222, val: "Successfully completed the Jaguar Land Rover Graduate Program." },
    ],
  },
  {
    year: "2021",
    group: [
      { key: 20210, val: "Graduated with a First-Class Honours." },
      {
        key: 20211,
        val: "Won best group research paper in 4th year on the topic of Global Software Engineering.",
      },
    ],
  },
  {
    year: "2020",
    group: [
      {
        key: 20200,
        val: "Climbed Carrauntoohil, Croagh Patrick, and cycled from Monaghan to Galway.",
      },
    ],
  },
  {
    year: "2019",
    group: [
      {
        key: 20190,
        val: "Winners of the Monaghan Senior Football Championship with Clontibret O'Neills.",
      },
      {
        key: 20191,
        val: "Successfully completed the DCU Mentoring Programme 2018-2019 and was shortlisted for best Reflect Portfolio as part of the programme.",
      },
    ],
  },
  {
    year: "2017",
    group: [
      {
        key: 20170,
        val: "Winners of the Nutty Crust Tournament, and Ulster Rugby Divison 1. League & Cup with Armagh Rugby Club u18's.",
      },
      {
        key: 20171,
        val: "Successfully completed the DCU Mentoring Programme 2018-2019 and was shortlisted for best Reflect Portfolio as part of the programme.",
      },
    ],
  },
  {
    year: "2015",
    group: [
      {
        key: 20150,
        val: "Represented Ulster Club Rugby u18s by starting at no.11 in the Inter-Provincial series.",
      },
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
            {achievement.group.map((sentence) => (
              <List.Item key={sentence.key}>{sentence.val}</List.Item>
            ))}
          </>
        ))}
      </List>
    </div>
  );
};
