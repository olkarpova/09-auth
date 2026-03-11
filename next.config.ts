import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ac.goit.global',     // ← ОБОВ'ЯЗКОВО!
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',      // для дефолтних аватарів
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',   // ← для твоєї помилки!
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',        // альтернативні аватари
      },
      // твої інші домени
    ],
  },
};

export default nextConfig;
