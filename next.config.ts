import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "indiancreativerugs.com",
      },
    ],
  },
};

export default nextConfig;