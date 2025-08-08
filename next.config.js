/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['backend.barracksmedia.com', 'images.pexels.com'],
  },
  env: {
    CUSTOM_KEY: 'my-value',
  },
}

module.exports = nextConfig
