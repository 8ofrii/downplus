/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  transpilePackages: ['@downplus/shared-types', '@downplus/validation'],
};

export default nextConfig;
