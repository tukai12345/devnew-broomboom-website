import { MetadataRoute } from "next";
import { TOP_10_CITIES_SERVICES, SERVICES_LIST, getServiceUrl } from "@/data/cityServicesData";
import { INITIAL_BLOG_DATA } from "@/data/blogData";

const DEFAULT_SITE_URL = "https://dev.broomboomcabs.com";

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

  // 3b. Dynamic Taxi Service, Taxi Near & Self-Drive City Pages
  for (const city of TOP_10_CITIES_SERVICES) {
    builtInCityServicePages.push({
      url: `${siteUrl}/taxi-service/pet-friendly-cab-in-${city.cityId}`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.82,
    });
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

  const blogPages: MetadataRoute.Sitemap = INITIAL_BLOG_DATA.posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.72,
  }));

  return [
    ...corePages,
    ...serviceCategoryPages,
    ...builtInCityServicePages,
    ...blogPages,
  ];
}

