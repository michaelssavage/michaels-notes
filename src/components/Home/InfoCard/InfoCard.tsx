import { Button, Card, Flex, List, Text, Title } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconBrandGithub, IconBrandLinkedin, IconCheck, IconMail } from "@tabler/icons";
import { MouseEvent } from "react";
import { IrelandIcon } from "components/Icons";
import { ExternalLink } from "components/ExternalLink";
import styles from "./infocard.module.scss";

export const InfoCard = () => {
  const emailAddress = "michaelsavage940@gmail.com";
  const copyEmail = (ev: MouseEvent) => {
    ev.preventDefault();
    navigator.clipboard.writeText(emailAddress);
    showNotification({
      color: "teal",
      icon: <IconCheck size={16} />,
      message: "Email Address Copied",
    });
  };

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Flex direction="column" wrap="wrap" gap="xs">
        <div>
          <Title order={2}>Location</Title>
          <Flex direction="row" wrap="wrap" gap="xs" align="center">
            <IrelandIcon /> <Text>Ireland</Text>
          </Flex>
        </div>
        <div>
          <Title order={2}>Contact</Title>
          <Flex direction="row" wrap="wrap" gap="xs">
            <IconMail />
            <Text>Email:</Text>
            <a className="hoverLink" data-replace={emailAddress} href="" onClick={copyEmail}>
              <span>{emailAddress}</span>
            </a>
          </Flex>

          <Flex direction="row" wrap="wrap" gap="xs">
            <IconBrandGithub />
            <Text>Github:</Text>
            <ExternalLink url="github.com/michaelssavage" />
          </Flex>

          <Flex direction="row" wrap="wrap" gap="xs">
            <IconBrandLinkedin />
            <Text>LinkedIn:</Text>
            <ExternalLink url="linkedin.com/in/michaelssavage" />
          </Flex>
        </div>
        <div>
          <Title order={2}>Education</Title>
          <p>Bsc. Computer Applications from DCU (2017 - 2021) studying:</p>
          <Flex direction="row" wrap="wrap" gap="xs">
            <Button compact radius="xl" className={styles.infoBtn}>
              Web Design
            </Button>
            <Button compact radius="xl" className={styles.infoBtn}>
              OOP Analysis & Design
            </Button>
            <Button compact radius="xl" className={styles.infoBtn}>
              Cryptography
            </Button>
            <Button compact radius="xl" className={styles.infoBtn}>
              Advanced Algorithms
            </Button>
            <Button compact radius="xl" className={styles.infoBtn}>
              Software Testing
            </Button>
            <Button compact radius="xl" className={styles.infoBtn}>
              Concurrent Programming
            </Button>
          </Flex>
        </div>
        <div>
          <Title order={2}>Achievements & Awards</Title>
          <List>
            <Text weight={800}>2022</Text>
            <List.Item>
              Received 4{" "}
              <ExternalLink inline url="ra.co/promoters/103854" name="Resident Advisor Top Picks" />{" "}
              for Plant Bass'd events.
            </List.Item>
            <List.Item>Earned the Professional Scrum Master™ I (PSM I) certificate.</List.Item>
            <List.Item>Successfully completed the Jaguar Land Rover Graduate program.</List.Item>
            <Text weight={800}>2021</Text>
            <List.Item>Graduated with a First-Class Honours.</List.Item>
            <List.Item>
              Won best group research paper in 4th year on the topic of Global Software Engineering.
            </List.Item>
            <Text weight={800}>2020</Text>
            <List.Item>
              Climbed Carrauntoohil, Croagh Patrick, and cycled from Monaghan to Galway.
            </List.Item>
            <Text weight={800}>2019</Text>
            <List.Item>
              Winners of the Monaghan Senior Football Championship with Clontibret O'Neills.
            </List.Item>
            <List.Item>
              Successfully completed the DCU Mentoring Programme 2018-2019 and was shortlisted for
              best Reflect Portfolio as part of the programme.
            </List.Item>
            <Text weight={800}>2017</Text>
            <List.Item>
              Winners of the Nutty Crust Tournament, and Ulster Rugby Divison 1. League & Cup with
              Armagh Rugby Club u18's.
            </List.Item>
            <Text weight={800}>2015</Text>
            <List.Item>
              Represented Ulster Club Rugby u18s by starting at no.11 in the Inter-Provincial
              series.
            </List.Item>
          </List>
        </div>
      </Flex>
    </Card>
  );
};
