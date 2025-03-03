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
  // Add API configuration for handling uploads
  api: {
    bodyParser: {
      sizeLimit: '10mb', // Increase size limit for file uploads
    },
    responseLimit: false,
  },
  // Ensure server can handle file uploads
  serverRuntimeConfig: {
    projectRoot: process.cwd(),
  },
};

export default nextConfig;