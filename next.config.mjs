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
            },
            {
                protocol: 'https',
                hostname: 'upload.wikimedia.org',
                port: '',
                pathname: '/wikipedia/commons/**',
            },
            {
                protocol: 'https',
                hostname: 'www.bracbank.com',
                port: '',
                pathname: '/client_end/img/bb/**',
            },
            {
                protocol: 'https',
                hostname: 'www.squarepharma.com.bd',
                port: '',
                pathname: '/images/**',
            }
        ],
    },
    experimental: {
        appDir: true,
    },
    outputFileTracingExcludes: ['**/node_modules/next/dist/server/future/route-modules/**'],
};

export default nextConfig;
