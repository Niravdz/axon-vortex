/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei", "gsap", "lenis"],
  reactStrictMode: true,
};

export default nextConfig;
