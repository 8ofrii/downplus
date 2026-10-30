/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@downplus/shared-types', '@downplus/validation'],
};

export default nextConfig;
