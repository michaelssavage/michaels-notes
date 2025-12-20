import { Icon } from "@/components/atoms/Icon";
import {
  GithubIcon,
  LinkedInIcon,
  MailIcon,
  ResumeIcon,
  SpotifyIcon,
} from "@/components/icons";
import { Wrapper } from "./Footer.styled";

const Footer = () => {
  const captureCvClick = async () => {
    const posthog = (await import("posthog-js")).default;

    posthog.capture("cv_download_clicked", {
      source: "resume_button",
    });
  };

  return (
    <Wrapper>
      <Icon
        label="Email"
        link="mailto:michaelsavage940@gmail.com"
        icon={<MailIcon />}
        isExternal
      />

      <Icon
        label="GitHub"
        link="https://github.com/michaelssavage"
        icon={<GithubIcon />}
        isExternal
      />

      <Icon
        label="LinkedIn"
        link="https://www.linkedin.com/in/michaelssavage"
        icon={<LinkedInIcon />}
        isExternal
      />

      <Icon
        label="Spotify"
        link="https://open.spotify.com/user/1156402021"
        icon={<SpotifyIcon />}
        isExternal
      />

      <Icon
        label="My CV"
        link="https://www.canva.com/design/DAF5SupMjfo/kbopYKhI2C20XYOTIRJTaQ/view"
        icon={<ResumeIcon onClick={captureCvClick} />}
        isExternal
      />
    </Wrapper>
  );
};

export default Footer;
