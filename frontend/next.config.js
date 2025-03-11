/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // Disable the X-Powered-By header for security reasons
    poweredByHeader: false,
    // Configure image optimization
    images: {
      domains: [],
    },
    // Environment variables that will be available at build time
    env: {
      WEBSOCKET_URL: process.env.WEBSOCKET_URL || 'ws://localhost:3001',
    },
    // Configure webpack to handle audio files
    webpack(config) {
      config.module.rules.push({
        test: /\.(mp3|wav|ogg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '/_next/static/audio/',
              outputPath: 'static/audio/',
              name: '[name].[hash].[ext]',
              esModule: false,
            },
          },
        ],
      });
  
      return config;
    },
    // Set the base path if your app is not hosted at the root
    // basePath: '',
    
    // Enable SWC minification for faster builds
    swcMinify: true,
    
    // Configure redirects if needed
    async redirects() {
      return [];
    },
    
    // Configure headers for additional security
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
          ],
        },
      ];
    },
  };
  
  module.exports = nextConfig;