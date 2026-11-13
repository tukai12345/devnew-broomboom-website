export const TAXI_NEAR_ROUTES: string[] = [
  "howrah",
  "hooghly",
  "kharagpur",
  "birbhum",
  "durgapur",
  "asansol",
  "jalpaiguri",
  "south24parganas",
  "bandel",
  "bansberia",
];

export const TAXI_NEAR_CUSTOM_NAMES: Record<string, string> = {
  south24parganas: "South 24 Parganas",
  north24parganas: "North 24 Parganas",
  howrah: "Howrah",
  hooghly: "Hooghly",
  kharagpur: "Kharagpur",
  birbhum: "Birbhum",
  durgapur: "Durgapur",
  asansol: "Asansol",
  jalpaiguri: "Jalpaiguri",
  bandel: "Bandel",
  bansberia: "Bansberia",
};

export function formatTaxiNearCity(slug: string): string {
  const clean = slug.toLowerCase().trim();
  if (TAXI_NEAR_CUSTOM_NAMES[clean]) {
    return TAXI_NEAR_CUSTOM_NAMES[clean];
  }

  return clean
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
