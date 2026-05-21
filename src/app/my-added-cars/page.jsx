"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import CarCard from "@/Components/CarCard";
import PrivateRoute from "@/Components/PrivateRoute";
import { API_URL } from "@/lib/api";

function MyAddedCarsContent() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/cars/my`, { credentials: "include" })
      .then((r) => r.json())
      .then(setCars)
      .catch(() => toast.error("Failed to load your cars"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight">
        My Added <span className="text-primary">Cars</span>
      </h1>
      <p className="text-sm text-base-content/50 mt-1.5 mb-8">
        Edit or remove vehicles you have listed on DriveFleet
      </p>

      {loading && (
        <div className="flex justify-center py-24">
          <span className="loading loading-spinner loading-lg text-primary" />
        </div>
      )}

      {!loading && cars.length === 0 && (
        <div className="text-center py-20 text-base-content/50">
          <p className="mb-4">You have not listed any cars yet.</p>
          <Link href="/add-car" className="btn btn-primary btn-sm">
            Add Your First Car
          </Link>
        </div>
      )}

      {!loading && cars.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <CarCard
              key={car._id}
              car={car}
              showActions
              onUpdated={(updated) =>
                setCars((prev) =>
                  prev.map((c) => (c._id === updated._id ? updated : c)),
                )
              }
              onDeleted={(id) =>
                setCars((prev) => prev.filter((c) => c._id !== id))
              }
            />
          ))}
        </div>
      )}
    </main>
  );
}

export default function MyAddedCarsPage() {
  return (
    <PrivateRoute>
      <MyAddedCarsContent />
    </PrivateRoute>
  );
}
