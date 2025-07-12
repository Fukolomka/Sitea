/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      'avatars.steamstatic.com',
      'steamcdn-a.akamaihd.net',
      'community.cloudflare.steamstatic.com',
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/socket',
        destination: '/api/socket',
      },
    ];
  },
}

module.exports = nextConfig