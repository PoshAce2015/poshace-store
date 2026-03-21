import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow product images from Magento's media server
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "poshace.com",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/**",
      },
    ],
  },

  // Rewrite .html URLs to clean paths internally
  async rewrites() {
    return [
      {
        source: "/:path*.html",
        destination: "/:path*",
      },
    ];
  },

  // Redirect old Magento system URLs to new equivalents
  async redirects() {
    return [
      {
        source: "/catalogsearch/result",
        destination: "/search",
        permanent: true,
      },
      {
        source: "/customer/account",
        destination: "/account/orders",
        permanent: true,
      },
      {
        source: "/customer/account/:path*",
        destination: "/account/orders",
        permanent: true,
      },
      {
        source: "/checkout/cart",
        destination: "/cart",
        permanent: true,
      },
      {
        source: "/contacts",
        destination: "/contact-us",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
