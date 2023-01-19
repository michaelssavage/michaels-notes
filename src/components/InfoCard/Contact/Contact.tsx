import { Text, Title } from "@mantine/core";
import { IconBrandGithub, IconBrandLinkedin, IconCheck, IconMail } from "@tabler/icons";
import { showNotification } from "@mantine/notifications";
import { MouseEvent } from "react";
import { ExternalLink } from "components/ExternalLink";
import { Row } from "components/Layout";

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

export const Contact = () => {
  return (
    <div>
      <Title order={2}>Contact</Title>
      <Row>
        <IconMail />
        <Text>Email:</Text>
        <a className="hoverLink" data-replace={emailAddress} href="" onClick={copyEmail}>
          <span>{emailAddress}</span>
        </a>
      </Row>

      <Row>
        <IconBrandGithub />
        <Text>Github:</Text>
        <ExternalLink url="github.com/michaelssavage" />
      </Row>

      <Row>
        <IconBrandLinkedin />
        <Text>LinkedIn:</Text>
        <ExternalLink url="linkedin.com/in/michaelssavage" />
      </Row>
    </div>
  );
};
