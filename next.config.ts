import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",  // Pastikan output diatur dengan benar untuk non-Edge mode.
  runtime: "nodejs",
  env: {
    
  }
};

export default nextConfig;
