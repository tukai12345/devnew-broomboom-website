import { MetadataRoute } from "next";
import { TOP_10_CITIES_SERVICES, SERVICES_LIST, getServiceUrl } from "@/data/cityServicesData";
import { INITIAL_BLOG_DATA } from "@/data/blogData";
import { TAXI_SERVICE_ROUTES } from "@/data/taxiServiceRoutes";
import { KOLKATA_ROUTES } from "@/data/kolkataRoutes";
import { EXTRA_OUTSTATION_CITIES } from "@/app/outstation-cabs/[city]/page";
import { EXTRA_AIRPORT_CITIES } from "@/app/airport-cabs/[city]/page";
import { CAR_RENTAL_SPECIAL_ROUTES } from "@/data/carRentalRoutes";
import { BOOK_TAXI_ROUTES } from "@/data/bookTaxiRoutes";
import { SELF_DRIVE_ROUTES } from "@/data/selfDriveRoutes";
import { TAXI_NEAR_ROUTES } from "@/data/taxiNearRoutes";
import { CANONICAL_TEMPLE_SLUGS } from "@/data/templeKolkataRoutes";
import { CORPORATE_PICK_DROP_SLUGS } from "@/data/corporatePickDropRoutes";
import { RESERVED_CABS_SLUGS } from "@/data/reservedCabsRoutes";
import { SHOPPING_MALL_SLUGS } from "@/data/shoppingMallKolkataRoutes";

const DEFAULT_SITE_URL = "https://www.broomboomcabs.com";

function getSiteUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL;
  if (envUrl && typeof envUrl === "string") {
    let clean = envUrl.trim().replace(/\/+$/, "");
    if (!clean.startsWith("http://") && !clean.startsWith("https://")) {
      clean = `https://${clean}`;
    }
    return clean;
  }
  return DEFAULT_SITE_URL;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const currentDate = new Date();

  // 1. Core High-Priority Pages
  const corePages: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/fleet`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/services`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/taxi-service`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/taxi-near`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/self-driven`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/taxi-service/pet-friendly-cabs-in-kolkata`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.88,
    },
    {
      url: `${siteUrl}/taxi-service/lucknow-to-prayagraj-taxi-fare`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.88,
    },
    {
      url: `${siteUrl}/car-rental`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${siteUrl}/airport-cabs`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${siteUrl}/driver-job`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${siteUrl}/about-us`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/contact-us`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteUrl}/user-terms`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteUrl}/blogs`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/sitemap`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.6,
    },
  ];

  // 2. Service Category Landing Pages (/outstation-cabs, /services/rental, /services/airport)
  const serviceCategoryPages: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/outstation-cabs`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.88,
    },
    ...SERVICES_LIST.map((service) => ({
      url: `${siteUrl}${getServiceUrl(service.id)}`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
  ];

  // 3. Built-in Top 10 City + Service Category Landing Pages (/outstation-cabs/kolkata, etc.)
  const builtInCityServicePages: MetadataRoute.Sitemap = [];
  const knownCityIds = new Set<string>();

  for (const service of SERVICES_LIST) {
    for (const city of TOP_10_CITIES_SERVICES) {
      knownCityIds.add(city.cityId.toLowerCase());
      builtInCityServicePages.push({
        url: `${siteUrl}${getServiceUrl(service.id, city.cityId)}`,
        lastModified: currentDate,
        changeFrequency: "weekly",
        priority: service.id === "outstation" ? 0.85 : 0.8,
      });
    }
  }

  // 3b. Dynamic Taxi Near & Self-Drive City Pages for Top 10
  for (const city of TOP_10_CITIES_SERVICES) {
    builtInCityServicePages.push({
      url: `${siteUrl}/taxi-near/${city.cityId}`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.82,
    });
    builtInCityServicePages.push({
      url: `${siteUrl}/self-driven/${city.cityId}`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.82,
    });
  }

  // 3c. All Taxi Service Routes (Pet Friendly, Intercity, Airport & Area routes)
  const taxiRoutesPages: MetadataRoute.Sitemap = TAXI_SERVICE_ROUTES.map((slug) => ({
    url: `${siteUrl}/taxi-service/${slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // 3d. Kolkata Outstation Corridors (/kolkata/*)
  const kolkataRoutesPages: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/kolkata`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.88,
    },
    ...KOLKATA_ROUTES.map((slug) => ({
      url: `${siteUrl}/kolkata/${slug}`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
  ];

  // 3e. Additional Outstation Cities (/outstation-cabs/*)
  const extraOutstationPages: MetadataRoute.Sitemap = EXTRA_OUTSTATION_CITIES.map((city) => ({
    url: `${siteUrl}/outstation-cabs/${city.toLowerCase()}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  // 3e2. Additional Airport Cab Cities (/airport-cabs/*)
  const extraAirportPages: MetadataRoute.Sitemap = EXTRA_AIRPORT_CITIES.map((city) => ({
    url: `${siteUrl}/airport-cabs/${city.toLowerCase()}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  // 3f. Special Car Rentals & Tempo Travellers (/car-rental/*)
  const carRentalSpecialPages: MetadataRoute.Sitemap = CAR_RENTAL_SPECIAL_ROUTES.map((slug) => ({
    url: `${siteUrl}/car-rental/${slug.toLowerCase()}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  // 3g. Book Taxi Dedicated Corridors (/book-taxi/*)
  const bookTaxiPages: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/book-taxi`,
      lastModified: currentDate,
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    ...BOOK_TAXI_ROUTES.map((slug) => ({
      url: `${siteUrl}/book-taxi/${slug}`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
  ];

  // 3h. Self-Drive Routes (/self-driven/*)
  const selfDrivePages: MetadataRoute.Sitemap = SELF_DRIVE_ROUTES.map((slug) => ({
    url: `${siteUrl}/self-driven/${slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  // 3i. Taxi Near Hubs (/taxi-near/*)
  const taxiNearPages: MetadataRoute.Sitemap = TAXI_NEAR_ROUTES.map((slug) => ({
    url: `${siteUrl}/taxi-near/${slug.toLowerCase()}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  // 3j. Kolkata & Bengal Temple Pilgrimage Routes (/taxi-service-temple-kolkata/*)
  const templeKolkataPages: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/taxi-service-temple-kolkata`,
      lastModified: currentDate,
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    ...CANONICAL_TEMPLE_SLUGS.map((slug) => ({
      url: `${siteUrl}/taxi-service-temple-kolkata/${encodeURIComponent(slug)}`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
  ];

  // 3k. Corporate Employee Pick & Drop Kolkata (/corporate-pick-drop-kolkata/*)
  const corporateKolkataPages: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/corporate-pick-drop-kolkata`,
      lastModified: currentDate,
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    ...CORPORATE_PICK_DROP_SLUGS.map((slug) => ({
      url: `${siteUrl}/corporate-pick-drop-kolkata/${encodeURIComponent(slug)}`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
  ];

  // 3l. Reserved Airport Cabs - Himalayan & Northeast Routes (/reserved-cabs/*)
  const reservedCabsPages: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/reserved-cabs`,
      lastModified: currentDate,
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    ...RESERVED_CABS_SLUGS.map((slug) => ({
      url: `${siteUrl}/reserved-cabs/${encodeURIComponent(slug)}`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
  ];

  // 3m. Kolkata Shopping Malls Taxi Service (/taxi-service-shoppingmalls-kolkata/*)
  const shoppingMallPages: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/taxi-service-shoppingmalls-kolkata`,
      lastModified: currentDate,
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    ...SHOPPING_MALL_SLUGS.map((slug) => ({
      url: `${siteUrl}/taxi-service-shoppingmalls-kolkata/${encodeURIComponent(slug)}`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
  ];

  // 3n. Specialized Custom Regional Corridors & Driver Jobs
  const specializedCustomPages: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/cab-attachment/pune`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.88,
    },
    {
      url: `${siteUrl}/driver-job/mumbai`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.88,
    },
    {
      url: `${siteUrl}/durga-puja/kolkata-durga-puja-pandal-2024`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    },
    {
      url: `${siteUrl}/kolkata-to-darjeeling/cabs`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    },
    {
      url: `${siteUrl}/kolkata-to-jalpaiguri/cabs`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    },
    {
      url: `${siteUrl}/kolkata-to-kharagpur/cabs`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    },
    {
      url: `${siteUrl}/oneway-cab/ujjain-taxi-fare`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    },
    {
      url: `${siteUrl}/shared-taxi/haldwani-to-almora`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    },
    {
      url: `${siteUrl}/taxi-service-asansol-to-kolkata/cabs`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    },
    {
      url: `${siteUrl}/taxi-service-digha-to-kolkata/cab`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    },
    {
      url: `${siteUrl}/taxi-service-New/Town-Kolkata`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    },
    {
      url: `${siteUrl}/taxi-service-taxi-near/kalimpong`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    },
  ];

  // 4. Blog Posts
  const blogPages: MetadataRoute.Sitemap = INITIAL_BLOG_DATA.posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.72,
  }));

  const allEntries = [
    ...corePages,
    ...serviceCategoryPages,
    ...builtInCityServicePages,
    ...extraOutstationPages,
    ...extraAirportPages,
    ...carRentalSpecialPages,
    ...bookTaxiPages,
    ...selfDrivePages,
    ...taxiNearPages,
    ...templeKolkataPages,
    ...corporateKolkataPages,
    ...reservedCabsPages,
    ...shoppingMallPages,
    ...kolkataRoutesPages,
    ...taxiRoutesPages,
    ...specializedCustomPages,
    ...blogPages,
  ];

  // Deduplicate by URL
  const seenUrls = new Set<string>();
  const uniqueEntries: MetadataRoute.Sitemap = [];
  for (const entry of allEntries) {
    if (!seenUrls.has(entry.url)) {
      seenUrls.add(entry.url);
      uniqueEntries.push(entry);
    }
  }

  return uniqueEntries;
}
