/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
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
    ];
  },
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/index',
        destination: '/',
        permanent: true,
      },
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/work',
        destination: '/#work',
        permanent: false,
      },
      {
        source: '/projects',
        destination: '/#work',
        permanent: false,
      },
      {
        source: '/about',
        destination: '/#about',
        permanent: false,
      },
      {
        source: '/services',
        destination: '/#services',
        permanent: false,
      },
      {
        source: '/contact',
        destination: '/#contact',
        permanent: false,
      },
      {
        source: '/&',
        destination: '/',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
