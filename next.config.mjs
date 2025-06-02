const nextConfig = {
  eslint: {
    // Skip ESLint during production builds (including on Vercel)
    ignoreDuringBuilds: true,
  },
  /* config options here */
};

export default nextConfig;
