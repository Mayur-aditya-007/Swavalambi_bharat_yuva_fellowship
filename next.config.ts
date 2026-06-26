import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "vhpuvbuxwjukkfjgdgka.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  allowedDevOrigins: ['192.168.1.5'],
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", "localhost:3001", "192.168.1.5:3000", "192.168.1.5:3001"],
      bodySizeLimit: "20mb",
    },
  },
};

export default nextConfig;
