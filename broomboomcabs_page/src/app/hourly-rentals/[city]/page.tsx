import { redirect } from "next/navigation";

export default function HourlyRentalCityPage({ params }: { params: { city: string } }) {
  redirect(`/car-rental/${params.city}`);
}

