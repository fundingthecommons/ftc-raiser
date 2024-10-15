/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.externals = [...config.externals, 'pino-pretty', 'encoding']
        return config;
    }, images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'placecats.com',
            },
        ],
    },
};

export default nextConfig;
