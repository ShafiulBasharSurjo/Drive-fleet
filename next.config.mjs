/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  reactCompiler: true,
  async rewrites() {
    return [
      { source: "/cars", destination: "/Cars" },
      { source: "/cars/:path*", destination: "/Cars/:path*" },
    ];
  },
  async redirects() {
    return [
      { source: "/My-cars", destination: "/my-added-cars", permanent: true },
      { source: "/my-cars", destination: "/my-added-cars", permanent: true },
    ];
  },
};

export default nextConfig;
