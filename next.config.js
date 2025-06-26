/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  // Configuración condicional basada en el entorno
  ...(process.env.NODE_ENV === 'production' ? {
    basePath: '/remeros',
    assetPrefix: '/remeros',
  } : {}),
  images: {
    unoptimized: true,
    domains: ['images.ctfassets.net', 'localhost'],
    loader: 'custom',
    loaderFile: './lib/contentful-image-loader.ts',
  },
  // Optimizaciones para Vercel
  optimizeFonts: true,
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  // Configuración de entorno
  env: {
    PUBLIC_URL: process.env.PUBLIC_URL || 'http://localhost:3000',
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  }
}

module.exports = nextConfig 