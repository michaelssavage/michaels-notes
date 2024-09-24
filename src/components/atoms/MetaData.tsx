import { Helmet } from "react-helmet-async";

export const MetaData = () => {
  return (
    <Helmet>
      <title>Michael Savage</title>
      <meta
        name="description"
        content="This is my personal site for projects, blog, and bites."
      />

      <meta property="og:title" content="Michael Savage" />
      <meta property="og:url" content="https://michaelsavage.ie" />
      <meta
        property="og:description"
        content="This is my personal site for projects, blog, and bites."
      />
      <meta property="og:image" content="/images/cover.jpg" />

      <meta name="twitter:card" content="summary_large_image" />

      <html lang="en" data-theme="light" />

      <link rel="icon" type="image/png" href="/images/project/emot.png" />
    </Helmet>
  );
};
