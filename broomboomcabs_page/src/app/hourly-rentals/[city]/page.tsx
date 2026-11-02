import { redirect } from "next/navigation";

export default async function HourlyRentalCityPage(props: {
  params: Promise<{ city: string }> | { city: string };
}) {
  const resolved = await props.params;
  redirect(`/car-rental/${resolved?.city || ""}`);
}

