/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  typescript: {
    // !! This disables type checking during build !!
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
