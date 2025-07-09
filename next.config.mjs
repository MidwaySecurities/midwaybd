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
                hostname: 'cdbl.com.bd',
                port: '',
                pathname: '/assets/img/**',
            },
            {
                protocol: 'https',
                hostname: 'www.dsebd.org',
                port: '',
                pathname: '/assets/images/**',
            },
            {
                protocol: 'https',
                hostname: 'sec.gov.bd',
                port: '',
                pathname: '/images/**',
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
            {
                protocol: 'https',
                hostname: 'cdn-icons-png.flaticon.com',
                port: '',
            }
        ],
    },
    experimental: {
        appDir: true,
    },
    outputFileTracingExcludes: ['**/node_modules/next/dist/server/future/route-modules/**'],
};

export default nextConfig;
