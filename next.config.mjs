/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const base = isProd ? "/reelme-paypal-payouts-deck" : "";
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  images: { unoptimized: true },
  basePath: base,
  assetPrefix: base || undefined,
  trailingSlash: true,
};
export default nextConfig;
