/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/blog",
        destination: "/blogs",
        permanent: true,
      },
      {
        source: "/services/outstation/:city",
        destination: "/outstation-cabs/:city",
        permanent: true,
      },
      {
        source: "/services/outstation-cabs/:city",
        destination: "/outstation-cabs/:city",
        permanent: true,
      },
      {
        source: "/services/outstation",
        destination: "/outstation-cabs",
        permanent: true,
      },
      {
        source: "/services/outstation-cabs",
        destination: "/outstation-cabs",
        permanent: true,
      },
      {
        source: "/hourly-rentals/:city",
        destination: "/car-rental/:city",
        permanent: true,
      },
      {
        source: "/hourly-rentals",
        destination: "/car-rental",
        permanent: true,
      },
      {
        source: "/services/rental/:city",
        destination: "/car-rental/:city",
        permanent: true,
      },
      {
        source: "/services/rental",
        destination: "/car-rental",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

