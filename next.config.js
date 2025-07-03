/** @type {import('next').NextConfig} */
const nextConfig = {
  // Only use static export when explicitly requested
  ...(process.env.EXPORT_MODE === 'static' && {
    output: 'export',
  }),
  
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
    // For static export, images must be unoptimized
    unoptimized: process.env.EXPORT_MODE === 'static',
    domains: ['images.ctfassets.net'],
    // Only use custom loader for Contentful images when not in static export mode
    ...(process.env.EXPORT_MODE !== 'static' && {
      loader: 'custom',
      loaderFile: './lib/contentful-image-loader.ts',
    }),
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