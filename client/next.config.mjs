/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      // Strapi Cloud
      {
        protocol: "https",
        hostname: "**.strapiapp.com",
        pathname: "/uploads/**",
      },
    ],
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        // Intercepts all requests starting with /api
        source: "/api/:path*",
        // Proxies them to your Strapi backend
        destination: `${process.env.NEXT_PUBLIC_STRAPI_CLOUD_URL || "http://localhost:1337"}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
