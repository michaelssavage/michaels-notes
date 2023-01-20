import { Badge, Image, Modal, Text, Title } from "@mantine/core";
import { ExternalLink } from "components/ExternalLink";
import { Row } from "components/Layout";

interface ModalProps {
  title: string;
  badges: string[];
  imgSrc: string;
  description: string;
  moreInfo?: string;
  name?: string;
  link: string;
  opened: boolean;
  setOpened: (val: boolean) => void;
}

export const CardModal = (props: ModalProps) => {
  const { title, badges, imgSrc, description, moreInfo, name, link, opened, setOpened } = props;
  return (
    <Modal opened={opened} onClose={() => setOpened(false)} withCloseButton={false} size="lg">
      <Title order={3}>{title}</Title>
      <Row gap="0.25rem" styles={{ marginTop: "0.5rem" }}>
        {badges.map((badge: string) => {
          return (
            <Badge key={badge} color="pink" variant="light">
              {badge}
            </Badge>
          );
        })}
      </Row>
      <div style={{ marginTop: "1rem" }}>
        <Row wrap="nowrap">
          <div
            style={imgSrc.includes("savage") ? { textAlign: "center", width: "60%" } : undefined}
          >
            <Image src={imgSrc} width="100%" alt="that's savage logo" />
          </div>
          <Text>{description}</Text>
        </Row>
      </div>

      {moreInfo && <Text mt="xs">{moreInfo}</Text>}

      <Text align="end" mt="xs">
        Visit the {name ? "GitHub repo" : "site"} : <ExternalLink url={link} inline name={name} />
      </Text>
    </Modal>
  );
};
