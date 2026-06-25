import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        hostname: "www.varsapp.com",
        pathname: "/idea/**",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
