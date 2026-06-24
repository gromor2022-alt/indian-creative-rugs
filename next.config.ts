import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "indiancreativerugs.com",
      },
      {
        protocol: "https",
        hostname: "silver-crocodile-439807.hostingersite.com",
      },
    ],
  },
};

export default nextConfig;