/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
  title: "Waypoint",
  titleTemplate: "%s | Waypoint",
  defaultTitle: "Waypoint",
  description: "Easy short url for your link",
  canonical: "https://waypoint.reylabs.xyz",
  openGraph: {
    url: "https://waypoint.reylabs.xyz",
    title: "nextarter-chakra",
    description: "Easy short url for your link",
    images: [
      {
        url: "https://cdn.statically.io/og/theme=dark/Waypoint..jpg",
        alt: "waypoint.reylabs.xyz og-image",
      },
    ],
    site_name: "Waypoint",
  },
  twitter: {
    handle: "@reynadi17",
    cardType: "summary_large_image",
  },
};

export default defaultSEOConfig;
