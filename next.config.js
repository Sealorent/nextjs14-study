/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    env: {
        appName : process.env.APP_NAME,
    }
}

module.exports = nextConfig
