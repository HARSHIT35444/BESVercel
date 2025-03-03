import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        pathname: '/**',
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.jdmagicbox.com",
      },
    ],
  },
  serverRuntimeConfig: {
    projectRoot: process.cwd(),
    // Configure file upload limits
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export default nextConfig;