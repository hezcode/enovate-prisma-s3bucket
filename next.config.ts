import { i } from "motion/react-client";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "enovatedata.s3.eu-north-1.amazonaws.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "ezbotybyjiriuajyicex.supabase.co",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
