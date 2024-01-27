/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    minimumCacheTTL: 60 * 60 * 24 * 365,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "/v0/b/website-cine.appspot.com/o/**",
      },
    ],
    async headers() {
      return [
        {
          source: "/fonts/",
          headers: [
            {
              key: "Access-Control-Allow-Origin",
              value: "*",
            },
          ],
        },
      ];
    },
  },
};

module.exports = nextConfig;
