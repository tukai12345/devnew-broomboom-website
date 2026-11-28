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
        source: "/blog/offbeat-monsoon-destinations-in-west-bengal",
        destination: "/blog/monsoon-destinations",
        permanent: true,
      },
      {
        source: "/blogs/offbeat-monsoon-destinations-in-west-bengal",
        destination: "/blog/monsoon-destinations",
        permanent: true,
      },
      {
        source: "/blogs/monsoon-destinations",
        destination: "/blog/monsoon-destinations",
        permanent: true,
      },
      {
        source: "/blog/cab-companies-in-kolkata-why-broomboom-stands-out",
        destination: "/blog/cab-companies-kolkata",
        permanent: true,
      },
      {
        source: "/blogs/cab-companies-in-kolkata-why-broomboom-stands-out",
        destination: "/blog/cab-companies-kolkata",
        permanent: true,
      },
      {
        source: "/blog/kolkata-durga-puja-2024-grand-celebration",
        destination: "/blog/kolkata-durga-puja-2024",
        permanent: true,
      },
      {
        source: "/blogs/kolkata-durga-puja-2024-grand-celebration",
        destination: "/blog/kolkata-durga-puja-2024",
        permanent: true,
      },
      {
        source: "/blog/gangasagar-mela-2025-with-broomboom-cabs",
        destination: "/blog/gangasagar-mela-2025",
        permanent: true,
      },
      {
        source: "/blogs/gangasagar-mela-2025-with-broomboom-cabs",
        destination: "/blog/gangasagar-mela-2025",
        permanent: true,
      },
      {
        source: "/blog/durga-puja-car-rental-in-india-travel-made-easy",
        destination: "/blog/durga-puja-car-rental-in-india",
        permanent: true,
      },
      {
        source: "/blogs/durga-puja-car-rental-in-india-travel-made-easy",
        destination: "/blog/durga-puja-car-rental-in-india",
        permanent: true,
      },
      {
        source: "/blog/holi-celebrations-journey-to-heart-of-india",
        destination: "/blog/holi-celebrations-2025",
        permanent: true,
      },
      {
        source: "/blogs/holi-celebrations-journey-to-heart-of-india",
        destination: "/blog/holi-celebrations-2025",
        permanent: true,
      },
      {
        source: "/blog/belur-math-hindu-temple-howrah-india",
        destination: "/blog/belur-math-hindu-temples",
        permanent: true,
      },
      {
        source: "/blogs/belur-math-hindu-temple-howrah-india",
        destination: "/blog/belur-math-hindu-temples",
        permanent: true,
      },
      {
        source: "/blog/why-broomboom-cabs-is-better-than-other-platforms",
        destination: "/blog/why-broomboom-cabs-better-intercity-travel",
        permanent: true,
      },
      {
        source: "/blogs/why-broomboom-cabs-is-better-than-other-platforms",
        destination: "/blog/why-broomboom-cabs-better-intercity-travel",
        permanent: true,
      },
      {
        source: "/blog/top-15-places-to-visit-for-durga-puja-2025",
        destination: "/blog/places-to-visit-in-india-during-dussehra",
        permanent: true,
      },
      {
        source: "/blogs/top-15-places-to-visit-for-durga-puja-2025",
        destination: "/blog/places-to-visit-in-india-during-dussehra",
        permanent: true,
      },
      {
        source: "/blog/siliguri-to-darjeeling-shared-cab-service",
        destination: "/blog/siliguri-to-darjeeling-shared-cab-services",
        permanent: true,
      },
      {
        source: "/blogs/siliguri-to-darjeeling-shared-cab-service",
        destination: "/blog/siliguri-to-darjeeling-shared-cab-services",
        permanent: true,
      },
      {
        source: "/blog/celebrate-republic-day-2025-car-rentals-gantantra-diwas",
        destination: "/blog/republic-day-2025",
        permanent: true,
      },
      {
        source: "/blogs/celebrate-republic-day-2025-car-rentals-gantantra-diwas",
        destination: "/blog/republic-day-2025",
        permanent: true,
      },
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
      {
        source: "/driver-job",
        destination: "/driver-jobs",
        permanent: true,
      },
      {
        source: "/driver-job/:city",
        destination: "/driver-jobs/:city",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

