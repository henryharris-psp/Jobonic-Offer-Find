/** @type {import('next').NextConfig} */

import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
    reactStrictMode: false,
    eslint: {
        ignoreDuringBuilds: true, //TODO: temporary
    },
    typescript: {
        ignoreBuildErrors: true, //TODO: temporary
    },
    i18n: {
        locales: ['en', 'zh', 'th'],
        defaultLocale: 'en',
    },
};

export default withNextIntl(nextConfig);
