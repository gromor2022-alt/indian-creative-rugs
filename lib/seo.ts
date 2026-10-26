import type { Metadata } from "next";

// Canonical and og:url are relative paths. Next.js resolves them against
// `metadataBase` in app/layout.tsx (https://indiancreativerugs.com), so they
// never depend on NEXT_PUBLIC_SITE_URL (which points at localhost in dev).

interface SEOProps {
  title: string;
  description: string;
  /** Path of the page, e.g. "/about". Used for the canonical and og:url. */
  url: string;
  image?: string;
  keywords?: string[];
  /** Use the title as-is instead of adding " | Indian Creative Rugs". */
  absoluteTitle?: boolean;
  /** Keep the page out of search results (cart, account, login, etc.). */
  noindex?: boolean;
}

export function generateSEO({
  title,
  description,
  url,
  image = "/og-image.jpg",
  keywords,
  absoluteTitle = false,
  noindex = false,
}: SEOProps): Metadata {
  const canonical = url;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,

    ...(keywords && keywords.length > 0 ? { keywords } : {}),

    // Noindex pages get no canonical: they are not meant to be indexed, and a
    // shared layout (e.g. /account) would otherwise point sub-pages at itself.
    ...(noindex
      ? {
          robots: {
            index: false,
            follow: true,
            googleBot: { index: false, follow: true },
          },
        }
      : {
          alternates: {
            canonical,
          },
        }),

    openGraph: {
      title,
      description,
      ...(noindex ? {} : { url: canonical }),
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
