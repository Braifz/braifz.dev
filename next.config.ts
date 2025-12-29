import type { NextConfig } from "next";
import {withContentCollections} from "@content-collections/next";
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  typedRoutes: true,
};

const withMDX = createMDX({
});

export default withContentCollections(withMDX(nextConfig));
