"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import CarCard from "./CarCard";
import { API_URL } from "@/lib/api";

export default function AvailableCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/cars/featured`)
      .then((r) => r.json())
      .then(setCars)
      .catch(() => setCars([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-2">
            Dynamic Fleet
          </p>
          <h2 className="text-3xl font-bold tracking-tight">
            Available <span className="text-primary">Cars</span>
          </h2>
          <p className="text-base-content/60 mt-2 max-w-lg text-sm">
            Hand-picked vehicles ready for your next trip. Book in minutes with
            transparent daily pricing.
          </p>
        </div>
        <Link
          href="/cars"
          className="btn btn-primary btn-sm gap-2 rounded-md font-semibold self-start"
        >
          View All <FiArrowRight />
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <span className="loading loading-spinner loading-lg text-primary" />
        </div>
      ) : cars.length === 0 ? (
        <p className="text-center text-base-content/50 py-12">
          No cars listed yet. Be the first to{" "}
          <Link href="/add-car" className="link link-primary">
            add a vehicle
          </Link>
          .
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      )}
    </section>
  );
}
