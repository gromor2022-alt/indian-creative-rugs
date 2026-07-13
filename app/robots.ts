import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://indiancreativerugs.com/sitemap.xml",
    host: "https://indiancreativerugs.com",
  };
}