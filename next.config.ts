import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei", "gsap", "lenis"],
  reactStrictMode: true,
};

export default nextConfig;
