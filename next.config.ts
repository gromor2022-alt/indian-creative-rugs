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
        hostname: "backend.indiancreativerugs.com",
      },
    ],
  },
};

export default nextConfig;