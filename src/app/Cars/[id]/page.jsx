import CarDetailsClient from "./CarDetailsClient";
import { API_URL } from "@/lib/api";

export default async function CarDetailsPage({ params }) {
  const { id } = await params;
  let car = null;
  try {
    const res = await fetch(`${API_URL}/cars/${id}`, { cache: "no-store" });
    if (res.ok) car = await res.json();
  } catch {
    car = null;
  }
  if (!car?._id) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl font-bold">Car not found</h1>
        <a href="/cars" className="btn btn-primary mt-6">
          Back to fleet
        </a>
      </main>
    );
  }
  return <CarDetailsClient car={car} />;
}
