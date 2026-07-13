import type { Metadata } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://indiancreativerugs.com";

interface SEOProps {
  title: string;
  description: string;
  url: string;
  image?: string;
  keywords?: string[];
}

export function generateSEO({
  title,
  description,
  url,
  image = "/og-image.jpg",
  keywords = [],
}: SEOProps): Metadata {
  return {
    title,
    description,

    keywords,

    alternates: {
      canonical: `${SITE_URL}${url}`,
    },

    openGraph: {
      title,
      description,
      url: `${SITE_URL}${url}`,
      siteName: "Indian Creative Rugs",
      locale: "en_US",
      type: "website",

      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}