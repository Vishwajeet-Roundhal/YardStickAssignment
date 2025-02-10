/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true, 
  },
};

export default nextConfig;  // ✅ Use `export default` instead of `module.exports`
