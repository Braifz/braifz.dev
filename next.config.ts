import { withContentCollections } from "@content-collections/next";
import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  typedRoutes: true,
  allowedDevOrigins: [
    "local-origin.dev",
    "*.local-origin.dev",
    "http://localhost:3000",
    "http://192.168.0.8:3000",
  ],
};

const withMDX = createMDX({});

export default withContentCollections(withMDX(nextConfig));
