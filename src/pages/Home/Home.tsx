import { createStyles, Grid, Paper, Text, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { NowPlaying } from "components/Interests/Spotify";
import { InfoCard } from "components/InfoCard";
import { Dogs } from "components/Dogs";
import { Col } from "components/Layout";
import {
  CommonMovies,
  Emot,
  OrderSystem,
  Plantbassd,
  Rekordbox,
  ThatsSavage,
} from "components/Home";

const useStyles = createStyles((theme) => ({
  myResponsiveText: {
    fontSize: "6rem",

    [theme.fn.smallerThan("sm")]: {
      fontSize: "3rem",
    },
  },
}));

export const Home = () => {
  const [show, setShow] = useState(false);
  const { classes } = useStyles();

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 1000);
  }, []);

  return (
    <Grid
      style={show ? undefined : { display: "flex", alignItems: "flex-end" }}
    >
      <Grid.Col sm={12} md={8}>
        <Title className={classes.myResponsiveText}>Michael Savage</Title>
        <Paper shadow="md" p="md" withBorder mt="xs">
          <Text>
            Hey, I'm Michael, a Software Developer at Jaguar Land Rover,
            Ireland. I'm passionate about all things music, movies, sports, and
            travelling. Proficient in React, Typescript, Java, Spring Boot,
            Python but I am always striving to learn new and exciting
            technologies with particular interests in Frontend Development,
            APIs, and UI/UX.
          </Text>
        </Paper>
        {show && (
          <div className="animatedShow">
            <Grid mt="xs">
              <Grid.Col sm={12} md={7}>
                <Plantbassd />
              </Grid.Col>
              <Grid.Col sm={12} md={5}>
                <ThatsSavage />
              </Grid.Col>

              <Grid.Col span="auto">
                <Col>
                  <Rekordbox />
                  <CommonMovies />
                </Col>
              </Grid.Col>

              <Grid.Col sm={12} md={6}>
                <Emot />
              </Grid.Col>

              <Grid.Col span={12}>
                <NowPlaying />
              </Grid.Col>
              <Grid.Col sm={12} md={5}>
                <Dogs />
              </Grid.Col>

              <Grid.Col sm={12} md={7}>
                <OrderSystem />
              </Grid.Col>
            </Grid>
          </div>
        )}
      </Grid.Col>
      <Grid.Col sm={12} md={4}>
        <InfoCard show={show} />
      </Grid.Col>
    </Grid>
  );
};
