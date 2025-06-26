/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ['images.ctfassets.net', 'localhost'],
    loader: 'custom',
    loaderFile: './lib/contentful-image-loader.ts',
  },
  optimizeFonts: true,
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  env: {
    PUBLIC_URL: process.env.PUBLIC_URL || 'http://localhost:3000',
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  }
}

module.exports = nextConfig 