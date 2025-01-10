/** @type {import('next').NextConfig} */

const nextConfig = {
    env: {
        API_URL: 'http://localhost:3000',
        BE_URL: "http://localhost:4000"
    },
    webpack(config) {
        config.resolve.modules.push('./src');
        return config;
    },
    compiler: {
        emotion: true,
    }
};

export default nextConfig;
