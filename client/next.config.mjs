/** @type {import('next').NextConfig} */

const nextConfig = {
    env:{
        API_URL: `${process.env.NEXT_PUBLIC_DOMAINHOST}:${process.env.NEXT_PUBLIC_FE}`,
        BE_URL: `${process.env.NEXT_PUBLIC_DOMAINHOST}:${process.env.NEXT_PUBLIC_FE}`

    },
    webpack(config) {
        config.resolve.modules.push('./src');
        return config;
      },
};

export default nextConfig;
