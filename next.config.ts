import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  cacheComponents: true,
  cacheLife: {
    seconds: {
      stale: 0,
      revalidate: 10,
      expire: 10,
    },
  },
  images: {
    dangerouslyAllowLocalIP: process.env.NODE_ENV !== "production",
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "**",
        search: "",
      },
    ],
  },
}

export default nextConfig
