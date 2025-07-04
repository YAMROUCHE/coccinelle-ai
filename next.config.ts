import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimisations de performance
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },

  // Configuration des images
  images: {
    domains: ['coccinelle.ai', 'localhost'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Configuration des headers de sécurité
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ];
  },

  // Configuration des redirections
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/accueil',
        destination: '/',
        permanent: true,
      },
      {
        source: '/call-center-ia',
        destination: '/',
        permanent: true,
      },
      {
        source: '/intelligence-artificielle',
        destination: '/',
        permanent: true,
      },
    ];
  },

  // Configuration des rewrites
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
      {
        source: '/robots.txt',
        destination: '/api/robots',
      },
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ];
  },

  // Configuration du bundle analyzer
  ...(process.env.ANALYZE === 'true' && {
    webpack: (config, { isServer }) => {
      if (!isServer) {
        const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
            reportFilename: './bundle-analyzer-report.html',
          })
        );
      }
      return config;
    },
  }),

  // Configuration TypeScript
  typescript: {
    ignoreBuildErrors: false,
  },

  // Configuration ESLint
  eslint: {
    ignoreDuringBuilds: false,
  },

  // Configuration de la compression
  compress: true,

  // Configuration du power mode
  poweredByHeader: false,

  // Configuration des variables d'environnement
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
};

export default nextConfig;
