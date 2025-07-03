/** @type {import('next').NextConfig} */
const nextConfig = {
  // Only apply export settings in production
  ...(process.env.NODE_ENV === 'production' && {
    output: 'export',
    basePath: '/remeros',
    assetPrefix: '/remeros',
    trailingSlash: true,
  }),
  images: {
    unoptimized: true,
    domains: ['images.ctfassets.net', 'localhost'],
    loader: 'custom',
    loaderFile: './lib/contentful-image-loader.ts',
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  env: {
    PUBLIC_URL: process.env.NODE_ENV === 'production' ? '/remeros' : '',
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  }
}

module.exports = nextConfig 