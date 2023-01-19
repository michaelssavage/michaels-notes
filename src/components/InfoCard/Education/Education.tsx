import { Button, Title } from "@mantine/core";

const buttons = [
  "Web Design",
  "OOP Analysis & Design",
  "Cryptography",
  "Advanced Algorithms",
  "Software Testing",
  "Concurrent Programming",
];

export const Education = () => {
  return (
    <div>
      <Title order={2}>Education</Title>
      <p>Bsc. Computer Applications from DCU (2017 - 2021) studying:</p>
      <div style={{ marginTop: "0.5rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        {buttons.map((button) => {
          return (
            <Button key={button} compact radius="xl" className="infoBtn">
              {button}
            </Button>
          );
        })}
      </div>
    </div>
  );
};
