/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  }
  ,
  images: {
    domains: ['linux.do']
  }
};

module.exports = nextConfig; 