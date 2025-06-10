/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  // Comentado para desarrollo local - descomenta para producción
  // basePath: '/remeros',
  // assetPrefix: '/remeros',
  images: {
    unoptimized: true,
    domains: ['images.ctfassets.net'],
    loader: 'custom',
    loaderFile: './lib/contentful-image-loader.ts',
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  }
}

module.exports = nextConfig 