import { Group } from "@/components/atoms/Group";
import { MailIcon } from "@/components/icons";
import { Anchor } from "@/components/molecules/Anchor";
import { AutoTextSize } from "@/lib/auto-text-size";
import {
  Content,
  From500,
  groupStyles,
  Heading,
  Lede,
  List,
  PriceCallout,
  ServicesContainer,
  ServicesPage,
  Xtra,
} from "@/styles/routes/services.styled";
import { createFileRoute } from "@tanstack/react-router";

const title = "Services | Michael Savage";
const description =
  "Bespoke website development — portfolios, blogs, event pages, and business sites.";
const url = "https://michaelsavage.com/services";

export const Route = createFileRoute("/services")({
  component: RouteComponent,
  head: () => ({
    link: [{ rel: "canonical", href: url }],
    meta: [
      { title },
      { property: "og:title", content: title },
      { property: "og:url", content: url },
      { name: "description", content: description },
      { property: "og:description", content: description },
    ],
  }),
});

function RouteComponent() {
  return (
    <ServicesPage>
      <ServicesContainer>
        <Heading>
          <AutoTextSize as="h1">Bespoke Websites</AutoTextSize>
        </Heading>

        <Content>
          <Xtra>
            <img src="/media/xtra.png" alt="xtra value sticker" />
          </Xtra>

          <Lede>
            I design and build custom websites from scratch, end to end. With
            me, you&apos;ll have full creative control over the design and
            development process.
          </Lede>

          <Lede>
            Need a site built, redesigned, or maintained? I can develop
            portfolios, blogs, event pages, and small business sites. I can help
            with the following:
          </Lede>

          <Group css={groupStyles}>
            <From500>
              <img src="/media/from_500.png" alt="spectacular offer sticker" />
            </From500>
            <List>
              <li>Brand kit, typography, copywriting</li>
              <li>SEO-friendly, fast, responsive</li>
              <li>Domain name setup, deployment, hosting</li>
              <li>Ongoing support after launch</li>
            </List>
          </Group>

          <PriceCallout>
            <p>
              Projects start from <strong>€500</strong>, depending on scope and
              complexity. Get in touch to discuss your project.
            </p>
            <Anchor
              variant="button"
              link="mailto:michaelsavage940@gmail.com?subject=Website%20project"
              text="Get in touch"
              icon={<MailIcon />}
              isExternal
            />
          </PriceCallout>
        </Content>
      </ServicesContainer>
    </ServicesPage>
  );
}
