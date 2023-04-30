/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;

// import withBundleAnalyzer from '@next/bundle-analyzer';

// const nextConfig = withBundleAnalyzer({
//   enabled: process.env.ANALYZE === 'true',
//   compress: true,
//   webpack(config, { webpack }) {
//     const prod = process.env.NODE_ENV === 'production';
//     const plugins = [...config.plugins];

//     return {
//       ...config,
//       mode: prod ? 'production' : 'development',
//       devtool: prod ? 'hidden-source-map' : 'eval',
//       plugins,
//     };
//   },
// });

// export default nextConfig;
