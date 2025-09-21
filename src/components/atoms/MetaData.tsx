import { Helmet } from "react-helmet-async";

interface Props {
  title?: string;
  description?: string;
  name?: string;
  type?: string;
  image?: string;
}

export const MetaData = ({
  title = "Michael Savage",
  description = "This is my personal site for projects, blog, and bites.",
  name = "Michael Savage",
  type = "article",
  image = "/images/me.jpg",
}: Props) => {
  return (
    <Helmet>
      <title>{title}</title>
      <html lang="en" data-theme="light" />
      <meta name="description" content={description} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content="https://michaelsavage.ie" />
      <meta property="og:image" content={image} />

      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content={type} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <link rel="icon" type="image/png" href="/favicon-16x16.png" />
    </Helmet>
  );
};
