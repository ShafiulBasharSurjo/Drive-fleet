"use client";

import { useCallback, useEffect, useState } from "react";
import CarCard from "@/Components/CarCard";
import { API_URL } from "@/lib/api";

const CAR_TYPES = [
  "Sedan",
  "SUV",
  "Hatchback",
  "Luxury",
  "Microbus",
  "Electric",
];

export default function ExploreCarsPage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");

  const fetchCars = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search.trim()) params.set("search", search.trim());
    if (type) params.set("type", type);
    try {
      const res = await fetch(`${API_URL}/cars?${params}`);
      const data = await res.json();
      setCars(data);
    } catch {
      setCars([]);
    } finally {
      setLoading(false);
    }
  }, [search, type]);

  useEffect(() => {
    const t = setTimeout(fetchCars, 300);
    return () => clearTimeout(t);
  }, [fetchCars]);

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight text-center">
        Explore <span className="text-primary">Cars</span>
      </h1>
      <p className="text-center text-sm text-base-content/50 mt-2 mb-8">
        Search by name or filter by vehicle type
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mb-8 max-w-2xl mx-auto">
        <input
          type="search"
          placeholder="Search by car name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered flex-1 rounded-xl text-amber-400"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="select select-bordered rounded-xl sm:w-48"
        >
          <option value="">Car types</option>
          {CAR_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center py-24">
          <span className="loading loading-spinner loading-lg text-primary" />
        </div>
      ) : cars.length === 0 ? (
        <p className="text-center text-base-content/50 py-16">
          No vehicles match your search.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      )}
    </main>
  );
}
