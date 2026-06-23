import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
