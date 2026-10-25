
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    cpus: 4,
  },
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
