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
            I design and build custom websites from scratch, end to end. I like
            to be creative with websites, preferring lighthearted designs that
            catch the eye. You can see my playful development process in the
            following sites,{" "}
            <Anchor
              link="https://plantbassd.com"
              text="https://plantbassd.com"
              variant="link"
              isExternal
            />
            ,{" "}
            <Anchor
              link="https://letsgiveback.ie"
              text="https://letsgiveback.ie"
              variant="link"
              isExternal
            />
            ,
            <Anchor
              link="https://athlostravel.com"
              text="https://athlostravel.com"
              variant="link"
              isExternal
            />
            and more in my projects page.
          </Lede>

          <Lede>
            If you need a site built, redesigned, or maintained, I would love to
            help. I have experience developing portfolios, blogs, event pages,
            and small business sites. I can help with the following:
          </Lede>

          <Group css={groupStyles}>
            <From500>
              <video
                autoPlay
                loop
                muted
                playsInline
                aria-label="spectacular offer sticker"
              >
                <source src="/media/blitz-price.webm" type="video/webm" />
                <source src="/media/blitz-price.mp4" type="video/mp4" />
              </video>
            </From500>
            <List>
              <li>Pitching brand kits, typography, copywriting</li>
              <li>Adjusting SEO, ads, mobile-responsive sites</li>
              <li>Setting up domain names, deployment, hosting</li>
              <li>Supporting updates after launch</li>
            </List>
          </Group>

          <PriceCallout>
            <p>
              Pricing starts at €500, but really depends on the scope and
              complexity of your project. Get in touch to discuss the next
              steps.
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
