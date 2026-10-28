import { MetadataRoute } from "next";
import { TOP_10_CITIES_SERVICES, SERVICES_LIST, getServiceUrl } from "@/data/cityServicesData";
import { getApiBaseUrl } from "@/services/api";

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

interface BackendCityItem {
  id?: string;
  name?: string;
  state?: string;
  status?: string;
}

async function fetchBackendCities(): Promise<string[]> {
  try {
    const baseUrl = getApiBaseUrl();
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2500);

    const res = await fetch(`${baseUrl}/cities`, {
      signal: controller.signal,
      next: { revalidate: 86400 }, // Cache for 24 hours
    });
    clearTimeout(timeout);

    if (!res.ok) return [];
    const data: BackendCityItem[] = await res.json();
    if (!Array.isArray(data)) return [];

    return data
      .filter((c) => c.status === "Active" || !c.status)
      .map((c) => (c.name || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-"))
      .filter((slug) => slug.length >= 3);
  } catch {
    return [];
  }
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

  // 4. Dynamic Backend Cities (if any additional cities exist in database)
  const backendCitySlugs = await fetchBackendCities();
  const additionalCityPages: MetadataRoute.Sitemap = [];

  for (const slug of backendCitySlugs) {
    if (!knownCityIds.has(slug)) {
      knownCityIds.add(slug);
      for (const service of SERVICES_LIST) {
        additionalCityPages.push({
          url: `${siteUrl}${getServiceUrl(service.id, slug)}`,
          lastModified: currentDate,
          changeFrequency: "weekly",
          priority: 0.75,
        });
      }
    }
  }

  return [
    ...corePages,
    ...serviceCategoryPages,
    ...builtInCityServicePages,
    ...additionalCityPages,
  ];
}

