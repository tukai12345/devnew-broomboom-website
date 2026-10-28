/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com"],
  },
  async redirects() {
    return [
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
    ];
  },
};

export default nextConfig;

