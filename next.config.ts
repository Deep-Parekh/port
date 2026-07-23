import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // NOTE: `output: 'export'` was removed — a static export cannot run API route
  // handlers, so /api/chat (the proxy to the Modal agent) 404'd in production.
  // Vercel runs this as a normal Next app; pages are still statically optimized.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
