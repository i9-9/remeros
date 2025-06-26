/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
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
  // Optimizaciones para exportación estática
  optimizeFonts: true,
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  // Configuración de entorno
  env: {
    STRAPI_API_URL: process.env.STRAPI_API_URL || 'http://localhost:1337',
    STRAPI_ADMIN_URL: process.env.STRAPI_ADMIN_URL || 'http://localhost:1337/admin',
    PUBLIC_URL: process.env.PUBLIC_URL || 'http://localhost:3000',
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  }
}

module.exports = nextConfig 