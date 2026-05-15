import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['192.168.1.5'],
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", "localhost:3001", "192.168.1.5:3000", "192.168.1.5:3001"],
    },
  },
};

export default nextConfig;
