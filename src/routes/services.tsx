import { MailIcon } from "@/components/icons";
import { Anchor } from "@/components/molecules/Anchor";
import { Picture } from "@/components/molecules/Picture";
import { AutoTextSize } from "@/lib/auto-text-size";
import {
  CardGrid,
  Content,
  Heading,
  Lede,
  List,
  PriceCallout,
  ServicesContainer,
  ServicesPage,
  SiteCard,
  SiteTitle,
  Xtra,
} from "@/styles/routes/services.styled";
import { createFileRoute } from "@tanstack/react-router";

const featuredSites = [
  {
    title: "Plantbassd",
    src: "/project/plantbassd-landing.png",
    href: "https://plantbassd.com",
  },
  {
    title: "Let's Give Back",
    src: "/project/lets-give-back.png",
    href: "https://letsgiveback.ie",
  },
  {
    title: "Athlos Travel",
    src: "/project/athlos-landing.png",
    href: "https://athlostravel.com",
  },
];

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
            following sites, and more in{" "}
            <Anchor link="/projects" text="my projects" variant="link" /> page.
          </Lede>

          <CardGrid>
            {featuredSites.map((site) => (
              <SiteCard
                key={site.href}
                href={site.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Picture src={site.src} alt={site.title} ar="16 / 10" />
                <SiteTitle>{site.title}</SiteTitle>
              </SiteCard>
            ))}
          </CardGrid>

          <Lede>
            If you need a site built, redesigned, or maintained, I would love to
            help. I have experience developing portfolios, blogs, event pages,
            and small business sites. I can help with the following:
          </Lede>

          <List>
            <li>Pitching brand kits, typography, copywriting</li>
            <li>Adjusting SEO, ads, mobile-responsive sites</li>
            <li>Setting up domain names, deployment, hosting</li>
            <li>Supporting updates after launch</li>
          </List>

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
