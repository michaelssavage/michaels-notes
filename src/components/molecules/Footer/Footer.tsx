import { Icon } from "@/components/atoms/Icon";
import {
  GithubIcon,
  LinkedInIcon,
  MailIcon,
  ResumeIcon,
  SpotifyIcon,
} from "@/components/icons";
import { lazy, Suspense } from "react";
import { Wrapper } from "./Footer.styled";

const isDevelopment = import.meta.env.DEV;

const PostHogCapture = lazy(() =>
  import("@posthog/react").then((mod) => ({
    default: function PostHogCapture({
      children,
    }: {
      children: (
        capture: (event: string, props?: Record<string, unknown>) => void
      ) => React.ReactNode;
    }) {
      const posthog = mod.usePostHog();

      const capture = (event: string, props?: Record<string, unknown>) => {
        posthog?.capture(event, props);
      };

      return <>{children(capture)}</>;
    },
  }))
);

const FooterContent = ({
  capture,
}: {
  capture?: (event: string, props?: Record<string, unknown>) => void;
}) => {
  const captureCvClick = () => {
    capture?.("cv_download_clicked", { source: "resume_button" });
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

const Footer = () => {
  if (isDevelopment) {
    return <FooterContent />;
  }

  return (
    <Suspense fallback={<FooterContent />}>
      <PostHogCapture>
        {(capture) => <FooterContent capture={capture} />}
      </PostHogCapture>
    </Suspense>
  );
};

export default Footer;
