import { Paper, Text, Title } from "@mantine/core";
import { IrelandIcon } from "components/Icons";
import { Row } from "components/Layout";
import { Achievements, Contact, Education } from "./";

interface InfoCardProps {
  show: boolean;
}

export const InfoCard = ({ show }: InfoCardProps) => {
  return (
    <Paper shadow="md" p="md" withBorder>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>
          <Title order={2}>Location</Title>
          <Row>
            <IrelandIcon />
            <Text>Ireland</Text>
          </Row>
        </div>
        <Contact />
        {show && (
          <div className="animatedShow">
            <Education />
            <Achievements />
          </div>
        )}
      </div>
    </Paper>
  );
};
