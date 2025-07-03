/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export always enabled
  output: 'export',
  trailingSlash: true,
  
  // Conditional basePath and assetPrefix
  // Use EXPORT_MODE=static for static export with /remeros path
  // Use VERCEL=1 (automatically set by Vercel) for Vercel deploys
  // Development mode has no basePath
  ...(process.env.EXPORT_MODE === 'static' && !process.env.VERCEL && {
    basePath: '/remeros',
    assetPrefix: '/remeros',
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
    PUBLIC_URL: process.env.EXPORT_MODE === 'static' && !process.env.VERCEL ? '/remeros' : '',
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  }
}

module.exports = nextConfig 