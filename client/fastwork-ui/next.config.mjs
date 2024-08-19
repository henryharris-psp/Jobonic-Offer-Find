/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    eslint: {
        ignoreDuringBuilds: true, //TODO: temporary
    },
    typescript: {
        ignoreBuildErrors: true, //TODO: temporary
      },
};

export default nextConfig;
