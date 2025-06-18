/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
        {
            protocol: 'https',
            hostname: 'www.midwaybd.com',
            port: '',
            pathname: '/uploads/**',
        },
        {
            protocol: 'https',
            hostname: 'images.unsplash.com',
            port: '',
            pathname: '/**',
        },
        {
            protocol: 'https',
            hostname: 'cdn.pixabay.com',
            port: '',
            pathname: '/photo/**',
        },
        ],
    },
    experimental: {
        appDir: true,
    },
    outputFileTracingExcludes: ['**/node_modules/next/dist/server/future/route-modules/**'],
};

export default nextConfig;
