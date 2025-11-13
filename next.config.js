/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,


    experimental: {
        middlewarePrefetch: "flexible",
    },
};

module.exports = nextConfig;