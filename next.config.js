/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        middlewarePrefetch: "flexible",
        optimizePackageImports: ["lucide-react"],
    },
    compress: true,
    poweredByHeader: false,
    images: {
        formats: ["image/avif", "image/webp"],
        minimumCacheTTL: 60 * 60 * 24 * 7,
    },
};

module.exports = nextConfig;
